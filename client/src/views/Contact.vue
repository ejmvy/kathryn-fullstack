<template>
  <div>
    <Header :addShadow="true"></Header>
    <section
      class="mb-10 pt-10 w-full flex flex-col items-center"
      :class="windowWidth > 600 ? 'h-screen' : 'h-screen'"
    >
      <TitleDesign :title="titleText"></TitleDesign>
      <div class="flex justify-between mt-14 w-11/12">
        <form
          class="contact-form flex flex-1 flex-col text-green-dark px-10"
          @submit.prevent="sendEmail"
        >
          <div class="flex flex-col mb-20">
            <div class="flex flex-col text-left">
              <label class="uppercase text-xxs py-5">Name</label>
              <input class="contactInput h-8" name="user_name" type="text" />
            </div>
            <div class="flex flex-col text-left">
              <label class="uppercase text-xxs py-5">Email</label>
              <input class="contactInput h-8" name="user_email" type="email" />
            </div>
          </div>
          <div class="flex flex-col text-left">
            <label class="uppercase text-xxs pb-5">Message</label>
            <textarea class="contactInput h-24" name="message"></textarea>
          </div>
          <div>
            <button class="btn-green btn-lrg mt-10" type="submit" value="Send">
              Submit
            </button>
          </div>
        </form>
        <div class="hidden md:block md:w-2/5">
          <div
            class="relative w-11/12 h-full text-left text-sm left-5 pl-10 border-l-2 border-gray-300"
          >
            <div class="pb-10">
              <label class="contactLabel">Address</label>
              <p>37 Victoria Falls, Ranelagh</p>
              <p>Dublin 2, D12 BE28</p>
            </div>
            <div class="pb-10">
              <label class="contactLabel">Email</label>
              <p>kathrynokelly@gmail.com</p>
            </div>
            <div class="pb-10">
              <label class="contactLabel">Phone</label>
              <p>+353 85 25753 655</p>
            </div>
            <div class="pb-10">
              <label class="contactLabel">Social</label>
              <div class="flex pt-8">
                <div
                  class="circle flex justify-center bg-green-light text-white rounded-full p-2 mx-5 cursor-pointer"
                  v-for="logo in logos"
                  :key="logo"
                >
                  <img class="w-6 h-6" :src="require(`../assets/${logo}`)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer :hideContact="true"></Footer>
  </div>
</template>

<script>
import TitleDesign from "../components/Designs/TitleDesign.vue";
import Header from "../components/LandingPage/Header.vue";
import Footer from "../components/LandingPage/Footer.vue";
import emailjs from "emailjs-com";
export default {
  props: ["itemInfo"],
  data() {
    return {
      titleText: "We'd Love to Hear From You!",
      windowWidth: window.innerWidth,
      logos: ["icons/insta.png", "icons/fb.png", "icons/etsy.png"],
    };
  },
  // user_ujpmxVNNa20Fcol3xAcTS
  methods: {
    sendEmail: (e) => {
      emailjs
        .sendForm(
          "service_8n1sza3",
          "template_smnwcg8",
          e.target,
          "user_ujpmxVNNa20Fcol3xAcTS"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.status, result.text);
            // this.showNotification(true);
            e.target.reset();
          },
          (error) => {
            console.log(error);
            // this.showNotification(false, error);
          }
        );
      // https://www.dyspatch.io/resources/templates/
    },
    showNotification(success, error) {
      if (success) {
        this.emitter.emit("showNotification", {
          state: true,
          message: "Message Sent",
        });
      } else {
        this.emitter.emit("showNotification", {
          state: false,
          title: "Ooops!",
          message: `Error: ${error}`,
        });
      }
    },
  },
  components: {
    TitleDesign,
    Header,
    Footer,
  },
};
</script>

<style scoped>
input {
  transition: all 0.5s ease-in-out;
  outline: none;
}

input:focus {
  outline: none;
}
.circle {
  transition: all 0.2s ease-in-out;
}

.circle:hover {
  transform: scale(1.05);
}
</style>
