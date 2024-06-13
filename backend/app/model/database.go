package model

import (
	"crud/config"
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

var Db *sql.DB

func init() {
	var err error

	dsn := fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?charset=utf8", config.Config.DB.NAME, config.Config.DB.PASSWORD, config.Config.DB.HOST, config.Config.DB.DB)
	println(dsn)
	Db, err = sql.Open("mysql", dsn)

	if err != nil {
		fmt.Println(err)
		return
	}

	err = Db.Ping()

	if err != nil {
		fmt.Println(err)
		return
	}

	sql := `CREATE TABLE IF NOT EXISTS todos(
			id varchar(26) not null,
			name varchar(100) not null,
			status varchar(100) not null
		)`

	_, err = Db.Exec(sql)

	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("Connection has been established!")
}
