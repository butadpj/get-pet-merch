<template>
  <div class="navbar">
    <div>
      <h2 class="title"><slot></slot></h2>
      <div class="links">
        <router-link to="/" :class="{ active: activeClass == 'home' }"
          >Home</router-link
        >
        <router-link to="/admin" :class="{ active: activeClass == 'admin' }"
          >Admin</router-link
        >
        <a v-if="isLoggedIn" @click="logoutUser" href="#">Logout</a>
      </div>
    </div>
    <router-link v-if="!isLoggedIn" :to="{ name: 'Login' }">Login</router-link>
    <div class="cart-info" v-if="isLoggedIn">
      <span class="material-icons-outlined"> shopping_cart </span>
      <div class="cart-count">{{ cartCount }}</div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "Navbar",
  props: {
    activeClass: {
      type: String,
    },
    cartCount: {
      type: Number,
      default: 0,
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    logoutUser() {
      this.$apollo.mutate({
        mutation: gql`
          mutation {
            logoutUser(input: {}) {
              message
            }
          }
        `,
      });
      location.reload("get-pet-merch/logout");
    },
  },
};
</script>

<style scoped src="../assets/styles/components/Navbar.css"></style>
