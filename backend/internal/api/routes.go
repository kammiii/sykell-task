package api

import (
	"net/http"

	"github.com/kammiii/backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})

	r.POST("/api/auth/login", LoginHandler)
	r.GET("/api/auth/me", middleware.AuthMiddleware(jwtSecret), MeHandler)

	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware(jwtSecret))
	{
		protected.GET("/urls", GetAll)
		protected.GET("/urls/:id", GetByID)
		protected.POST("/urls", CreateURL)
		protected.POST("/urls/:id/start", StartCrawl)
		protected.POST("/urls/:id/stop", StopCrawl)
	}
}
