<template>
  <div style="height: 100%">
    <div class="flex justify-between h-full w-11/12 lg:w-4/5 xl:w-2/3 m-auto">
      <div class="flex flex-col w-full text-left px-5 categoryPanel">
        <h4 class="uppercase pb-5 pl-2 text-sm text-gray-dark">Categories</h4>

        <div class="scroll">
          <div
            class="colItem flex justify-between items-center py-5 x-2 border-b border-gray-light cursor-pointer hover:bg-gray-50"
            v-for="category in categoryList"
            :key="category"
            @click="viewCategory(category)"
          >
            <div>{{ category.name }}</div>
            <Svg
              @click="closeChart()"
              :svgColour="svgColour"
              :svg="arrowSvg"
            ></Svg>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full text-left px-5 productPanel">
        <div>
          <h4
            v-if="categorySelected"
            class="uppercase pb-5 pl-2 text-sm text-gray-dark"
          >
            Products
          </h4>

          <div class="scroll">
            <div
              class="colItem flex flex-col border-b border-gray-light cursor-pointer p-2"
              v-for="product in productList"
              :key="product"
            >
              <div class="flex justify-between items-center">
                <div
                  class="productDesc flex items-center justify-start py-3 text-left"
                >
                  <div class="itemFont text-left font-bold pr-10">
                    {{ product.name }}
                  </div>
                  <div class="itemFont text-left text-xs">
                    € {{ product.price }}
                  </div>
                  <div class="itemFont text-left text-xs">
                    {{ product.numberInStock }} in stock
                  </div>
                </div>
                <div
                  class="productIcons flex items-center justify-end w-2/5 py-3"
                >
                  <Svg
                    @click="showDeletePopup(product)"
                    :svgColour="svgColour"
                    :svg="deleteSvg"
                  ></Svg>
                  <Svg
                    class="ml-8"
                    @click="editProduct(product)"
                    :svgColour="svgColour"
                    :svg="editSvg"
                  ></Svg>
                </div>
              </div>
            </div>
          </div>

          <button
            v-if="categorySelected"
            @click="addNewProductBtn()"
            class="btn-green btn-lrg absolute bottom-5"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>

    <transition name="slide-up">
      <EditProductPopup
        v-if="showEditProductPopup"
        :productObject="productToEdit"
        @saveProduct="saveProductEdits"
        @closePopup="closePopup"
      ></EditProductPopup>
    </transition>

    <transition name="slide-up">
      <ConfirmPopup
        v-if="showConfirmPopup"
        :popupData="popupMessage"
        @closePopup="closePopup"
        @confirmAction="deleteProduct"
      ></ConfirmPopup>
    </transition>
  </div>
</template>

<script>
import EditProductPopup from "./EditProductPopup.vue";
import ConfirmPopup from "../Designs/ConfirmPopup.vue";
import Svg from "../Designs/SvgBase.vue";
import axios from "axios";

export default {
  data() {
    return {
      svgColour: "#365a69",
      arrowSvg: "M9 5l7 7-7 7",
      deleteSvg:
        "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
      editSvg:
        "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
      hideProductBtn: false,
      categoryList: [],
      productList: [],
      showEditProductPopup: false,
      showNewProductPopup: false,
      categorySelected: "",
      productToEdit: {},

      showConfirmPopup: false,
      popupMessage: {
        title: "",
        message: "",
        icon: "",
      },
      deleteProductId: "",
    };
  },
  methods: {
    closePopup() {
      this.deleteProductId = "";
      this.showConfirmPopup = false;
      this.showEditProductPopup = false;
      this.emitter.emit("hideOverlay");
    },
    viewCategory(category) {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}products/category/${category._id}`)
        .then((data) => {
          this.productList = data.data;
        });
      this.categorySelected = category._id;
    },
    showDeletePopup(product) {
      this.deleteProductId = product._id;
      this.popupMessage.title = `Delete ${product.name} ?`;
      this.popupMessage.message =
        "Please confirm if you wish to remove this item";
      this.popupMessage.icon =
        "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16";
      this.emitter.emit("showOverlay");
      this.showConfirmPopup = true;
    },
    deleteProduct() {
      console.log("DELETE PRODUCT", this.deleteProductId);
      axios
        .delete(
          `${process.env.VUE_APP_BASE_URL}products/${this.deleteProductId}`
        )
        .then((data) => {
          let deletedItem = data.data;
          console.log("deleted: ", deletedItem);
          this.refreshProducts();
          this.closePopup();
        });
    },
    editProduct(product) {
      this.productToEdit = product;
      product.edit = !product.edit;
      this.hideProductBtn = !this.hideProductBtn;
      this.emitter.emit("showOverlay");
      this.showEditProductPopup = !this.showEditProductPopup;
    },
    addNewProductBtn() {
      this.emitter.emit("showOverlay");
      this.showEditProductPopup = true;
    },

    closeEditPopup() {
      this.productToEdit = {};
      this.showEditProductPopup = false;
      this.emitter.emit("hideOverlay");
    },
    refreshProducts() {
      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}products/category/${this.categorySelected}`
        )
        .then((data) => {
          console.log("category items: ", data);
          this.productList = data.data;
        });
    },
    saveProductEdits(productInfo) {
      console.log("SAVING: ");
      console.log(productInfo);
      if (productInfo._id) {
        console.log("product edited");
        this.saveEditedProduct(productInfo);
      } else {
        console.log("new product");
        productInfo.genreId = this.categorySelected;
        console.log(productInfo);
        this.addNewProduct(productInfo);
      }
      this.closeEditPopup();
      this.productToEdit = {};
    },
    saveEditedProduct(productObj) {
      axios
        .put(
          `${process.env.VUE_APP_BASE_URL}products/${productObj._id}`,
          productObj
        )
        .then((data) => {
          console.log(data.data);
          this.refreshProducts();
          this.emitter.emit("showNotification", {
            state: true,
            title: "Success!",
            message: "New Details saved.",
          });
        })
        .catch((err) => {
          console.log(err);

          this.emitter.emit("showNotification", {
            state: false,
            title: "Ooops!",
            message: "Somethings gone wrong.",
          });
        });
    },
    addNewProduct(productObj) {
      axios
        .post(`${process.env.VUE_APP_BASE_URL}products/`, productObj)
        .then((data) => {
          console.log(data.data);
          this.refreshProducts();
          this.emitter.emit("showNotification", {
            state: true,
            title: "Success!",
            message: "New Product saved.",
          });
        })
        .catch((err) => {
          console.log(err);
          this.emitter.emit("showNotification", {
            state: false,
            title: "Ooops!",
            message: "Somethings gone wrong.",
          });
        });
    },
  },
  created() {
    axios.get(`${process.env.VUE_APP_BASE_URL}categories/`).then((data) => {
      this.categoryList = data.data;
    });
  },
  components: {
    Svg,
    ConfirmPopup,
    EditProductPopup,
  },
};
</script>

<style scoped>
.categoryPanel,
.productIcons {
  flex: 1;
}

.productPanel {
  flex: 2;
}

.scroll {
  overflow: auto;
  height: 300px;
}

.colItem {
  transition: all 0.2s ease-in-out;
}

.productDesc {
  flex: 4;
}

.itemFont {
  width: 30%;
}
</style>
