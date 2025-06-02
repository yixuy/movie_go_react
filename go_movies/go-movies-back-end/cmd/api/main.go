package main

import (
	"fmt"
	"log" 
	"net/http"
)

const port = 8080
type application struct {
	Domain string
}

func main(){
	// set config
	var app application
	 
	// read from cmd line

	// connect to the database
	app.Domain = "example.com"
	log.Println("Starting application on port", port)
	
	// http.HandleFunc("/", Hello)
	
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}
}