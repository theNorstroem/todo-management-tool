package todo

import (
	furo "github.com/theNorstroem/FuroBaseSpecs/dist/pb/furo"
	todos "github.com/theNorstroem/todo-management-tool/api/dist/pb/todos"
	proto "github.com/theNorstroem/todo-management-tool/api/dist/pb/todosservice"
	"google.golang.org/genproto/googleapis/type/date"
	"strconv"
	"strings"
)

// Mappings
// from: proto.CreateTodoRequest
// to:   todos.Item
func mapRequestBodyToTodoItem(req *proto.CreateTodoRequest) *todos.Item {
	out := &todos.Item{}
	out.Id = req.Body.Id
	out.Description = req.Body.Description
	out.DueDate = req.Body.GetDueDate()

	return out
}

// Mappings
// from: ToDoItem
// to:   todos.ItemEntity
func mapItemToItemEntity(item *Item) *todos.ItemEntity {

	out := &todos.Item{}
	out.Id = item.Id.String()
	out.Description = item.Description
	out.DueDate = mapISO8601ToDate(item.DueDate)

	hts := []*furo.Link{}
	hts = append(hts, &furo.Link{
		Rel:     "self",
		Method:  "GET",
		Href:    "/api/todos/" + out.Id,
		Type:    "todos.Item",
		Service: "TodosService",
	})

	return &todos.ItemEntity{
		Data:  out,
		Links: hts,
	}
}

// Maps an array with Tasks to a protobuf Task Collection
// DBMeta and Context  is used for HATEOAS
func mapItemsToItemCollcetion(todoList []*Item) *todos.ItemCollection {
	var todoItems []*todos.ItemEntity
	for _, todoItem := range todoList {
		todoEntity := mapItemToItemEntity(todoItem)
		todoItems = append(todoItems, todoEntity)
	}
	hts := []*furo.Link{}
	hts = append(hts, &furo.Link{
		Rel:     "list",
		Method:  "GET",
		Href:    "/api/todos",
		Type:    "todos.Item",
		Service: "TodosService",
	})

	return &todos.ItemCollection{
		Meta:     nil,
		Links:    hts,
		Entities: todoItems,
	}
}

func mapISO8601ToDate(iso8601string string) *date.Date {
	s := strings.Split(iso8601string, "-")

	year, _ := strconv.Atoi(s[0])
	month, _ := strconv.Atoi(s[1])
	day, _ := strconv.Atoi(s[2])

	out := date.Date{
		Year:  int32(year),
		Month: int32(month),
		Day:   int32(day),
	}

	return &out
}
