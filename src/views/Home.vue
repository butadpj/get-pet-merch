<template>
  <div>
    <Navbar
      activeClass="home"
      :cartCount="totalCartItems"
      :isLoggedIn="current_user ? true : false"
      >Get Pet Merch Online</Navbar
    >
    <section class="products">
      <main>
        <h2 class="title">Pet Merches</h2>
        <div
          v-for="product in products"
          v-show="product.inventory > 0"
          :key="product.id"
          class="product-wrapper"
        >
          <Product
            :cart="current_user ? current_user.customer.cart : {}"
            :id="Number(product.id)"
            :name="product.name"
            :description="product.description"
            :inventory="Number(product.inventory)"
          />
        </div>
      </main>
    </section>
  </div>
</template>

<script>
import Product from "../components/Product.vue";
import Navbar from "../components/Navbar.vue";
import gql from "graphql-tag";

export default {
  name: "Home",
  components: {
    Product,
    Navbar,
  },
  apollo: {
    products: {
      query: gql`
        {
          petItems {
            id
            name
            description
            price
            inventory
            isAvailable
          }
        }
      `,
      update: (data) => data.petItems,
    },
    current_user: {
      query: gql`
        {
          currentUser {
            id
            firstName
            username
            customer {
              cart {
                id
                totalCartItems
                totalCartPrice
                cartItems {
                  id
                  petItemId
                }
              }
            }
          }
        }
      `,
      update: (data) => data.currentUser,
    },
    totalCartItems: {
      query: gql`
        {
          totalCartItems
        }
      `,
    },
  },
  computed: {
    test() {
      console.log(this.cart);
      return this.current_user;
    },
  },
};
</script>

<style scoped src="../assets/styles/views/Home.css"></style>
