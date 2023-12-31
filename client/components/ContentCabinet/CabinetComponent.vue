<script setup lang="ts">
import CreatePostForm from "@/components/Post/CreatePostForm.vue";
import EditPostForm from "@/components/Post/EditPostForm.vue";
import PostComponent from "@/components/Post/PostComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());
const { currentUsername } = storeToRefs(useUserStore());

const loaded = ref(false);
let UserCabinet = ref<Record<string, string>>({});
let contents = ref<Array<Record<string, string>>>([]);
let editing = ref("");

async function getUserCabinet(author: string) {
    UserCabinet = await fetchy("/api/cabinet", "GET", { query: { author } });
    // create a cabinet for the user if they don't have one
    if (UserCabinet.value == null) {
      try {
      await fetchy("/api/cabinet", "POST", { body: { author } });
      } catch (_) {
      return;
      }
    }
}

async function getUserCabinetContents() {
  let postResults;// for now, veil only support posts
  try {
    postResults = await fetchy("/api/cabinet/contents", "GET");
  } catch (_) {
    return;
  }
  contents.value = postResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  await getUserCabinet(currentUsername.value);
  await getUserCabinetContents();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <CreatePostForm @refreshPosts="getUserCabinetContents()" />
  </section>
  
  <section class="posts" v-if="loaded && contents.length !== 0">
    <article v-for="post in contents" :key="post._id">
      <PostComponent v-if="editing !== post._id" :post="post" @refreshPosts="getUserCabinetContents()" @editPost="updateEditing" />
      <EditPostForm v-else :post="post" @refreshPosts="getUserCabinetContents()" @editPost="updateEditing" />
    </article>
  </section>

  <p v-else-if="loaded">No contents found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  padding-top: 5%;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 80%;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  width: calc(25% - 1em);
  max-height: 50em;
}

.posts {
  padding: 1em;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
