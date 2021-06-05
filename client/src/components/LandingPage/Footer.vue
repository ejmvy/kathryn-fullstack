<template>
  <ContactBanner v-if="!hideContact"></ContactBanner>

  <ContactFooter :class="{ footerBottom: hideContact }"></ContactFooter>
</template>

<script>
import ContactBanner from "./ContactBan.vue";
import ContactFooter from "./ContactFooter.vue";
export default {
  props: ["hideContact"],
  components: {
    ContactBanner,
    ContactFooter,
  },
};
</script>

<style scoped>
.footerBottom {
  /* position: absolute;
  bottom: 0; */
}
</style>
