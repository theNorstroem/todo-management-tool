package environment

import (
	"github.com/upper/db/v4"
	"github.com/upper/db/v4/adapter/sqlite"
	"log"
)

type Environment struct {
	DB db.Session
}

var Env *Environment

func InitEnv() {
	Env = &Environment{}
	dbSession, _ := connectDB()
	Env.DB = dbSession
}

func connectDB() (db.Session, error) {
	var settings = sqlite.ConnectionURL{
		Database: "data/tmt.db",
	}
	dbSession, err := sqlite.Open(settings)
	if err != nil {
		log.Fatalf("db.Open(): %q\n", err)
	}

	return dbSession, err
}
