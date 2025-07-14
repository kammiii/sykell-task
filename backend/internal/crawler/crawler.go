package crawler

import (
	"encoding/json"
	"errors"
	"net/http"
	"net/url"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"gorm.io/datatypes"
)

type CrawlResult struct {
	Title         string
	HTMLVersion   string
	Headings      datatypes.JSON
	InternalLinks int
	ExternalLinks int
	BrokenLinks   int
	HasLoginForm  bool
}

func Crawl(target string) (*CrawlResult, error) {
	resp, err := http.Get(target)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		return nil, errors.New("invalid response code")
	}

	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		return nil, err
	}

	result := &CrawlResult{
		Title:       strings.TrimSpace(doc.Find("title").First().Text()),
		HTMLVersion: detectHTMLVersion(doc),
	}

	result.Headings = extractHeadings(doc)
	result.HasLoginForm = doc.Find("input[type='password']").Length() > 0

	baseURL, _ := url.Parse(target)
	internal, external, broken := countLinks(doc, baseURL)
	result.InternalLinks = internal
	result.ExternalLinks = external
	result.BrokenLinks = broken

	return result, nil
}

func detectHTMLVersion(doc *goquery.Document) string {
	// Check doctype manually if needed
	// goquery doesn't expose doctype, fallback to common version heuristics
	if doc.Find("meta[charset='utf-8']").Length() > 0 {
		return "HTML5"
	}
	return "Unknown"
}
func extractHeadings(doc *goquery.Document) datatypes.JSON {
	headings := map[string]int{}
	for i := 1; i <= 6; i++ {
		tag := "h" + string('0'+i)
		headings[tag] = doc.Find(tag).Length()
	}
	jsonData, _ := json.Marshal(headings)
	return datatypes.JSON(jsonData)
}

func countLinks(doc *goquery.Document, base *url.URL) (internal, external, broken int) {
	seen := map[string]bool{}
	doc.Find("a[href]").Each(func(_ int, s *goquery.Selection) {
		link, _ := s.Attr("href")
		link = strings.TrimSpace(link)
		if link == "" || seen[link] {
			return
		}
		seen[link] = true

		resolved, err := base.Parse(link)
		if err != nil {
			broken++
			return
		}

		if resolved.Host == base.Host {
			internal++
		} else {
			external++
		}

		// Optional live check:
		if resp, err := http.Head(resolved.String()); err != nil || resp.StatusCode >= 400 {
			broken++
		}
	})
	return
}
