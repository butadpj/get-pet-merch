<template>
  <div class="product">
    <img class="product-img" :src="image" :alt="name" />
    <div class="product-info">
      <h2 class="name">{{ name }}</h2>

      <p v-if="inventory >= 10" class="stock-status in-stock">In Stock</p>

      <p
        v-else-if="inventory < 10 && inventory > 0"
        class="stock-status almost-sold-out"
      >
        Almost Sold Out
      </p>

      <p v-else class="stock-status out-of-stock">Out of Stock</p>

      <p class="description">
        {{ description }}
      </p>

      <!-- <div class="variants">
        <div class="color-variant">
          <h3>Colors:</h3>
          <div class="colors">
            <div
              v-for="color in variants.colors"
              :key="color.id"
              @mouseover="
                emitUpdateProduct(
                  id,
                  color.variantImage,
                  color.variantInventory
                )
              "
              :style="{ backgroundColor: color.name }"
            ></div>
          </div>
        </div>
      </div> -->

      <button @click="addToCart(id)" type="button" class="button">
        Add To Cart
      </button>

      <!-- <button
        v-if="isProductInCart"
        @click="emitUpdateCart(id, 'remove')"
        type="button"
        class="button"
      >
        Delete from Cart
      </button> -->

      <!-- <ProductTabs :reviews="reviews" /> -->
    </div>
  </div>
</template>

<script>
// import ProductTabs from "../components/ProductTabs";
// import { EventBus } from "../main";
import gql from "graphql-tag";
export default {
  name: "Product",
  // components: {
  //   ProductTabs,
  // },
  props: {
    cart: {
      type: Object,
    },
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default: "./images/default.png",
    },
    inventory: {
      type: Number,
    },
  },
  methods: {
    addToCart(id) {
      this.$apollo.mutate({
        mutation: gql`
          mutation($petItemId: Int!) {
            addCartItem(input: { petItemId: $petItemId }) {
              message
              cartItem {
                quantity
              }
            }
          }
        `,
        variables: {
          petItemId: parseInt(id),
        },
      });
      location.reload();
    },
  },
};
</script>

<style scoped src="../assets/styles/components/Product.css"></style>
