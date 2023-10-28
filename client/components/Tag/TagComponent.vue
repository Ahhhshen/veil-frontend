<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";

const props = defineProps(['tag']);
const emit = defineEmits(['editTag', 'deleteTag', 'refreshTags']);

const deleteTag = async () => {
  try {
    await fetchy(`/api/tags/${props.tag._id}`, 'DELETE');
  } catch {
    return;
  }
  emit('refreshTags');
};

</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <button class="btn-tag pure-button" @click="emit('editTag', props.tag._id)"> {{ props.tag.name }} </button>

</template>


