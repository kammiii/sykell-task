package api

import (
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/kammiii/backend/internal/db"
	"github.com/kammiii/backend/internal/models"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

func LoginHandler(c *gin.Context) {
	var body struct {
		Name string `json:"name" binding:"required"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	u := db.DB.Where("name = ?", body.Name).First(&user)
	if u.Error != nil {
		user = models.User{Name: body.Name}
		if err := db.DB.Create(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
			return
		}
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	})
	signed, _ := token.SignedString(jwtSecret)

	c.JSON(http.StatusOK, gin.H{
		"token": signed,
		"user":  user,
	})
}

func MeHandler(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"user": user})
}
