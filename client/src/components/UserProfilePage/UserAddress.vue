<template>
  <div class="slowShow">
    <div
      class="bg-white px-3 py-4 flex w-full justify-between md:justify-center items-center md:shadow-lg"
    >
      <img
        @click="closeMenu()"
        class="w-5 h-5 md:hidden transform rotate-90 cursor-pointer"
        src="https://i.ibb.co/dQxfSHq/down.png"
      />
      <p class="uppercase text-sm tracking-wider">Address Details</p>
      <div class="w-5 h-5"></div>
    </div>

    <div class="bg-gray-200 w-full p-1"></div>

    <div class="bg-white mt-3 p-3 md:flex md:flex-col md:w-full md:m-auto">
      <form class="px-3 md:w-3/4 md:m-auto">
        <div class="flex items-center justify-between mt-8">
          <div class="label-grey mr-10">First Name:</div>
          <input
            class="userDetailsInput w-1/2"
            v-model="userObject.firstName"
            type="text"
            placeholder="*First Name"
          />
        </div>
        <div class="flex items-center justify-between mt-8">
          <div class="label-grey mr-10">Last Name:</div>
          <input
            class="userDetailsInput w-1/2"
            v-model="userObject.lastName"
            type="text"
            placeholder="*Last Name"
          />
        </div>

        <div class="flex flex-col mt-8">
          <div class="label-grey self-start mb-3">Email:</div>
          <input
            class="userDetailsInput"
            v-model="userObject.email"
            type="text"
            placeholder="*Email"
          />
        </div>
        <div class="flex flex-col mt-8">
          <div class="label-grey self-start mb-3">Address Line 1:</div>
          <input
            class="userDetailsInput"
            v-model="userObject.addressLine1"
            type="text"
            placeholder="*Address Line 1"
          />
        </div>
        <div class="flex flex-col mt-8">
          <div class="label-grey self-start mb-3">Address Line 2:</div>
          <input
            class="userDetailsInput"
            v-model="userObject.addressLine2"
            type="text"
            placeholder="Address Line 2"
          />
        </div>
        <div class="flex justify-between">
          <div class="flex flex-col mt-8">
            <div class="label-grey self-start mb-3">City:</div>
            <input
              class="userDetailsInput"
              v-model="userObject.city"
              type="text"
              placeholder="*City"
            />
          </div>
          <div class="flex flex-col mt-8">
            <div class="label-grey self-start mb-3">Post Code:</div>
            <input
              class="userDetailsInput"
              v-model="userObject.postcode"
              type="text"
              placeholder="*Post Code"
            />
          </div>
        </div>
        <div class="flex justify-between">
          <div class="flex flex-col mt-8">
            <div class="label-grey self-start mb-3">Country:</div>
            <input
              class="userDetailsInput"
              v-model="userObject.country"
              type="text"
              placeholder="*Country"
            />
          </div>
          <div class="flex flex-col mt-8">
            <div class="label-grey self-start mb-3">Phone Number:</div>
            <input
              class="userDetailsInput"
              v-model="userObject.phoneNumber"
              type="text"
              placeholder="*Phone Number"
            />
          </div>
        </div>
      </form>

      <div class="buttonArea">
        <!-- :class="{ disable: !missingValues }" -->
        <button
          class="btn-green btn-lrg my-10"
          @click="saveDetails()"
          :class="{ disable: isDisabled }"
        >
          Confirm Details
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["user"],
  data() {
    return {
      userObject: {
        firstName: "",
        lastName: "",
        email: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        postcode: "",
        country: "",
        phoneNumber: "",
      },
      missingValues: true,
    };
  },
  methods: {
    saveDetails() {
      this.$store.dispatch("saveAddress", this.userObject);

      const user = this.$store.getters["getUserDetails"];
      console.log("USER: ", user);

      axios
        .put(
          `${process.env.VUE_APP_BASE_URL}users/address/${user._id}`,
          this.userObject
        )
        .then((updatedUser) => {
          console.log("updated user: ");
          console.log(updatedUser.data);
          this.closeMenu();
        })
        .catch((e) => {
          console.log(`error: ${e}`);
        });
    },
    closeMenu() {
      this.$emit("closeMenu", "userAddress");
    },
  },

  computed: {
    checkAllDetails() {
      var isMissing = false;
      for (var key in this.userObject) {
        if (!this.userObject[key]) {
          isMissing = false;
        } else {
          isMissing = false;
        }
      }
      console.log(`MISSING: ${isMissing}`);
      return isMissing;
    },
    isDisabled() {
      const values = Object.values(this.userObject);

      return values.every((val) => val != "");
    },
  },
  created() {
    const addressDetails = this.$store.getters["getAddress"];
    if (addressDetails) this.userObject = addressDetails;
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
  border-bottom: 2px solid #365a69;
}

.missingInfo {
  border-bottom: 2px solid red;
}
</style>
