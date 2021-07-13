import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { createProvider } from "./vue-apollo";
import gql from "graphql-tag";

Vue.config.productionTip = false;

export const EventBus = new Vue();

let IS_LOGGED_IN = false;
let IS_ADMIN = false;

new Vue({
  router,
  apollo: {
    currentUser: {
      query: gql`
        {
          currentUser {
            isAdmin
            customer {
              user {
                firstName
              }
              cart {
                totalCartItems
                totalCartPrice
              }
            }
          }
        }
      `,
      update: (data) => data.currentUser,
    },
  },
  data: {
    isLoggedIn: IS_LOGGED_IN,
  },
  created() {
    let test = this.$apollo.queries.currentUser.refetch();
    test.then((res) => {
      const currentUser = res.data.currentUser;
      if (currentUser == null) {
        IS_LOGGED_IN = false;
      } else {
        IS_LOGGED_IN = true;
        if (currentUser.isAdmin) {
          IS_ADMIN = true;
          return;
        }
        IS_ADMIN = false;
      }
    });
  },
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (IS_ADMIN) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }

  if (to.matched.some((record) => record.meta.hideForAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to home page.
    if (!IS_LOGGED_IN) {
      next();
    } else {
      next({ name: "Home" });
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});
