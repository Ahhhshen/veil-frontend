<script setup lang="ts">
import TagListComponent from "@/components/Tag/TagListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>Tags for {{ currentUsername }}</h1>
    <TagListComponent />
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