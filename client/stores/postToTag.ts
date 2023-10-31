import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostToTagStore = defineStore("postTotag", () => {
  const currentPostToTag = ref("");

  const setCurrentPostToTag = (postToTag: string) => {
    currentPostToTag.value = postToTag;
  };

  const resetPostToTagStore = () => {
    currentPostToTag.value = "";
  };

  return {
    currentPostToTag,
    setCurrentPostToTag,
    resetPostToTagStore,
  };
});
