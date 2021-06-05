<template>
  <div class="bg-white mt-3 p-3 md:pb-8 md:mb-10">
    <h5 class="uppercase text-xs pb-4">Shipping Address</h5>
    <form class="px-3">
      <div>
        <input
          class="addressInput md:mt-10"
          v-model="userObject.firstName"
          type="text"
          placeholder="*First Name"
        />
      </div>
      <div>
        <input
          class="addressInput md:mt-10"
          v-model="userObject.lastName"
          type="text"
          placeholder="*Last Name"
        />
      </div>

      <div>
        <input
          class="addressInput md:mt-10"
          v-model="userObject.email"
          type="text"
          placeholder="*Email"
        />
      </div>
      <div>
        <input
          class="addressInput md:mt-10"
          v-model="userObject.addressLine1"
          type="text"
          placeholder="*Address Line 1"
        />
      </div>
      <div>
        <input
          class="addressInput md:mt-10"
          v-model="userObject.addressLine2"
          type="text"
          placeholder="Address Line 2"
        />
      </div>
      <div class="flex justify-between">
        <div class="mr-5">
          <input
            class="addressInput md:mt-10"
            v-model="userObject.city"
            type="text"
            placeholder="*City"
          />
        </div>
        <div class="ml-5">
          <input
            class="addressInput md:mt-10"
            v-model="userObject.postcode"
            type="text"
            placeholder="*Post Code"
          />
        </div>
      </div>
      <div>
        <input
          class="addressInput md:mt-10"
          v-model="userObject.country"
          type="text"
          placeholder="*Country"
        />
      </div>
      <div>
        <input
          class="addressInput md:mt-10"
          v-model="userObject.phoneNumber"
          type="text"
          placeholder="*Phone Number"
        />
      </div>
    </form>

    <div class="buttonArea">
      <!-- :class="{ disable: !missingValues }" -->
      <button
        class="btn-green btn-lrg mt-10"
        @click="saveDetails()"
        :class="{ disable: isDisabled }"
      >
        Confirm Details
      </button>
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
          this.$store.dispatch("cart/increasePaymentStep");
        })
        .catch((e) => {
          console.log(`error: ${e}`);
        });
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
