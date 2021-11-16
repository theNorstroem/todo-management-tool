package todo

import (
	"github.com/oklog/ulid"
	todos "github.com/theNorstroem/todo-management-tool/api/dist/pb/todos"
	environment "github.com/theNorstroem/todo-management-tool/grpc-backend/cmd/internal/pkg/env"
	"github.com/theNorstroem/todo-management-tool/grpc-backend/cmd/internal/pkg/query"
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
	Id          ulid.ULID `db:"id,omitempty"`
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

func ListToDoItems(options query.QueryOptions) ([]*Item, error) {
	results := todoCol.Find(options)
	var items []*Item
	err := results.All(&items)
	return items, err
}
