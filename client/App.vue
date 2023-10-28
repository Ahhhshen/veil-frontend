<script setup lang="ts">
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <header>
    <nav>
      <div class="title">
        <RouterLink :to="{ name: 'Home' }">
          <h1><i>V E I L</i></h1>
        </RouterLink>
      </div>
      <ul>
        <li>
          <RouterLink :to="{ name: 'Home' }" :class="{ underline: currentRouteName == 'Home' }"> <i class="fa fa-home"></i> </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <ul>
            <li>
              <RouterLink :to="{ name: 'Cabinet' }" :class="{ underline: currentRouteName == 'Cabinet' }"> My Cabinet </RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'Meetup' }" :class="{ underline: currentRouteName == 'Meetup' }"> <i class="fa fa-meetup" aria-hidden="true"></i> </RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'Settings' }" :class="{ underline: currentRouteName == 'Settings' }"> <i class="fa fa-cog" aria-hidden="true"></i> </RouterLink>
            </li>
            
          </ul>          
        </li>
        <li v-else>
          <RouterLink :to="{ name: 'Login' }" :class="{ underline: currentRouteName == 'Login' }"> Login </RouterLink>
        </li>
      </ul>
    </nav>
    <article v-if="toast !== null" class="toast" :class="toast.style">
      <p>{{ toast.message }}</p>
    </article>
  </header>
  <RouterView />
</template>

<style scoped>
@import "./assets/toast.css";

nav {
  padding: 1em 2em;
  background-color: #264653;
  display: flex;
  align-items: center;
}

h1 {
  font-size: 2em;
  margin: 0;
  color: #f4a261;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

img {
  height: 2em;
}

a {
  font-size: large;
  color: #f4a261;
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1em;
}

.underline {
  text-decoration: underline;
}
</style>
