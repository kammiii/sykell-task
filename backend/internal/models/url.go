// internal/models/url.go
package models

type URL struct {
	ID            uint   `gorm:"primaryKey" json:"id"`
	CreatedAt     int64  `json:"createdAt"`
	UpdatedAt     int64  `json:"updatedAt"`
	Address       string `gorm:"type:varchar(255);uniqueIndex" json:"address"`
	Title         string `json:"title"`
	HTMLVersion   string `json:"htmlVersion"`
	InternalLinks int    `json:"internalLinks"`
	ExternalLinks int    `json:"externalLinks"`
	BrokenLinks   int    `json:"brokenLinks"`
	HasLoginForm  bool   `json:"hasLoginForm"`
	Headings      string `json:"headings"` // JSON string (e.g. {"h1":2,"h2":4})
	Status        string `json:"status"`   // queued, running, done, error
	ErrorMessage  string `json:"errorMessage,omitempty"`
}
