<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia tasks</h1>
    </header>

    <div class="new-task-form">
      <TaskFrom/>
    </div>

    <nav class="filter">
      <button :style="filter == 'all' && 'background: #ffd859'" @click="filter = 'all'">All tasks</button>
      <button :style="filter == 'favs' && 'background: #ffd859'" @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <div class="loading" v-if="loading">Loading tasks...</div>

    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} tasks left to do</p>
      <div :key="task.id" v-for="task in tasks">
        <TaskDetails :task="task"/>
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount }} tasks left to do</p>
      <div :key="task.id" v-for="task in favs">
        <TaskDetails :task="task"/>
      </div>
    </div>

    <div style="display: flex; justify-content: center">
      <button @click="taskStore.$reset">Reset state</button>
    </div>

  </main>
</template>

<script setup>
import TaskDetails from "./components/TaskDetails.vue"
import TaskFrom from "@/components/TaskFrom.vue";
import { ref } from "vue";
import { useTaskStore } from "@/store/taskStore";
import { storeToRefs } from "pinia"


const taskStore = useTaskStore();

const { tasks, loading, favs, totalCount, favCount } = storeToRefs(taskStore)

taskStore.getTasks();

const filter = ref("all");

</script>

