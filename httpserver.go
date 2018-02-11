package main

import (
	//	"io"
	"fmt"
	"net/http"
)

func res(w http.ResponseWriter, a string) {

	fmt.Fprintf(w, a)
}

func handler(w http.ResponseWriter, r *http.Request) {

	switch r.Method {

	case "GET":
		//res(w, fmt.Sprintf("Du vil ha %s?", r.URL.Path))
		http.ServeFile(w, r, r.URL.Path[1:])
		break
	case "PUT":
		res(w, fmt.Sprintf("PUT %d bytes", r.ContentLength))
		break
	default:
		res(w, "Nope\r\n")
		break
	}
}

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8000", nil)
}
