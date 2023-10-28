<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import CreateTagForm from './CreateTagForm.vue';
import TagComponent from './TagComponent.vue';

const { isLoggedIn } = storeToRefs(useUserStore());
const { currentUsername } = storeToRefs(useUserStore());

const loaded = ref(false);
let tags = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let posttotag = ref("");

async function getUserTags(author: string) {
  let tagResults;
  try {
    tagResults = await fetchy("/api/tags", "GET", { query: { author } });
  } catch (_) {
    return;
  }
  tags.value = tagResults;
}

async function addTagToPost(post: any, tag_id: string) {
  try {
    await fetchy(`/api/tag/${tag_id}/${post._id}`, "PUT");
  } catch {
    return;
  }
}

async function setTargetPost(post_id: string) {
    posttotag.value = post_id;
    console.log(posttotag.value);
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
    <section class="tags" v-if="loaded && tags.length !== 0" @addTag = "setTargetPost">
        <article v-for="tag in tags" :key="tag._id">
            <ul>
                <li><TagComponent v-if="editing !== tag._id" :tag="tag" @refreshTags="getUserTags(currentUsername)" @editTag="updateEditing" />
                    <button class="btn-small pure-button" @click="addTagToPost(posttotag, tag._id)"> <i class="fa fa-plus" aria-hidden="true"></i></button>
                </li>
            </ul>
        </article>
    </section>

    <section v-if="isLoggedIn">
        <CreateTagForm :content_id = "posttotag"/>
        
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

.tags {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1em;
    width: 100%;
    align-items: center;
}


</style>