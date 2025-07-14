package models

import (
	"time"

	"gorm.io/datatypes"
)

type URL struct {
	ID            uint      `json:"id" gorm:"primaryKey"`
	Address       string    `json:"address"`
	Title         string    `json:"title"`
	Status        string    `json:"status"` // queued, running, done, stopped, error
	Error         string    `json:"error,omitempty"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at,omitempty"`
	UserID        uint
	User          User           `gorm:"constraint:OnDelete:CASCADE"`
	HTMLVersion   string         `json:"html_version"`
	Headings      datatypes.JSON `json:"headings"` // JSON object: {"h1": 2, "h2": 1, ...}
	InternalLinks int            `json:"internal_links"`
	ExternalLinks int            `json:"external_links"`
	BrokenLinks   int            `json:"broken_links"`
	HasLoginForm  bool           `json:"has_login_form"`
}
