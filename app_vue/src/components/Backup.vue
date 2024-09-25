<template>
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" :to="{ path: '/' }">Restoran</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{name: 'JelaView'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'JelaView'}">Jela</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'OrderView'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'OrderView'}">Naruči</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'OrdersView'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'OrdersView'}">Narudžbine</router-link>
            </li>
          </ul>

          <form v-if="canLoginIf" class="d-flex" @submit.prevent="login" >
             <button class="btn btn-outline-secondary" type="submit">Login</button>
          </form>

          <form v-if="canLogin" class="d-flex" @submit.prevent="register">
             <button class="btn btn-outline-secondary" type="submit">Register</button>
          </form>

          <form v-if="canLogout" class="d-flex" @submit.prevent="logout">
            <button class="btn btn-outline-secondary" type="submit">Logout</button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>
 
<script>
export default {
  name: "Navbar",
  computed: {
    canLogout() {
      return this.$store.state.token !== 'izlogovan';
    },
    canLogin() {
      return this.$store.state.token === 'izlogovan';
    },
    canLoginIf() {
      return this.$store.state.token === 'izlogovan' && this.$router.currentRoute.name !== 'login';
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$store.state.token = 'izlogovan'
      this.$router.push({name: 'Login'});
    },
    login(){
      this.$router.push({name: 'Login'});
    },
    register(){
      this.$router.push({name:"Register"})
    }
  }
}
</script>
