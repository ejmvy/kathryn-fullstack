<template>
  <div class="flex flex-col items-center w-full pb-16 bg-gray-100 mt-20">
    <div class="w-full flex flex-col items-center py-16 overflow-hidden">
      <TitleDesign class="mb-20" :title="titleText"></TitleDesign>
      <LeftCollectionComponent
        :displayCollection="dishCollection"
        :collection="dishes"
      ></LeftCollectionComponent>
      <RightCollectionComponent
        :displayCollection="mugCollection"
        :collection="mugs"
      ></RightCollectionComponent>
      <LeftCollectionComponent
        :displayCollection="bowlCollection"
        :collection="bowls"
      ></LeftCollectionComponent>
      <RightCollectionComponent
        :displayCollection="miscCollection"
        :collection="misc"
      ></RightCollectionComponent>
    </div>
  </div>
</template>

<script>
import TitleDesign from "../Designs/TitleDesign.vue";
import LeftCollectionComponent from "../Designs/LeftCollectionComponent.vue";
import RightCollectionComponent from "../Designs/RightCollectionComponent.vue";
export default {
  components: {
    TitleDesign,
    LeftCollectionComponent,
    RightCollectionComponent,
  },
  setup() {
    const titleText = "The Collection";
    const dishes = "dishes";
    const mugs = "mugs";
    const bowls = "bowls";
    const misc = "misc";

    const dishCollection = {
      title: "Dishes",
      longText:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      shortText:
        "There are many variations of passages of Lorem Ipsum available.",
      img: "latestDesigns/dish1.jpeg",
    };

    const bowlCollection = {
      title: "Bowls",
      longText:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      shortText:
        "There are many variations of passages of Lorem Ipsum available.",
      img: "latestDesigns/bowl1.jpeg",
    };

    const mugCollection = {
      title: "Mugs",
      longText:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      shortText:
        "There are many variations of passages of Lorem Ipsum available.",
      img: "latestDesigns/mug3.jpeg",
    };

    const miscCollection = {
      title: "Misc",
      longText:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      shortText:
        "There are many variations of passages of Lorem Ipsum available.",
      img: "latestDesigns/misc1.jpeg",
    };

    return {
      titleText,
      dishes,
      mugs,
      bowls,
      misc,
      dishCollection,
      bowlCollection,
      mugCollection,
      miscCollection,
    };
  },
};
</script>
