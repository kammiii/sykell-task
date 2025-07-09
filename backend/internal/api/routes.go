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

	api := r.Group("/urls")
	{
		api.GET("/", GetAll)
		api.GET("/:id", GetByID)
		api.POST("/", CreateURL)
		api.POST("/:id/start", StartCrawl)
		api.POST("/:id/stop", StopCrawl)
	}
}
