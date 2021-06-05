<template>
  <section class="pb-10">
    <h1 class="homeTitle text-2xl sm:text-4xl mt-5">Kathryn Ceramics</h1>

    <div class="mainLanding">
      <nav
        class="hidden sm:mt-20 sm:flex w-3/4 justify-between m-auto text-xs uppercase font-bold"
      >
        <div v-for="(link, idx) in navInfo" :key="idx">
          <li
            class="pb-3"
            :class="{ activeClass: link.active }"
            @click="changeImages(link)"
          >
            {{ link.name }}
          </li>
        </div>
      </nav>

      <div class="w-full flex mt-10 sm:mt-4" v-if="showImages == 'favourites'">
        <img
          data-aos="fade-up"
          class="w-1/2 h-96"
          :src="require(`../../assets/latestDesigns/mug1.jpeg`)"
        />

        <img
          data-aos="fade-up"
          data-aos-delay="150"
          class="w-1/2 h-96"
          :src="require(`../../assets/latestDesigns/misc1.jpeg`)"
        />
      </div>

      <div class="w-full flex mt-7" v-if="showImages == 'tableware'">
        <img
          data-aos="fade-up"
          class="w-1/2 h-96"
          :src="require(`../../assets/latestDesigns/dish1.jpeg`)"
        />

        <img
          data-aos="fade-up"
          data-aos-delay="150"
          class="w-1/2 h-96"
          :src="require(`../../assets/latestDesigns/dish2.jpeg`)"
        />
      </div>

      <div class="w-full flex mt-7" v-if="showImages == 'cups'">
        <img
          class="elementSlideUp w-1/2 h-96"
          :src="require(`../../assets/latestDesigns/mug1.jpeg`)"
        />

        <img
          class="elementSlideUp2 w-1/2 h-96"
          :src="require(`../../assets/latestDesigns/mug2.jpeg`)"
        />
      </div>

      <div class="w-full flex mt-7" v-if="showImages == 'garden'">
        <img
          class="elementSlideUp w-1/2 h-96"
          :src="require(`../../assets/latestDesigns/misc1.jpeg`)"
        />

        <img
          class="elementSlideUp2 w-1/2 h-96"
          :src="require(`../../assets/latestDesigns/misc1.jpeg`)"
        />
      </div>

      <div class="w-full flex mt-7" v-if="showImages == 'misc'">
        <img
          class="elementSlideUp w-1/2 h-96"
          :src="require(`../../assets/latestDesigns/bowl1.jpeg`)"
        />

        <img
          class="elementSlideUp2 w-1/2 h-96"
          :src="require(`../../assets/latestDesigns/bowl2.jpeg`)"
        />
      </div>

      <router-link to="/shop">
        <button class="btn-green btn-lrg mt-10 sm:mt-20">View Products</button>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showImages: "favourites",
      navInfo: [
        { name: "Favourites", map: "favourites", active: true },
        { name: "Tableware", map: "tableware", active: false },
        { name: "Cup Sets", map: "cups", active: false },
        { name: "Garden Ideas", map: "garden", active: false },
        { name: "Miscellaneous", map: "misc", active: false },
      ],
    };
  },
  methods: {
    changeImages(link) {
      console.log(link);
      this.navInfo.forEach((val) =>
        val.name == link.name ? (val.active = true) : (val.active = false)
      );

      this.showImages = link.map;
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: "Playfair Display SC", serif;
}
nav li {
  list-style-type: none;
  cursor: pointer;
  border-bottom: 1px solid white;
  transition: all 0.2s ease-in;
}
li:hover {
  color: #c4c3c5;
  border-bottom: 1px solid #c4c3c5;
}

.activeClass {
  color: #c4c3c5;
  border-bottom: 1px solid #c4c3c5;
}

.homeTitle {
  animation: slide_up_entrance 5s forwards;
}

.mainLanding {
  opacity: 0;
  animation: slide_up_content 1.5s forwards 3.5s;
}
</style>
