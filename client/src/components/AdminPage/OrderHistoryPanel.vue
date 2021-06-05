<template>
  <div style="height: 100%">
    <div
      class="flex flex-col h-full w-11/12 lg:w-5/6 m-auto items-center justify-center mb-10"
    >
      <div class="w-full flex justify-between items-center">
        <select
          class="w-16 cursor-pointer focus:outline-none"
          v-model="currentEntries"
          @change="paginateEntries"
        >
          <option v-for="entry in showEntries" :key="entry" :value="entry">
            {{ entry }}
          </option>
        </select>
        <h5 class="labelxs text-gray-500">Order history</h5>
        <!-- showSearch = !showSearch -->
        <!-- <img
          @click="loadData()"
          class="w-7 h-7 cursor-pointer hover:scale-110"
          src="https://i.ibb.co/tPpm16k/specs.png"
        /> -->
        <div>
          <input
            type="search"
            class="w-32 border-b border-green-light"
            placeholder="Search here.."
            v-model="searchInput"
            @keyup="searchEvent"
          />
        </div>
      </div>

      <TableData
        :columns="columns"
        :entries="filteredEntries"
        @showOrderDetails="showOrderDetails"
      />

      <div
        class="mt-16 w-full px-10 flex items-center justify-between my-12 py-3"
      >
        <div class="text-xs">
          Page {{ currentPage + 1 }} of {{ allPages }} for
          {{ allEntries }} entries
        </div>
        <div class="flex justify-around">
          <div class="flex mr-3">
            <Svg
              @click="toBeginning()"
              class="mr-2"
              :svgColour="svgColour"
              :svg="beginSvg"
            ></Svg>
            <Svg @click="toPrev()" :svgColour="svgColour" :svg="prevSvg"></Svg>
          </div>
          <div class="flex ml-3">
            <Svg @click="toNext()" :svgColour="svgColour" :svg="nextSvg"></Svg>
            <Svg
              @click="toEnd()"
              class="ml-2"
              :svgColour="svgColour"
              :svg="endSvg"
            ></Svg>
          </div>
        </div>
      </div>

      <transition name="slide-up">
        <ViewOrderDetails
          v-if="showOrderPanel"
          :orderDetails="viewOrder"
          @closePopup="closeShowOrderDetails"
        ></ViewOrderDetails>
      </transition>
    </div>
  </div>
</template>

<script>
import ViewOrderDetails from "./ViewOrderDetails.vue";
import TableData from "./TableData.vue";
import Svg from "../Designs/SvgBase.vue";
import axios from "axios";

export default {
  data: () => ({
    svgColour: "#627F8A",
    beginSvg: "M11 19l-7-7 7-7m8 14l-7-7 7-7",
    prevSvg: "M15 19l-7-7 7-7",
    nextSvg: "M9 5l7 7-7 7",
    endSvg: "M13 5l7 7-7 7M5 5l7 7-7 7",
    columns: [
      { id: "order", text: "Order" },
      { id: "recipient", text: "Recipient" },
      { id: "ordered", text: "Ordered" },
      { id: "status", text: "Status" },
      { id: "delivered", text: "Delivered" },
      { id: "items", text: "Items" },
      { id: "total", text: "Total" },
      { id: "view", text: "" },
    ],
    entries: [],
    showEntries: [5, 10, 15, 25, 50, 100],
    currentEntries: 5,
    filteredEntries: [],
    currentPage: 0,
    allPages: 1,
    searchInput: "",
    searchEntries: [],
    allEntries: 0,

    showSearch: false,
    viewOrder: {},
    showOrderPanel: false,
  }),

  methods: {
    showOrderDetails(order) {
      this.viewOrder = order;
      this.emitter.emit("showOverlay");
      this.showOrderPanel = true;
    },
    closeShowOrderDetails() {
      this.emitter.emit("hideOverlay");
      this.showOrderPanel = false;
    },

    async loadData() {
      await axios
        .get(`${process.env.VUE_APP_BASE_URL}orders/history`)
        .then((data) => {
          this.entries = data.data;
          this.filteredEntries = this.entries.slice(0, this.currentEntries);
          this.ordersLength = data.length;
          this.allPages = this.entries.length / this.currentEntries;
          this.allEntries = this.entries.length;
          if (this.allPages % 1 != 0)
            this.allPages = Math.round(this.allPages + 1);
        });
    },
    paginateEntries() {
      if (this.searchInput.length >= 3) {
        this.searchedEntries = this.entries.filter((item) =>
          item.customer.name
            .toLowerCase()
            .includes(this.searchInput.toLowerCase())
        );
        console.log("current entries: ", this.searchedEntries);
        const start = this.currentPage * this.currentEntries;
        const end =
          this.currentPage * this.currentEntries + this.currentEntries;
        this.allEntries = this.searchedEntries.length;
        this.filteredEntries = this.searchedEntries.slice(start, end);
        this.allPages = this.searchedEntries.length / this.currentEntries;
        if (this.allPages % 1 != 0)
          this.allPages = Math.round(this.allPages + 1);
      } else {
        const start = this.currentPage * this.currentEntries;
        const end =
          this.currentPage * this.currentEntries + this.currentEntries;
        this.allEntries = this.entries.length;
        this.filteredEntries = this.entries.slice(start, end);
        this.allPages = this.entries.length / this.currentEntries;
        if (this.allPages % 1 != 0)
          this.allPages = Math.round(this.allPages + 1);
      }
    },
    toBeginning() {
      this.currentPage = 0;
      this.paginateEntries();
    },
    toEnd() {
      this.currentPage = this.allPages - 1;
      this.paginateEntries();
    },
    toPrev() {
      this.currentPage--;
      this.paginateEntries();
    },
    toNext() {
      this.currentPage++;
      this.paginateEntries();
    },
    searchEvent() {
      this.currentPage = 0;
      this.paginateEntries();
    },
  },

  computed: {
    showPagination() {
      return 4;
      // return this.allPages.slice(this.currentPage, 3);
    },
  },

  mounted() {
    this.loadData();
    this.emitter.on("reloadData", () => {
      console.log("reload");
      this.loadData();
    });
  },
  components: {
    Svg,
    TableData,
    ViewOrderDetails,
  },
};
</script>

<style scoped>
/* https://codepen.io/bilalo05/pen/oNgrKXo?editors=1010 */
</style>
