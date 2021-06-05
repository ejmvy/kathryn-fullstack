<template>
  <div class="popupIndex mainPopupArea w-4/5 fixed flex justify-center">
    <div class="bg-white rounded-sm shadow-lg flex">
      <div class="textArea flex flex-col p-1 pt-4">
        <h2 class="mt-5 uppercase text-sm font-bold text-gray-dark">
          {{ productObject.name ? editTitle + productObject.name : addTitle }}
        </h2>
        <form class="mt-10">
          <div class="flex">
            <div class="inputArea">
              <label>Name:</label>
              <input
                type="text"
                :value="productObject.name"
                @change="saveEdit('name')"
              />
            </div>
            <div class="inputArea">
              <label>Price:</label>
              <input
                type="text"
                :value="productObject.price"
                @change="saveEdit('price')"
              />
            </div>
            <div class="inputArea">
              <label>Stock No:</label>
              <input
                :value="productObject.numberInStock"
                type="text"
                @change="saveEdit('stock')"
              />
            </div>
          </div>
          <div class="inputArea">
            <label>Description:</label>
            <input
              type="text"
              :value="productObject.description"
              @change="saveEdit('description')"
            />
          </div>
          <div class="inputArea">
            <label>Washing:</label>
            <input
              :value="productObject.washing"
              type="text"
              @change="saveEdit('washing')"
            />
          </div>
          <div>
            <div class="flex">
              <div class="inputArea">
                <label>Dimensions:</label>
                <input
                  :value="productObject.dimensions"
                  type="text"
                  @change="saveEdit('dimensions')"
                />
              </div>

              <div class="inputArea">
                <label>Colours:</label>
                <input
                  :value="productObject.colour"
                  type="text"
                  @change="saveEdit('colour')"
                />
              </div>
              <div class="inputArea"></div>
            </div>
          </div>
        </form>
        <div class="w-2/3 absolute bottom-5">
          <div class="w-full flex justify-center">
            <button @click="closePopup()" class="btn-green btn-sm mr-2">
              Back
            </button>
            <button @click.prevent="saveEdits()" class="btn-green btn-sm ml-2">
              Save
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="!isNewProduct"
        class="ImageArea flex text-white bg-green-dark flex-col items-center p-3"
      >
        <div class="h-1/2 w-full">
          <img
            v-if="
              editedProduct.imageUrlArray[0] || productObject.imageUrlArray[0]
            "
            class="relative w-full h-full"
            :src="
              editedProduct.imageUrlArray[0]
                ? editedProduct.imageUrlArray[0]
                : productObject.imageUrlArray[0]
            "
          />
        </div>

        <div class="flex mt-5">
          <div class="smImageArea" @click.prevent="onPickFile2">
            <img
              v-if="
                editedProduct.imageUrlArray[1] || productObject.imageUrlArray[1]
              "
              class="smImage"
              :src="
                editedProduct.imageUrlArray[1]
                  ? editedProduct.imageUrlArray[1]
                  : productObject.imageUrlArray[1]
              "
            />
          </div>
          <div class="smImageArea">
            <img
              v-if="
                editedProduct.imageUrlArray[2] || productObject.imageUrlArray[2]
              "
              class="smImage"
              :src="
                editedProduct.imageUrlArray[2]
                  ? editedProduct.imageUrlArray[2]
                  : productObject.imageUrlArray[2]
              "
            />
          </div>
          <div class="smImageArea">
            <img
              v-if="
                editedProduct.imageUrlArray[3] || productObject.imageUrlArray[3]
              "
              class="smImage"
              :src="
                editedProduct.imageUrlArray[3]
                  ? editedProduct.imageUrlArray[3]
                  : productObject.imageUrlArray[3]
              "
            />
          </div>
        </div>
        <button
          class="btn-white btn-lrg absolute bottom-5"
          @click.prevent="onPickFile"
        >
          Upload Images
        </button>
        <input
          type="file"
          style="display: none"
          ref="fileInput"
          accept="image/*"
          multiple
          @change.prevent="onFilePicked"
        />
      </div>

      <div
        v-if="isNewProduct"
        class="ImageArea flex text-white bg-green-dark flex-col items-center p-3"
      >
        <div class="h-1/2 w-full border-gray-light border-dashed rounded-sm">
          <img
            class="relative w-full h-full"
            :src="
              editedProduct.imageUrlArray[0]
                ? editedProduct.imageUrlArray[0]
                : ''
            "
          />
        </div>

        <div class="flex mt-5">
          <div class="smImageArea">
            <img
              class="smImage"
              :src="
                editedProduct.imageUrlArray[1]
                  ? editedProduct.imageUrlArray[1]
                  : ''
              "
            />
          </div>
          <div class="smImageArea">
            <img
              class="smImage"
              :src="
                editedProduct.imageUrlArray[2]
                  ? editedProduct.imageUrlArray[2]
                  : ''
              "
            />
          </div>
          <div class="smImageArea">
            <img
              class="smImage"
              :src="
                editedProduct.imageUrlArray[3]
                  ? editedProduct.imageUrlArray[3]
                  : ''
              "
            />
          </div>
        </div>
        <button
          class="btn-white btn-lrg absolute bottom-5"
          @click.prevent="onPickFile"
        >
          Upload Images
        </button>
        <input
          type="file"
          style="display: none"
          ref="fileInput"
          accept="image/*"
          multiple
          @change.prevent="onFilePicked"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["productObject"],
  data() {
    return {
      imageRaw: null,
      isNewProduct: false,
      editTitle: "Edit ",
      addTitle: "Add New Product",
      editedProduct: {
        name: "",
        price: "",
        description: "",
        washing: "",
        dimensions: "",
        colours: "",
        stock: "",
        imageRaw: null,
        smallImage1Url: "",
        imageUrlArray: [],
        imageRawFiles: [],
      },
    };
  },
  methods: {
    saveEdit(edit) {
      return (this.editedProduct[edit] = event.target.value);
    },
    saveEdits() {
      console.log("OLD");
      console.log(this.productObject);
      var keys = Object.keys(this.productObject);

      const newEdits = {
        _id: keys.length ? this.productObject._id : "",
        name: this.editedProduct.name
          ? this.editedProduct.name
          : this.productObject.name,
        price: this.editedProduct.price
          ? this.editedProduct.price
          : this.productObject.price,
        genreId: keys.length ? this.productObject.category._id : "",
        description: this.editedProduct.description
          ? this.editedProduct.description
          : this.productObject.description,
        washing: this.editedProduct.washing
          ? this.editedProduct.washing
          : this.productObject.washing,
        dimensions: this.editedProduct.dimensions
          ? this.editedProduct.dimensions
          : this.productObject.dimensions,
        colour: this.editedProduct.colour
          ? this.editedProduct.colour
          : this.productObject.colour,
        numberInStock: this.editedProduct.stock
          ? this.editedProduct.stock
          : this.productObject.numberInStock,
        imageRaw: this.editedProduct.imageRaw,
        imageUrlArray: this.editedProduct.imageUrlArray.length
          ? this.editedProduct.imageUrlArray
          : this.productObject.imageUrlArray,
      };

      this.$emit("saveProduct", newEdits);
    },
    clearEditObject() {
      this.editedProduct = {
        name: "",
        price: "",
        description: "",
        washing: "",
        dimensions: "",
        colours: "",
        stock: "",
        imageRaw: null,
        smallImage1Url: "",
        imageUrlArray: [],
        imageRawFiles: [],
      };
    },
    closePopup() {
      this.clearEditObject();
      this.$emit("closePopup");
    },
    onPickFile(e) {
      e.preventDefault();
      this.$refs.fileInput.click();
    },
    // onPickFile2() {
    //   console.log('file picking');
    //   this.$refs.fileInput2.click();
    // },
    onFilePicked(e) {
      e.preventDefault();
      this.editedProduct.imageUrlArray = [];
      const files = e.target.files;

      for (var file in Object.entries(files)) {
        let filename = files[file].name;
        if (filename.lastIndexOf(".") <= 0) {
          return alert("Please add a valid file");
        }
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.editedProduct.imageUrlArray.push(fileReader.result);
        });
        fileReader.readAsDataURL(files[file]);
        this.editedProduct.imageRawFiles.push(files[file]);
      }

      // }

      console.log("URL FILES");
      // console.log(imageNewArr);
      console.log(this.editedProduct.imageUrlArray);
    },
    // onFile2Picked(e) {
    //   const files = e.target.files;
    //   let filename = files[0].name;
    //   if (filename.lastIndexOf('.') <= 0) {
    //     return alert('Please add a valid file');
    //   }
    //   const fileReader = new FileReader()
    //   fileReader.addEventListener('load', () => {
    //     this.editedProduct.smallImage1Url = fileReader.result
    //   })
    //   fileReader.readAsDataURL(files[0])
    //   // this.editedProduct.imageRaw = files[0];
    // }
  },
  created() {
    console.log("EDIT OBJECT:");
    const objKeys = Object.keys(this.productObject);
    this.isNewProduct = objKeys.length ? false : true;
    console.log(this.productObject);
  },
};
</script>

<style scoped>
.mainPopupArea {
  top: 15%;
  left: 10%;
  height: 600px;
}

.textArea {
  flex: 2;
}

.inputArea {
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}

.ImageArea {
  flex: 1;
}

.smImageArea {
  flex: 1;
  height: 60px;
  width: inherit;
  min-width: 60px;
  border: 2px solid #ccc;
  border-style: dashed;
  border-radius: 5px;
  margin: 0 10px;
  cursor: pointer;
}

.smImage {
  width: 100%;
  height: 100%;
}

input[type="file"] {
  display: none;
}

.custom-file-upload {
  border-radius: 50%;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12px;
  text-transform: uppercase;
  position: absolute;
  bottom: 20px;
  /* right: 20px;  */
  text-decoration: underline;
}

form {
  width: inherit;
  padding: 0;
}

input {
  width: 100%;
  flex: 1 2 auto;
  font-size: 14px;
  padding: 15px 0 10px 5px;
  border: none;
  border-bottom: 1px solid #ccc;
  transition: all 0.2s ease-in-out;
  margin: 10px 0;
}

input:focus {
  outline: none;
  border-bottom: 1px solid #365a69;
}

label {
  color: #666666;
  font-size: 11px;
  text-transform: uppercase;
  text-align: left;
  padding-top: 5px;
}
</style>
