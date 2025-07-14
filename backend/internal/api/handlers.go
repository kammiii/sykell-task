package api

import (
	"net/http"

	"github.com/PuerkitoBio/goquery"
	"github.com/gin-gonic/gin"
	"github.com/kammiii/backend/internal/db"
	"github.com/kammiii/backend/internal/models"
)

func GetAll(c *gin.Context) {
	userID := c.GetUint("user_id")
	var urls []models.URL

	if err := db.DB.Where("user_id = ?", userID).Order("created_at DESC").Find(&urls).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not retrieve URLs"})
		return
	}

	c.JSON(http.StatusOK, urls)
}

func GetByID(c *gin.Context) {
	userID := c.GetUint("user_id")
	id := c.Param("id")

	var url models.URL
	if err := db.DB.First(&url, "id = ? AND user_id = ?", id, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "URL not found"})
		return
	}

	c.JSON(http.StatusOK, url)
}

type CreateURLInput struct {
	Address string `json:"address" binding:"required,url"`
}

func CreateURL(c *gin.Context) {
	userID := c.GetUint("user_id")

	var input struct {
		Address string `json:"address"`
	}
	if err := c.ShouldBindJSON(&input); err != nil || input.Address == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid address"})
		return
	}

	url := models.URL{
		Address: input.Address,
		Status:  "queued",
		UserID:  userID,
	}
	if err := db.DB.Create(&url).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create URL"})
		return
	}

	c.JSON(http.StatusCreated, url)
}

func StartCrawl(c *gin.Context) {
	userID := c.GetUint("user_id")
	id := c.Param("id")

	var url models.URL
	if err := db.DB.First(&url, "id = ? AND user_id = ?", id, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "URL not found"})
		return
	}

	url.Status = "running"
	db.DB.Save(&url)

	go func(u models.URL) {
		resp, err := http.Get(u.Address)
		if err != nil {
			u.Status = "error"
			u.Error = err.Error()
			db.DB.Save(&u)
			return
		}
		defer resp.Body.Close()

		doc, err := goquery.NewDocumentFromReader(resp.Body)
		if err != nil {
			u.Status = "error"
			u.Error = "failed to parse HTML"
			db.DB.Save(&u)
			return
		}

		title := doc.Find("title").First().Text()
		u.Title = title
		u.Status = "done"
		db.DB.Save(&u)
	}(url)

	c.JSON(http.StatusOK, url)
}

func StopCrawl(c *gin.Context) {
	userID := c.GetUint("user_id")
	id := c.Param("id")

	var url models.URL
	if err := db.DB.First(&url, "id = ? AND user_id = ?", id, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "URL not found"})
		return
	}

	url.Status = "stopped"
	db.DB.Save(&url)

	c.JSON(http.StatusOK, url)
}
