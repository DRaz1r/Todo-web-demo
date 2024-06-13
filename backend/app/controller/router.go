package controller

import (
	"net/http"
)

type Router interface {
	HandleRequest()
}

type router struct {
	tc TodoController
}

func CreateRouter(tc TodoController) Router {
	return &router{tc}
}

func (ro *router) HandleRequest() {
	http.HandleFunc("/todo/", ro.HandleTodoRequest)
}

func (ro *router) HandleTodoRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		return
	}

	prefix := "/todo/"

	switch r.URL.Path {
	case prefix + "fetch-todos":
		ro.tc.FetchTodos(w, r)
	case prefix + "add-todo":
		ro.tc.AddTodo(w, r)
	case prefix + "delete-todo":
		ro.tc.DeleteTodo(w, r)
	case prefix + "change-todo":
		ro.tc.ChangeTodo(w, r)
	default:
		w.WriteHeader(405)
	}
}
