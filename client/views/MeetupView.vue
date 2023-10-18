<script setup lang="ts">
import MeetupListComponent from "@/components/Meetup/MeetupListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername } = storeToRefs(useUserStore());


</script>

<template>
    <main>
      <h1>Meetup for {{ currentUsername }}</h1>
      <MeetupListComponent />
    </main>
</template>
  
<style scoped>
h1 {
  text-align: center;
}
</style>