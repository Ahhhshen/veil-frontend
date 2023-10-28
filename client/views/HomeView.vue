<script setup lang="ts">
import PostListComponent from "@/components/Post/PostListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <section v-if ='isLoggedIn'>
      <h1>Welcome {{ currentUsername }}!</h1>
      <PostListComponent />
    </section>
    <section v-else, class="intro">
      <h2>Start curating your own "Kunstkammer" (cabinet of curiosities)! </h2>
      <h2>Veil will help you to discover and connect with people who share 
        your passions, values, and objectives, fostering relationships built 
        on substance rather than superficiality.</h2>
    </section>    
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #264653;
}

.intro {
  top: 20%;
  display: flex;
  flex-direction: column;
  color: #2a9d8f;
}

h2 {
  text-align: center;
  color: #2a9d8f;
  font-size: 50px;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  margin: 0 auto;
}
</style>
