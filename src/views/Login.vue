<template>
  <section class="login">
    <main>
      <h2 class="title">Login</h2>
      <div class="container">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Username</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="myusername"
              v-model="form.username"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Password</label
            >
            <input
              type="password"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder=""
              v-model="form.password"
            />
          </div>
          <button type="submit" class="btn btn-primary">Submist</button>
        </form>
        <router-link :to="{ name: 'Register' }">
          Don't have an account? Register here
        </router-link>
      </div>
    </main>
  </section>
</template>

<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$apollo.mutate({
        mutation: gql`
          mutation($username: String!, $password: String!) {
            loginUser(
              input: {
                credentials: { username: $username, password: $password }
              }
            ) {
              user {
                firstName
                lastName
                username
                isAdmin
              }
              message
            }
          }
        `,
        variables: {
          username: this.form.username,
          password: this.form.password,
        },
      });
      location.replace("/get-pet-merch/");
    },
  },
};
</script>
