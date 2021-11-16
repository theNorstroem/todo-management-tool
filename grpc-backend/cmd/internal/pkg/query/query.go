package query

import (
	"encoding/json"
)

// Request Options
type QueryOptions struct {
	Fields  string `json:"fields,omitempty"` // partial representation
	Sort    string `json:"sort,omitempty"`
	Filter  string `json:"filter,omitempty"`
	Count   bool   `json:"count,omitempty"` // return count in meta
	Sum     string `json:"sum,omitempty"`   // calculate sum
	Context string `json:"context,omitempty"`
	Limit   uint   `json:"limit,omitempty"`  // set page limit to limit
	Page    uint   `json:"page,omitempty"`   // pagination
	Cursor  uint   `json:"cursor,omitempty"` // for cursor pagination
}

type DBMeta struct {
	Count       uint64 `db:"c,pk,omitempty"`
	CurrentPage uint
	NextPage    uint
	PrevPage    uint
	FirstPage   uint
	LastPage    uint
}

type FieldSet struct {
	fields map[string]string
}

// Makes an empty fieldSet
func GetFieldSet() FieldSet {
	set := FieldSet{}
	set.fields = make(map[string]string)
	return set
}

// Optionen für Listenelemente kommen aus dem proto als beliebiger Typ daher, jedoch immer in der gleichen nummerierung
// diese werden in die QueryOptions Form gebracht, damit upper sauber damit umgehen kann.
func GetListOptionsFromRequest(options interface{}) QueryOptions {
	tmp, _ := json.Marshal(options)
	var opts QueryOptions
	json.Unmarshal(tmp, &opts)
	return opts
}
