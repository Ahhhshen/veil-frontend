<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const { loginUser, updateSession } = useUserStore();

async function login() {
  await loginUser(username.value, password.value);
  void updateSession();
  void router.push({ name: "Cabinet" });
}
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="login">
    <fieldset>
      <div class="pure-control-group">
        <label for="aligned-name"></label>
        <input v-model.trim="username" type="text" id="aligned-name" placeholder="Username" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-password"></label>
        <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
      </div>
      <div class="pure-controls">
        <button type="submit" class="pure-button pure-button-primary">Log In</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>

button {
  width: 100%;
  text-align: center;
  background-color: #2a9d8f;
}

h3 {
  display: flex;
  justify-content: center;
}

</style>
