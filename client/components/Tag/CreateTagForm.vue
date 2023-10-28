<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps({
  content_id: String,
});
const emit = defineEmits(["refreshTags"]);
let newTag = ref("");

const createTagforContent = async ( name: string, content_id?: string ) => {
  // assert the contenet_id is not null
  if (content_id == null) {
    console.log("content_id is null");
    return;
  }
  try {
    console.log("content_id is {}", content_id);
    await fetchy(`/api/tags/${name}/${content_id}`, "POST");
  } catch {
    return;
  }
  emit('refreshTags');
};
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <form @submit.prevent="createTagforContent(newTag, props.content_id)">
    <label for="name">Tag Name:</label>
    <input id="name" v-model="newTag" placeholder="Create a tag!" required />
    <button type="submit" class="btn-submit pure-button"> <i class="fa fa-plus-circle"></i></button>
  </form>
</template>

<style scoped>
</style>