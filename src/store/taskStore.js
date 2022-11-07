import { defineStore } from "pinia";
import axios from "axios";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false
  }),
  getters: {
    favs() {
      return this.tasks.filter((item) => item.isFav);
    },
    favCount() {
      return this.tasks.reduce((previousValue, currentValue) => {
        return currentValue.isFav ? previousValue + 1 : previousValue;
      }, 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
  actions: {
    async getTasks() {
      this.loading = true;
      const data = await axios.get("http://localhost:3000/tasks");
      this.tasks = data.data;
      this.loading = false
    },
    async addTask(task) {
      this.tasks.push(task);

      try {
        await axios.post("http://localhost:3000/tasks", task)
      } catch (err) {
        console.log(err)
      }
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((item) => item.id !== id);

      try {
        await axios.delete("http://localhost:3000/tasks/" + id)
      } catch (err) {
        console.log(err)
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((item) => item.id === id);
      task.isFav = !task.isFav;
      try {
        await axios.patch("http://localhost:3000/tasks/" + id, {
          isFav: task.isFav
        })
      } catch (err) {
        console.log(err)
      }
    },
  },
});
