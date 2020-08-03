<template>
  <div class="home">
    <app-button name="Create Todo" @click="createTodo" />
    <create-todo
      v-if="createTodoFlag"
      @closeAddTodo="createTodo"
      :create="true"
    />
    <h1 v-if="!todos.length">no todos</h1>
    <div class="todos" v-else>
      <todo-card v-for="todo in todos" :todo="todo" :key="todo.id" />
    </div>
  </div>
</template>

<script>
import AppButton from "../components/AppButton";
import TodoCard from "../components/TodoCard";
import CreateTodo from "../components/CreateEditTodo";
import { mapState } from "vuex";

export default {
  name: "Home",
  data: () => ({
    createTodoFlag: false
  }),
  components: {
    AppButton,
    TodoCard,
    CreateTodo
  },
  computed: {
    ...mapState(["todos"])
  },
  methods: {
    createTodo() {
      this.createTodoFlag = !this.createTodoFlag;
    }
  }
};
</script>
