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
            <li class="nav-item" v-if="token">
              <router-link :to="{name: 'OrderView'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'OrderView'}">Naruči</router-link>
            </li>
            <li class="nav-item" v-if="token">
              <router-link :to="{name: 'OrdersView'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'OrdersView'}">Narudžbine</router-link>
            </li>
          </ul>

          <b-button v-if="!token" variant="outline-secondary" @click="$router.push('/register')">Register</b-button>
          <b-button v-if="!token" variant="outline-secondary" @click="$router.push('/login')">Login</b-button>
          <b-button v-else variant="outline-secondary" @click="logout()">Logout</b-button>
        </div>
      </div>
    </nav>
  </div>
</template>
 
<script>
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  name: "Navbar",
  computed: {
    ...mapState([
      'token'
    ])
  },
  methods: {
    ...mapMutations([
      'removeToken',
      'setToken'
    ]),
    logout() {
      this.removeToken();
      this.$router.push({ name: 'Login' });
    }
  },
  mounted() {
    if (localStorage.token) {
      this.setToken(localStorage.token);
    }
  }
}
</script>
