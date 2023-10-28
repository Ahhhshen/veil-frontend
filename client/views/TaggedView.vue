<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import TagListComponent from "@/components/Tag/TagListComponent.vue";

const { currentUsername } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>Meetup for {{ currentUsername }}</h1>
    <MeetupListComponent />
  </main>
</template>

<style scoped>
    
</style>