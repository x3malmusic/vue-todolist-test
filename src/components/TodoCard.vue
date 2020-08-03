<template>
  <div class="card">
    <input class="card-header" type="text" :value="todo.name" disabled />
    <ul class="todo-list">
      <li class="todo-list-item" v-for="item in todo.items" :key="item.id">
        <p>{{ item.value }}</p>
        <input type="checkbox" :checked="item.done" disabled />
      </li>
    </ul>
    <router-link :to="{ name: 'EditCard', params: { todoId: todo.id } }">
      <app-button name="Edit Todo" />
    </router-link>
  </div>
</template>

<script>
import AppButton from "./AppButton";

export default {
  name: "TodoCard",
  components: {
    AppButton
  },
  props: {
    todo: Object
  }
};
</script>

<style lang="scss">
@import "../assets/styles/todo-card";
</style>
