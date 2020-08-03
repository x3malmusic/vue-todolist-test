<template>
  <div class="about">
    <create-todo />
    <button class="back-btn" @click="$router.push('/')">&#8592; Back</button>
  </div>
</template>

<script>
import CreateTodo from "../components/CreateEditTodo";

export default {
  name: "EditCard",
  components: {
    CreateTodo
  }
};
</script>

<style lang="scss">
@import "../assets/styles/todo-card";
</style>
