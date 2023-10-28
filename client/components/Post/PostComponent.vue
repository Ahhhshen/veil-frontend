<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import router from "../../router";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
const emits = defineEmits(["editPost", "refreshPosts","addTag"]);
const { currentUsername } = storeToRefs(useUserStore());

const deletePost = async () => {
  try {
    await fetchy(`/api/posts/${props.post._id}`, "DELETE");
  } catch {
    return;
  }
  emits("refreshPosts");
};

const veilPost = async () => {
  try {
    await fetchy(`/api/posts/${props.post._id}/veil`, "PUT");
  } catch {
    return;
  }
  emits("refreshPosts");
};

const unveilPost = async () => {
  try {
    await fetchy(`/api/posts/${props.post._id}/unveil`, "PUT");
  } catch {
    return;
  }
  emits("refreshPosts");
};

const addTag = (post: any) => {
  emits("addTag", post._id);
  void router.push({ name: "AddTag"});
  //console.log(post._id);
  
};

</script>

<template>
  <p class="author">{{ props.post.author }}</p>
  <p v-if = "props.post.isVeiled == false">{{ props.post.content }}</p>
  <p v-else class="veiled">{{ props.post.content }}</p>
  <div class="base">
    <menu v-if="props.post.author == currentUsername">
      <!-- Add icon library -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <li><button class="btn-small pure-button" @click="emits('editPost', props.post._id)"> <i class="fa fa-pencil" aria-hidden="true"></i></button></li>
      <li v-if = "props.post.isVeiled == false"><button class="btn-veil btn-small pure-button" @click="veilPost"> <i class="fa fa-eye-slash"></i></button></li>
      <li v-else><button class="btn-unveil btn-small pure-button" @click="unveilPost"> <i class="fa fa-eye"></i></button></li>
      <li><button class="btn-small pure-button" @click="addTag(props.post)">
          <i class="fa fa-tag" aria-hidden="true"></i>
          </button>
      </li>
      <li><button class="button-error btn-small pure-button" @click="deletePost"> <i class="fa fa-trash"></i></button></li>
    </menu>
    <article class="timestamp">
      <p v-if="props.post.dateCreated !== props.post.dateUpdated">Edited on: {{ formatDate(props.post.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDate(props.post.dateCreated) }}</p>
    </article>
  </div>
</template>

<style scoped>
p {
  margin: 0em;
}

.veiled {
  color: #999;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
