<template>
  <button class="app-button" @click="$emit('click')">
    {{ name }}
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    name: String
  }
};
</script>

<style lang="scss">
@import "../assets/styles/app-button";
</style>
