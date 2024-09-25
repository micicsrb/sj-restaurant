import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',
        jela: [],
        narudzbine: [],
        orders: [],
        cart: []
    },

    getters: {
        getJela: state => state.jela,
        getOrders: state => state.orders,
        getNarudzbine: state => state.narudzbine,
        getCart: state => state.cart, // Add getter for cart
        getTotalCena: state => {
            return state.cart.reduce((total, item) => {
                return total + (item.jedinicna_cena * item.komada);
            }, 0);
        }
    },

    mutations: {
        setToken(state, token) {
            localStorage.token = token;
        },
        removeToken(state) {
            state.token = "izlogovan";
            localStorage.token = "izlogovan";
        },
        setJela(state, jela) {
            state.jela = jela;
        },
        addNarudzbina(state, narudzbina) {
            state.narudzbine.push(narudzbina);
        },
        addToCart(state, item) {
            const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                existingItem.komada++;
            } else {
                state.cart.push({ ...item, komada: 1 });
            }
        },
        setOrders(state, orders) {
            state.orders = orders;
        },
        clearCart(state) {
            state.cart = [];
        }
    },

    actions: {
        login({ commit }, credentials) {
            // Implement login logic here
        },
        register({ commit }, userData) {
            // Implement register logic here
        },
        fetchJela({ commit }) {
            fetch("http://localhost:9000/jelo/")
                .then(response => response.json())
                .then(data => {
                    commit("setJela", data);
                })
                .catch(error => {
                    console.error("Error fetching jela:", error);
                });
        },
        fetchOrders({ commit }) {
            const username = "john_doe";/* logic to get the logged-in user's ID */ //TODO promeniti
            fetch(`http://localhost:9000/narudzbina/user/${username}`)
                .then(response => response.json())
                .then(data => {
                    commit("setOrders", data);
                })
                .catch(error => {
                    console.error("Error fetching orders:", error);
                });
        },
        submitNarudzbina({ commit }, narudzbina) {
            fetch("http://localhost:9000/narudzbina/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(narudzbina)
            })
                .then(response => response.json())
                .then(data => {
                    commit("addNarudzbina", data);
                    commit("clearCart");
                })
                .catch(error => {
                    console.error("Error submitting narudzbina:", error);
                });
        },

    }
});