<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapMutations(["getTodos"])
  },
  mounted() {
    if (this.$_items_exist()) {
      this.getTodos(this.$_get_items());
    }
  }
};
</script>
