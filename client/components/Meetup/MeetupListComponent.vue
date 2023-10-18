<script setup lang="ts">
import EditMeetupForm from "@/components/Meetup/EditMeetupForm.vue";
import MeetupComponent from "@/components/Meetup/MeetupComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import SearchPostForm from "./SearchPostForm.vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
// meetups is an array of objects, which has the following structure:
// { name: string, type: string, date: string, location: string}
let meetups = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let searchAuthor = ref("");

async function getMeetups(author?: string) {
  let query: Record<string, string> = author !== undefined ? { author } : {};
  let meetupResults;
  try {
    meetupResults = await fetchy("/api/meetups", "GET", { query });
  } catch (_) {
    return;
  }
  searchAuthor.value = author ? author : "";
  meetups.value = meetupResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  await getMeetups();
  loaded.value = true;
});
</script>

<template>
    <div class="row">
        <h2 v-if="!searchAuthor">Meetups:</h2>
        <h2 v-else>Meetups by {{ searchAuthor }}:</h2>
    </div>
    <section class="meetups" v-if="loaded && meetups.length !== 0">
        <article v-for="meetup in meetups" :key="meetup._id">
        <MeetupComponent v-if="editing !== meetup._id" :meetup="meetup" @refreshMeetups="getMeetups" @editMeetup="updateEditing" />
        <EditMeetupForm v-else :meetup="meetup" @refreshMeetups="getMeetups" @editMeetup="updateEditing" />
        </article>
    </section>
    <p v-else-if="loaded">No meetups found</p>
    <p v-else>Loading...</p>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

.meetups {
    padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>