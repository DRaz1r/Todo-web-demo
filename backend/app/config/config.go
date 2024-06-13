package config

var Config = config{
	APP: APP{
		PORT:   ":8081",
		DOMAIN: "localhost",
	},
	DB: DB{
		NAME:     "root",
		PASSWORD: "12345678",
		HOST:     "localhost",
		DB:       "cms",
		PORT:     "3306",
	},
}

type config struct {
	APP
	DB
}

type APP struct {
	PORT   string
	DOMAIN string
}
type DB struct {
	NAME     string
	PASSWORD string
	HOST     string
	DB       string
	PORT     string
}
