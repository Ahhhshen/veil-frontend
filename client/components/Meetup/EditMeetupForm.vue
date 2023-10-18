<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps["meetup"];
const name = ref(props.meetup.name);
const type = ref(props.meetup.type);
const date = ref(props.meetup.date);
const location = ref(props.meetup.location);
const emit = defineEmits(["editMeetup", "refreshMeetups"]);

const editMeetup = async (name: string, type: string, date: string, location: string) => {
  try {
    await fetchy(`/api/meetups/${props.meetup._id}`, "PATCH", 
                    { body: { update: { name: name, 
                                        type: type, 
                                        date: date, 
                                        location: location } 
                            } 
                    }
                );
  } catch (e) {
    return;
  }
  emit("editMeetup");
  emit("refreshMeetups");
};
</script>

<template>
    <form @submit.prevent="editMeetup(name, type, date, location)">
        <p class="meetup_attendee">{{ props.meetup.attendee1 }}'s meetup with {{ props.meetup.attendee2 }}</p>
        <textarea id="name" v-model="name" placeholder="{{p}}" required> </textarea>
        /** for type there's only two options: virtual or in-person */
        <select id="type" v-model="type" required>
            <option value="virtual">virtual</option>
            <option value="in-person">in-person</option>
        </select>
        <input type="date" id="date" v-model="date" required> 
        <textarea id="location" v-model="location" placeholder="location" required> </textarea>
        <div class="base">
        <menu>
            <li><button class="btn-small pure-button-primary pure-button" type="submit">Save</button></li>
            <li><button class="btn-small pure-button" @click="emit('editMeetup')">Cancel</button></li>
        </menu>
        </div>
    </form>
</template>