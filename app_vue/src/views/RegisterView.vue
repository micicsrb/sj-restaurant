<template>
  <b-container class="register-container">
    <b-row>
      <b-col>
        <h1>Register</h1>
        <b-form @submit.prevent="onSubmit">
          <b-form-group label="Username" label-for="usernameInput" class="mb-3">
            <b-form-input
                v-model="username"
                id="usernameInput"
                name="username"
                type="text"
                placeholder="Username"
                :state="usernameState"
                required
            ></b-form-input>
            <b-form-invalid-feedback v-if="!usernameState">
              Username must be at least 3 characters long.
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Password" label-for="passwordInput" class="mb-3">
            <b-form-input
                v-model="password"
                id="passwordInput"
                name="password"
                type="password"
                placeholder="Password"
                :state="passwordState"
                required
            ></b-form-input>
            <b-form-invalid-feedback v-if="!passwordState">
              Password must be at least 6 characters long.
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Confirm Password" label-for="confirmPasswordInput" class="mb-3">
            <b-form-input
                v-model="confirmPassword"
                id="confirmPasswordInput"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                :state="confirmPasswordState"
                required
            ></b-form-input>
            <b-form-invalid-feedback v-if="!confirmPasswordState">
              Passwords do not match or password is invalid.
            </b-form-invalid-feedback>
          </b-form-group>
          <b-button type="submit" variant="success" class="mb-3">Register</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { BContainer, BRow, BCol, BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue';
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  components: {
    BContainer, BRow, BCol, BForm, BFormGroup, BFormInput, BButton
  },
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: ''
    };
  },
  computed: {
    usernameState() {
      return this.username.length >= 3;
    },
    passwordState() {
      return this.password.length >= 6;
    },
    confirmPasswordState() {
      return this.passwordState && this.confirmPassword !== '' && this.password === this.confirmPassword;
    }
  },
  methods: {
    ...mapActions(['register']),
    onSubmit(e) {
      e.preventDefault();
      if (this.usernameState && this.passwordState && this.confirmPasswordState) {
        this.register({ username: this.username, password: this.password });
        this.$router.push({ name: 'HelloWorld' });
      }
    }
  }
};
</script>

<style scoped>
.register-container {
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