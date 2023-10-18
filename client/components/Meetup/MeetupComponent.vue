<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";
import { formatDate } from "../../utils/formatDate";

const props = defineProps(["meetup"])
const emit = defineEmits(["editMeetup", "refreshMeetups"]);
const { currentUsername } = storeToRefs(useUserStore());

const deleteMeetup = async () => {
  try {
    await fetchy(`/api/meetups/${props.meetup.meetupId}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshMeetups");
};
</script>

<template>
  <p class="meetup_name">{{ props.meetup.name }}</p>
  <p>{{ props.meetup.attendee1 }}'s meetup with {{ props.meetup.attendee2 }}</p>
  <p>Type: {{ props.meetup.type }}</p>
  <p>Date: {{ props.meetup.date }}</p>
  <p>Location: {{ props.meetup.location }}</p>
  <div class="base">
    <menu v-if="props.meetup.attendee1 == currentUsername || props.meetup.attendee2 == currentUsername">
      <li><button class="btn-small pure-button" @click="emit('editMeetup', props.meetup._id)">Edit</button></li>
      <li><button class="button-error btn-small pure-button" @click="deleteMeetup">Delete</button></li>
    </menu>
    <article class="timestamp">
      <p v-if="props.meetup.dateCreated !== props.meetup.dateUpdated">Edited on: {{ formatDate(props.meetup.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDate(props.meetup.dateCreated) }}</p>
    </article>
  </div>

</template>
