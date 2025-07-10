package api

import (
	"net/http"
	"strconv"

	"github.com/PuerkitoBio/goquery"
	"github.com/gin-gonic/gin"
	"github.com/kammiii/backend/internal/db"
	"github.com/kammiii/backend/internal/models"
)

func GetAll(c *gin.Context) {
	var urls []models.URL
	db.DB.Find(&urls)
	c.JSON(http.StatusOK, urls)
}

func GetByID(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var url models.URL
	if err := db.DB.First(&url, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
		return
	}
	c.JSON(http.StatusOK, url)
}

type CreateURLInput struct {
	Address string `json:"address" binding:"required,url"`
}

func CreateURL(c *gin.Context) {
	var input CreateURLInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	url := models.URL{
		Address: input.Address,
		Status:  "queued",
	}

	if err := db.DB.Create(&url).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create URL"})
		return
	}

	c.JSON(http.StatusCreated, url)
}

func StartCrawl(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var url models.URL

	if err := db.DB.First(&url, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "URL not found"})
		return
	}

	url.Status = "running"
	db.DB.Save(&url)

	go func(id int) {
		var u models.URL
		if err := db.DB.First(&u, id).Error; err != nil {
			return
		}

		resp, err := http.Get(u.Address)
		if err != nil {
			u.Status = "error"
			db.DB.Save(&u)
			return
		}
		defer resp.Body.Close()

		doc, err := goquery.NewDocumentFromReader(resp.Body)
		if err != nil {
			u.Status = "error"
			db.DB.Save(&u)
			return
		}

		u.Title = doc.Find("title").First().Text()
		u.Status = "done"
		db.DB.Save(&u)
	}(id)

	c.JSON(http.StatusOK, url)
}

func StopCrawl(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var url models.URL

	if err := db.DB.First(&url, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "URL not found"})
		return
	}

	url.Status = "stopped"
	db.DB.Save(&url)

	c.JSON(http.StatusOK, url)
}
