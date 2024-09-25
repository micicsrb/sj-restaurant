import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

function decodeJWT(token) {
    try {
        const base64Url = token.split(".")[1]
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
        const jsonPayload = decodeURIComponent(atob(base64).split("").map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(""))

        return JSON.parse(jsonPayload)
    } catch (error) {
        console.error("Error decoding token:", error)
        return null
    }
}

export default new Vuex.Store({
    state: {
        token: "", jela: [], narudzbine: [], orders: [], cart: []
    },

    getters: {
        getJela: state => state.jela,
        getOrders: state => state.orders,
        getNarudzbine: state => state.narudzbine,
        getCart: state => state.cart,
        getTotalCena: state => {
            return state.cart.reduce((total, item) => {
                return total + (item.jedinicna_cena * item.komada)
            }, 0)
        },
        decodedToken: state => {
            if (state.token) {
                // alert(state.token);
                const decoded = decodeJWT(state.token)
                return decoded
            }
            return null
        }
    },

    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.token = token
        }, removeToken(state) {
            state.token = ""
            localStorage.token = ""
        }, setJela(state, jela) {
            state.jela = jela
        }, addNarudzbina(state, narudzbina) {
            state.narudzbine.push(narudzbina)
        }, addToCart(state, item) {
            const existingItem = state.cart.find(cartItem => cartItem.id === item.id)
            if (existingItem) {
                existingItem.komada++
            } else {
                state.cart.push({...item, komada: 1})
            }
        }, setOrders(state, orders) {
            state.orders = orders
        }, clearCart(state) {
            state.cart = []
        }
    },

    actions: {
        register({commit}, obj) {
            fetch("http://localhost:9001/register", {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(obj)
            }).then(res => res.json())
                .then(data => commit("setToken", data.token))
        }, login({commit}, obj) {
            fetch("http://localhost:9001/login", {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(obj)
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.msg) {
                        alert(data.msg)
                    } else {
                        commit("setToken", data.token)
                    }
                })
        }, fetchJela({commit}) {
            fetch("http://localhost:9000/jelo/")
                .then(response => response.json())
                .then(data => {
                    commit("setJela", data)
                })
                .catch(error => {
                    console.error("Error fetching jela:", error)
                })
        }, fetchOrders({commit, getters}) {
            const decodedToken = getters.decodedToken
            const username = decodedToken.user
            fetch(`http://localhost:9000/narudzbina/user/${username}`)
                .then(response => response.json())
                .then(data => {
                    commit("setOrders", data)
                })
                .catch(error => {
                    console.error("Error fetching orders:", error)
                })
        }, submitNarudzbina({commit, dispatch, state}, narudzbina) {
            fetch("http://localhost:9000/narudzbina/", {
                method: "POST", headers: {
                    "Content-Type": "application/json", "Authorization": `Bearer ${state.token}`
                }, body: JSON.stringify(narudzbina)
            })
                .then(response => response.json())
                .then(data => {
                    commit("addNarudzbina", data)
                    commit("clearCart")
                    dispatch("fetchOrders");
                })
                .catch(error => {
                    console.error("Error submitting narudzbina:", error)
                })
        }

    }
})