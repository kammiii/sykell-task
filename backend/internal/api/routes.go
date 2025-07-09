package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})

	api := r.Group("/api")
	{
		api.GET("/urls", GetAll)
		api.GET("/urls/:id", GetByID)
		api.POST("/urls", CreateURL)
		api.POST("/urls/:id/start", StartCrawl)
		api.POST("/urls/:id/stop", StopCrawl)
	}
}
