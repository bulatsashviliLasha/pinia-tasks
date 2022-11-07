<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="newTask" type="text" placeholder="I need to..." />
    <button>Add</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/store/taskStore";

const taskStore = useTaskStore();

const newTask = ref("");

const handleSubmit = () => {
  if (newTask.value.length > 0) {
    taskStore.addTask({
      title: newTask.value,
      isFav: false,
      id: new Date().getTime(),
    });
    newTask.value = "";
  }
};
</script>
