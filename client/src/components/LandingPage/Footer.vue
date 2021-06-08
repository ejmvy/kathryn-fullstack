<template>
  <div>
    <ContactBanner v-if="!hideContact"></ContactBanner>

    <ContactFooter></ContactFooter>
  </div>
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
