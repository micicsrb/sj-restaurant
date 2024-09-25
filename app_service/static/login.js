window.addEventListener("load", () => {
    document.getElementById("login").addEventListener("click", (evt) => {
        evt.preventDefault()

        const data = {
            username: document.getElementById("username").value, password: document.getElementById("password").value
        }

        fetch("http://127.0.0.1:9001/login", {
            method: "POST", headers: {
                "Content-Type": "application/json", "Authorization": `Bearer ${token}`
            }, body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.msg) {
                    //prikazi gresku
                    alert(data.msg)
                } else {
                    //zapisi token u cookie
                    document.cookie = `token=${data.token};SameSite=Lax`
                    //redirektuj na index.html stranicu
                    window.location.href = "/"
                }
            })
    })
})
