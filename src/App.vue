<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  apollo: {
    users: {
      query: gql`
        {
          users {
            id
          }
        }
      `,
      update: (data) => data.users,
    },
  },
};
</script>

<style>
@import "./assets/styles/_globals.css";
</style>
