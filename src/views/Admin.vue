<template>
  <div>
    <Navbar
      :cartCount="totalCartItems"
      :isLoggedIn="current_user ? true : false"
      activeClass="admin"
      >Admin Panel</Navbar
    >
    <section class="admin">
      <main>
        <h2 class="title">Manage Pet Merches</h2>

        <!-- Modal Add -->
        <div
          v-show="showAddPetItemModal"
          class="modal fade"
          :class="showAddPetItemModal ? 'show' : ''"
          :aria-hidden="showAddPetItemModal ? false : true"
          :aria-modal="showAddPetItemModal ? true : false"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          style="display:block; background:var(--dark-opacity)"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Add a New Pet Merch
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Name</label
                  >
                  <input
                    type="name"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="addModalFields.name"
                    placeholder="Ex. Cute Dog Shirt"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Description</label
                  >
                  <input
                    type="name"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="addModalFields.description"
                    placeholder="Ex. A Cute & Charming Dog Shirt"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Price</label
                  >
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="addModalFields.price"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Inventory</label
                  >
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="addModalFields.inventory"
                  />
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    v-model="addModalFields.isAvailable"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Is Available?
                  </label>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  @click="showAddPetItemModal = false"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="createPetItem(addModalFields)"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Edit -->
        <div
          v-show="showEditPetItemModal"
          class="modal fade"
          :class="showEditPetItemModal ? 'show' : ''"
          :aria-hidden="showEditPetItemModal ? false : true"
          :aria-modal="showEditPetItemModal ? true : false"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          style="display:block; background:var(--dark-opacity)"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Update Pet Merch
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Name</label
                  >
                  <input
                    type="name"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="editModalFields.name"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Description</label
                  >
                  <input
                    type="name"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="editModalFields.description"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Price</label
                  >
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="editModalFields.price"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Inventory</label
                  >
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="editModalFields.inventory"
                  />
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    :checked="editModalFields.isAvailable"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Is Available?
                  </label>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  @click="showEditPetItemModal = false"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="updatePetItem(editModalFields)"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="container mt-5">
          <div class="action-top">
            <h4>Total Pet Merches: 4</h4>
            <button
              @click="handleAddPetItem"
              class="button button-primary button-icon"
            >
              <span class="material-icons-outlined"> add </span>New Pet Merch
            </button>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Inventory</th>
                <th scope="col">Is Available?</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, index) in products"
                :key="product.id"
                :class="`product-${product.id}`"
              >
                <td>{{ index + 1 }}</td>
                <td class="editable">{{ product.name }}</td>
                <td class="editable">{{ product.description }}</td>
                <td class="editable">{{ product.price }}</td>
                <td class="editable">{{ product.inventory }}</td>
                <td class="editable">
                  {{ product.isAvailable ? "Yes" : "No" }}
                </td>
                <td>
                  <div>
                    <button
                      class="me-3 btn btn-primary"
                      @click="handleEditPetItem(product)"
                    >
                      EDIT
                    </button>
                    <button
                      class="btn btn-danger"
                      @click="deletePetItem(product.id)"
                    >
                      DELETE
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import gql from "graphql-tag";
export default {
  components: {
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
  data() {
    return {
      showEditPetItemModal: false,
      showAddPetItemModal: false,
      editModalFields: {},
      addModalFields: {
        name: "",
        description: "",
        price: 0,
        inventory: 0,
        isAvailable: true,
      },
    };
  },

  methods: {
    handleEditPetItem(product) {
      this.showEditPetItemModal = true;
      this.editModalFields = product;
    },
    handleAddPetItem() {
      this.showAddPetItemModal = true;
    },
    deletePetItem(id) {
      this.$apollo.mutate({
        mutation: gql`
          mutation($id: ID!) {
            deletePetItem(input: { id: $id }) {
              message
            }
          }
        `,
        variables: {
          id: id,
        },
        // Update the cache with the result
        // The query will be updated with the optimistic response
        // and then with the real result of the mutation
      });
      location.reload();
    },
    updatePetItem(fields) {
      this.$apollo.mutate({
        mutation: gql`
          mutation(
            $id: ID!
            $name: String
            $description: String
            $price: Float
            $inventory: Int
          ) {
            updatePetItem(
              input: {
                id: $id
                name: $name
                description: $description
                price: $price
                inventory: $inventory
              }
            ) {
              petItem {
                id
                name
                description
                price
                inventory
              }
              message
            }
          }
        `,
        variables: {
          id: fields.id,
          name: fields.name,
          description: fields.description,
          price: Number(fields.price),
          inventory: Number(fields.inventory),
        },
      });
      location.reload();
    },
    createPetItem(fields) {
      this.$apollo.mutate({
        mutation: gql`
          mutation(
            $name: String!
            $description: String!
            $price: Float!
            $inventory: Int!
            $isAvailable: Boolean!
          ) {
            createPetItem(
              input: {
                name: $name
                description: $description
                price: $price
                inventory: $inventory
                isAvailable: $isAvailable
              }
            ) {
              petItem {
                id
                name
                description
                price
                inventory
                isAvailable
              }
              message
            }
          }
        `,
        variables: {
          name: fields.name,
          description: fields.description,
          price: Number(fields.price),
          inventory: Number(fields.inventory),
          isAvailable: fields.isAvailable === "true",
        },
      });
      // location.reload();
    },
  },
};
</script>

<style scoped src="../assets/styles/components/Admin.css"></style>
