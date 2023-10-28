<script setup lang="ts">
import { defineEmits, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const emit = defineEmits(["refreshTags"]);
const name = ref("");
const content_id = ref("");

export const createTagforContent = async ( name: string, content_id: string ) => {
  try {
    await fetchy(`/api/tags`, 'POST', {body: { name, content_id }});
  } catch {
    return;
  }
  emit('refreshTags');
};
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <form @submit.prevent="createTagforContent(name, content_id)">
    <label for="name">Tag Name:</label>
    <input id="name" v-model="name" placeholder="Create a tag!" required />
    <button type="submit" class="btn-submit pure-button"> <i class="fa fa-plus-circle"></i></button>
  </form>
</template>

<style scoped>
</style>