var id = null

window.addEventListener("load", function () {
    var url = new URL(window.location.href)
    id = url.searchParams.get("id")

    if (id) {
        // Fetch the list of sastojci from the server
        fetch("http://localhost:9000/sastojak/", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(resp => resp.json())
            .then(data => {
                const selectElement = document.getElementById("spisak-sastojaka")
                data.forEach(sastojak => {
                    const option = document.createElement("option")
                    option.value = sastojak.id
                    option.textContent = sastojak.naziv
                    selectElement.appendChild(option)
                })
            })
            .catch(err => console.log(err))

        //dohvatiti jelo sa tim id-om
        fetch("http://localhost:9000/jelo/" + id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(resp => resp.json())
            .then(data => {
                console.log(data) //proverite sta ste dobili

                document.getElementById("naziv").value = data.naziv
                document.getElementById("opis").value = data.opis
                document.getElementById("kategorija").value = data.kategorija_id
                document.getElementById("cena").value = data.cena

                if (data.sastojci) {
                    for (let i = 0; i < data.sastojci.length; i++) {
                        dodajSastojak(data.sastojci[i].id) //zavisno sta je u nizu, mozda vam treba .id
                    }
                }
            })
            .catch(err => console.log(err))
    }

    document.getElementById("obrisi").addEventListener("click", function () {
        if (confirm("Potvrdi brisanje")) {
            fetch("http://localhost:9000/jelo/" + id, {
                method: "DELETE", headers: {
                    "Content-Type": "application/json", "Authorization": `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => { //response sadrzi samo id obrisanog
                    alert(data.message)
                    window.location.href = "/jela.html"
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

        var izmenjenoJelo = {}  // Create updated dish object
        izmenjenoJelo.naziv = document.getElementById("naziv").value
        izmenjenoJelo.opis = document.getElementById("opis").value
        izmenjenoJelo.kategorija_id = document.getElementById("kategorija").value
        izmenjenoJelo.cena = document.getElementById("cena").value

        // document.getElementById("sastojci-input").value = JSON.stringify(niz); // Set hidden input value
        var spanovi = document.querySelectorAll("#sastojci > span.badge")
        var sastojci = []
        for (let i = 0; i < spanovi.length; i++) {
            sastojci.push(spanovi[i].dataset.id)
        }
        // izmenjenoJelo.sastojci = sastojci;
        izmenjenoJelo.sastojci = JSON.stringify(sastojci)

        fetch("http://localhost:9000/jelo/" + id, {
            method: "PUT", Headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }, body: JSON.stringify(izmenjenoJelo)
        })
            .then(succ => succ.json())
            .then(() => {
                // Redirect to the list page
                window.location.href = "/jela.html"
            })
            .catch(err => console.log(err))
    })

    function validacija() {
        var validno = true
        if (document.getElementById("naziv").value.length < 3) {
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

    document.getElementById("dodaj-sastojak").addEventListener("click", function () {
        var id = document.getElementById("spisak-sastojaka").value
        if (!id) {
            alert("Izaberi sastojak")
            return
        }
        dodajSastojak(id)
    })

    function dodajSastojak(id) {
        document.querySelector(`#spisak-sastojaka > option[value='${id}']`).disabled = true
        document.getElementById("spisak-sastojaka").selectedIndex = 0

        var naziv = document.querySelector(`#spisak-sastojaka > option[value='${id}']`).innerHTML

        var span = document.createElement("span")
        span.classList.add("badge")
        span.classList.add("bg-secondary")
        span.dataset.id = id
        span.innerHTML = naziv

        var button = document.createElement("button")
        button.type = "button"
        button.classList.add("btn")
        button.classList.add("btn-default")
        button.classList.add("btn-sm")
        button.innerHTML = "X"

        button.addEventListener("click", function () {
            var id = this.parentNode.dataset.id
            this.parentNode.parentNode.removeChild(this.parentNode)
            document.querySelector(`#spisak-sastojaka > option[value='${id}']`).disabled = false
        })

        span.appendChild(button)
        document.getElementById("sastojci").appendChild(span)
        document.getElementById("sastojci").appendChild(document.createTextNode(" "))
    }
})