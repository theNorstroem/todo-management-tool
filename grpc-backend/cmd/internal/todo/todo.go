package todo

import (
	"github.com/oklog/ulid"
	todos "github.com/theNorstroem/todo-management-tool/api/dist/pb/todos"
	environment "github.com/theNorstroem/todo-management-tool/grpc-backend/cmd/internal/pkg/env"
	ulidPkg "github.com/theNorstroem/todo-management-tool/grpc-backend/cmd/internal/pkg/ulid"
	"github.com/upper/db/v4"
	"strconv"
)

// Interface zur Env
var env *environment.Environment

// todos collection
var todoCol db.Collection

// Item represents a record from the "todo" table.
type Item struct {
	Id          ulid.ULID `db:"id,pk,omitempty"`
	Description string    `db:"description"`
	DueDate     string    `db:"due_date"`
}

func Register() {
	env = environment.Env
	todoCol = env.DB.Collection("todo")
}

// CreateToDoItem adds a new todos.Item to the database
func CreateToDoItem(data *todos.Item) (*Item, error) {
	item := &Item{}
	item.Id = ulidPkg.GenerateULID()
	item.Description = data.Description
	item.DueDate = strconv.Itoa(int(data.DueDate.Year)) + "-" + strconv.Itoa(int(data.DueDate.Month)) + "-" + strconv.Itoa(int(data.DueDate.Day))

	_, err := todoCol.Insert(item)

	return item, err
}

// ListToDoItems selects all rows
func ListToDoItems() ([]*Item, error) {
	results := todoCol.Find()
	var items []*Item
	err := results.All(&items)
	return items, err
}

// GetToDoItem gets item by id
func GetToDoItem(id ulid.ULID) (*Item, error) {
	item := &Item{}
	res := todoCol.Find(db.Cond{"id": id})
	err := res.One(item)
	return item, err
}

// UpdateToDoItem updates the item
func UpdateToDoItem(id ulid.ULID, data *todos.Item) (*Item, error) {

	item := &Item{}
	err := env.DB.Tx(func(tx db.Session) error {

		res := todoCol.Find(db.Cond{"id": id})
		res.One(item)

		item.Id = id
		if data.Description != "" {
			item.Description = data.Description
		}
		if data.DueDate != nil {
			item.DueDate = strconv.Itoa(int(data.DueDate.Year)) + "-" + strconv.Itoa(int(data.DueDate.Month)) + "-" + strconv.Itoa(int(data.DueDate.Day))
		}

		err := res.Update(item)

		if err != nil {
			// Rollback the transaction by returning an error value.
			return err
		}
		// Commit the transaction by returning `nil`.
		return nil
	})
	if err != nil {
		return nil, err
	}

	return item, nil
}
