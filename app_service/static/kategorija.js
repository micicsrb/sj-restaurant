var id = null

window.addEventListener("load", function () {
    var url = new URL(window.location.href)
    id = url.searchParams.get("id")

    if (id) {
        fetch("http://localhost:9000/kategorija/" + id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(resp => resp.json())
            .then(data => {
                console.log(data) //proverite sta ste dobili

                document.getElementById("naziv").value = data.naziv
            })
            .catch(err => console.log(err))
    }

    document.getElementById("obrisi").addEventListener("click", function () {
        if (confirm("Potvrdi brisanje")) {
            fetch("http://localhost:9000/kategorija/" + id, {
                method: "DELETE", headers: {
                    "Content-Type": "application/json", "Authorization": `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    alert(data.message)
                    window.location.href = "/kategorije.html"
                })
                .catch(err => console.log(err))
        }
    })

    document.getElementById("forma").addEventListener("submit", function (event) {
        event.preventDefault()

        var validno = validacija()  // Perform validation
        if (!validno) {
            return
        }  // If not valid, exit

        var izmenjenaKategorija = {}  // Create updated dish object
        izmenjenaKategorija.naziv = document.getElementById("naziv").value

        fetch("http://localhost:9000/kategorija/" + id, {
            method: "PUT", Headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }, body: JSON.stringify(izmenjenaKategorija)
        })
            .then(succ => succ.json())
            .then(() => {
                // Redirect to the list page
                window.location.href = "/kategorije.html"
            })
            .catch(err => console.log(err))
    })

    function validacija() {
        var validno = true
        if (document.getElementById("naziv").value.length < 5) {
            validno = false
            document.getElementById("naziv").classList.add("error")
            document.getElementById("naziv").classList.remove("success")
        } else {
            document.getElementById("naziv").classList.remove("error")
            document.getElementById("naziv").classList.add("success")
        }
        return validno
    }

    document.getElementById("naziv").addEventListener("keypress", function () {
        this.classList.remove("success")
        this.classList.remove("error")
    })
})