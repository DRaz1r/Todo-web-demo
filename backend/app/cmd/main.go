package main

import (
	"crud/config"
	"crud/controller"
	"crud/model"
	"flag"
	"fmt"
	"net/http"
)

var tm = model.CreateTodoModel()
var tc = controller.CreateTodoController(tm)
var ro = controller.CreateRouter(tc)

func migrate() {
	sql := `INSERT INTO todos(id, name, status) VALUES('1','买零食', '正在进行'),('2','洗衣服', '正在进行'),('3','学习Golang', '完成');`

	_, err := model.Db.Exec(sql)

	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("Migration is success!")
}

func main() {
	f := flag.String("option", "", "migrate database or not")
	flag.Parse()
	if *f == "migrate" {
		migrate()
	}
	ro.HandleRequest()
	http.ListenAndServe(config.Config.APP.PORT, nil)
}
