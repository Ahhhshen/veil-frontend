<script setup lang="ts">
import CabinetComponent from "@/components/ContentCabinet/CabinetComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRoute } from "vue-router";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
</script>

<template>
    <!-- sidebar menu -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
    <main v-if="isLoggedIn">
        <h1> Curate Your Own Cabinet!</h1>
        <div class="sidebar">
            <ul>
                <li> <RouterLink :to="{ name: 'TaggedView' }"> 
                        <button class="btn-taggedview pure-button"> <i class="fa fa-tags" aria-hidden="true"></i> </button>
                    </RouterLink> 
                </li>
            </ul>
        </div>
        <CabinetComponent />
    </main>
</template>

<style scoped>
h1 {
  text-align: center;
}

.sidebar {
    font-size: 20px;
    color: #264653;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 5%;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
</style>