<template>
  <div id="app">
    <b-form @submit="onSubmit">
      <b-form-group label="User Name:" label-for="username">
        <b-form-input id="username" v-model="form.username"
                      placeholder="Enter name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password"
                      type="password" required></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    onSubmit(e) {
      e.preventDefault();
      this.login(this.form);
      this.$router.push({ name: 'Home' });
    }
  }
}
</script>
<style scoped>
</style>
