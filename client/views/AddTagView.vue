<script setup lang="ts">
import AddTagsComponent from "@/components/Tag/AddTagsComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>Select tags or create new one!</h1>
    <AddTagsComponent />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  width: 100%;
}

h1 {
  font-size: 2em;
  font-weight: bold;
  margin: 0;
}

    
</style>