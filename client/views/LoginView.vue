<script setup lang="ts">
import LoginForm from "@/components/Login/LoginForm.vue";
import RegisterForm from "@/components/Login/RegisterForm.vue";
</script>

<template>
  <main class="veil-container">
    <form class="veil-form">
      <div class="veil-form__left">
        <LoginForm />
      </div>
      <div class="veil-form__right">
        <RegisterForm />
      </div>
    </form>
  </main>
</template>

<style scoped>

.veil-container {
  display: flex;
  height: 90vh;
  flex-direction: column;
  background-color: #264653;
}

.veil-form {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.veil-form__left,
.veil-form__right {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
}

h1 {
  text-align: center;
}
</style>
