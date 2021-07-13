<template>
  <section class="login">
    <main>
      <h2 class="title">Register</h2>
      <div class="container">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >First Name</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Ex. George"
              v-model="form.firstName"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Last Name</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Ex. Harrylon"
              v-model="form.lastName"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Username</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Ex. myusername"
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
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div class="mt-3 mb-3">
          <router-link :to="{ name: 'Login' }">
            Go back to Login page
          </router-link>
        </div>

        <router-link :to="{ name: 'Home' }">
          Go to home page
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
        firstName: "",
        lastName: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$apollo.mutate({
        mutation: gql`
          mutation(
            $firstName: String!
            $lastName: String!
            $username: String!
            $password: String!
          ) {
            registerUser(
              input: {
                firstName: $firstName
                lastName: $lastName
                credentials: { username: $username, password: $password }
              }
            ) {
              user {
                firstName
                lastName
                username
              }
              message
            }
          }
        `,
        variables: {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          username: this.form.username,
          password: this.form.password,
        },
      });
      location.replace("get-pet-merch/");
    },
  },
};
</script>
