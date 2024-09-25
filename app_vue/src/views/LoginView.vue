<template>
  <b-container class="login-container">
    <b-row>
      <b-col>
        <h1>Login</h1>
        <b-form @submit="onSubmit">
          <b-form-group label="Username" label-for="usernameInput" class="mb-3">
            <b-form-input v-model="username" id="usernameInput" name="username" type="text"
                          placeholder="Username"></b-form-input>
          </b-form-group>
          <b-form-group label="Password" label-for="passwordInput" class="mb-3">
            <b-form-input v-model="password" id="passwordInput" name="password" type="password"
                          placeholder="Password"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="success" class="mb-3">Login</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {BContainer, BRow, BCol, BForm, BFormGroup, BFormInput, BButton} from "bootstrap-vue"
import {mapActions} from "vuex"

export default {
  name: "Login", components: {
    BContainer, BRow, BCol, BForm, BFormGroup, BFormInput, BButton
  }, data() {
    return {
      username: "", password: ""
    }
  }, methods: {
    ...mapActions(["login"]), onSubmit(e) {
      e.preventDefault()
      const form = {
        username: this.username,
        password: this.password
      }
      this.login(form)
      this.$router.push({name: "HelloWorld"})
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 600px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.b-form-group {
  margin-bottom: 15px;
}

.b-button {
  width: 100%;
}
</style>