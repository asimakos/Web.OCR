
package main
import (
	"net/http"
	"fmt"
	"html/template"
)


type Welcome struct {
	Title string
	Image string
	File string
	Warning string
	Success string
}


func main() {
     
	welcome := Welcome{"Αναγνώριση κειμένου","Επιλογή εικόνας","image","Επεξεργασία ...","Ολοκλήρωση !"}

	templates := template.Must(template.ParseFiles("templates/welcome.html"))
    
	http.Handle("/static/", //final url can be anything
		http.StripPrefix("/static/",
			http.FileServer(http.Dir("./static"))))

	//This method takes in the URL path "/" and a function that takes in a response writer, and a http request.
	http.HandleFunc("/" , func(w http.ResponseWriter, r *http.Request) {

		if err := templates.ExecuteTemplate(w, "welcome.html", welcome); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	})

	fmt.Println(http.ListenAndServe(":8080", nil));

}
