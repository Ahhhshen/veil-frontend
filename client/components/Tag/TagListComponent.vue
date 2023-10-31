<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import TagComponent from './TagComponent.vue';

const { isLoggedIn } = storeToRefs(useUserStore());
const { currentUsername } = storeToRefs(useUserStore());

const loaded = ref(false);
let tags = ref<Array<Record<string, string>>>([]);
let editing = ref("");

async function getUserTags(author: string) {
  let tagResults;
  try {
    tagResults = await fetchy(`/api/${author}/tags`, "GET");
  } catch (_) {
    return;
  }
  tags.value = tagResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  await getUserTags(currentUsername.value);
  loaded.value = true;
});
</script>

<template>
    
    <section class="tags" v-if="loaded && tags.length !== 0">
        <article v-for="tag in tags" :key="tag._id">
            <ul>
                <li><TagComponent v-if="editing !== tag._id" :tag="tag" @refreshTags="getUserTags(currentUsername)" @editTag="updateEditing" /></li>
            </ul>
        </article>
    </section>
    
    <p v-else-if="loaded">No tags found</p>
    <p v-else>Loading...</p>
</template>

<style scoped>

section {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
    padding-top: 5%;
    align-items: center;
}


p {
    margin: 0em;
}

.tags {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1em;
    width: 100%;
    align-items: center;
}

</style>