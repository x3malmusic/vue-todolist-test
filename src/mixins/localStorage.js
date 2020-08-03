export default {
  methods: {
    $_add_items(items) {
      localStorage.removeItem("todos");
      localStorage.setItem("todos", JSON.stringify(items));
    },

    $_get_items() {
      return JSON.parse(localStorage.getItem("todos"));
    },

    $_items_exist() {
      return localStorage.getItem("todos")
    }
  }
};
