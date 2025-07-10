package models

import "time"

type URL struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Address   string    `json:"address"`
	Title     string    `json:"title"`
	Status    string    `json:"status"` // queued, running, done, stopped, error
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at,omitempty"`
}
