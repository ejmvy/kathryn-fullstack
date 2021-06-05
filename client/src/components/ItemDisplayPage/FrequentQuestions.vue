<template>
  <div class="bg-coral-dark w-full pt-10 pb-20">
    <div class="flex flex-col items-center">
      <TitleDesign :title="titleText"></TitleDesign>
      <div
        class="transitionEl flex flex-col w-11/12 border-b-2 border-gray-300"
        v-for="question in questions"
        :key="question"
      >
        <div class="flex items-center w-full justify-between mt-8">
          <div class="questionTitle">{{ question.title }}</div>
          <Svg
            @click="question.answerShow = !question.answerShow"
            :class="{ rotateArrow: question.answerShow }"
            class="arrow"
            :svgColour="'#627F8A'"
            :svg="arrowSvg"
          ></Svg>
        </div>
        <div :class="{ answerArea: question.answerShow }">
          <p class="answerText text-xs mt-5 text-left opacity-0">
            {{ question.answer }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleDesign from "../Designs/TitleDesign.vue";
import Svg from "../Designs/SvgBase.vue";
export default {
  props: ["itemInfo"],
  data() {
    return {
      arrowSvg: "M19 9l-7 7-7-7",
      titleText: "Frequently Asked Questions",

      questions: [
        {
          title: "Shipping Info",
          answer:
            "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
          answerShow: false,
        },
        {
          title: "Returns Info",
          answer:
            "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
          answerShow: false,
        },
        {
          title: "Exchange Info",
          answer:
            "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
          answerShow: false,
        },
      ],
    };
  },
  components: {
    Svg,
    TitleDesign,
  },
};
</script>

<style scoped>
.transitionEl {
  transition: all 0.2s ease;
}
.answerArea .answerText {
  /* padding-top: 10px; */
  opacity: 1;
  padding-bottom: 20px;
  height: 65px;
  transition: opacity 0.3s 0.1s, height 0.3s;
}

.answerText {
  /* text-align: left; */
  /* opacity: 0; */
  height: 0;
  transition: opacity 0.3s, height 0.3s 0.1s;
}
.arrow {
  width: 20px;
  height: 20px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}

.rotateArrow {
  transform: rotate(-180deg);
}

.extraPad {
  padding-bottom: 30px;
}

@keyframes slide-in {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(90deg);
  }
}

@media only screen and (min-width: 1200px) {
  .questionPadding {
    width: 80%;
  }
}
</style>
