<template>
  <div class="card">
    <input
      class="card-header"
      type="text"
      placeholder="Todo name"
      v-model="todoName"
    />
    <ul class="todo-list" v-if="todoItems">
      <li class="todo-list-item" v-for="item in todoItems" :key="item.id">
        <input
          type="text"
          :ref="`todoItem${item.id}`"
          @input="handleChange(item.id)"
          :value="item.value"
        />
        <input
          type="checkbox"
          :checked="item.done"
          class="checkbox"
          :ref="`checkboxItem${item.id}`"
          @click="handleChange(item.id)"
        />
        <button class="close-btn" @click="deleteTodoItem(item.id)">
          &#10006;
        </button>
      </li>
    </ul>

    <div class="btn-container" v-if="create">
      <app-button name="+" @click="addTodoItem" class="mr" />
      <app-button name="Add todo" @click="addTodoToList" />
    </div>

    <div v-else>
      <app-button name="+" @click="addTodoItem" class="mr" />
      <div class="btn-container">
        <app-button name="Confirm Edit" class="mr" @click="confirmEditTodo" />
        <app-button name="Cancel Edit" @click="getTodo" />
      </div>
      <div class="btn-container">
        <app-button
          name="Return Edited"
          @click="confirmReturnEdited"
          class="mr"
        />
        <app-button name="Delete Todo" @click="confirmDelete" />
      </div>
    </div>

    <vue-confirm-dialog />
  </div>
</template>

<script>
import AppButton from "./AppButton";
import { mapMutations, mapGetters, mapState } from "vuex";

export default {
  name: "CreateTodo",
  components: {
    AppButton
  },
  computed: {
    ...mapGetters(["getCurrentTodo"]),
    ...mapState(["todos", "cashedTodo"]),

    todoId() {
      return parseInt(this.$route.params.todoId);
    }
  },
  props: {
    create: Boolean
  },
  data: () => ({
    todoName: "",
    todoItems: []
  }),
  methods: {
    ...mapMutations(["addTodo", "deleteTodo", "confirmEdit", "cashTodo"]),

    addTodoItem() {
      this.todoItems = [
        ...this.todoItems,
        {
          id: Date.now(),
          value: "",
          done: false
        }
      ];
    },

    deleteTodoItem(itemId) {
      this.todoItems = this.todoItems.filter(item => item.id != itemId);
    },

    handleChange(id) {
      this.todoItems = this.todoItems.map(item => {
        if (item.id === id) {
          return {
            ...item,
            value: this.$refs[`todoItem${id}`][0].value,
            done: this.$refs[`checkboxItem${id}`][0].checked
          };
        } else return item;
      });
    },

    addTodoToList() {
      if (this.todoName && this.todoItems.length && this.todoItems[0].value) {
        this.addTodo({ name: this.todoName, items: this.todoItems });
        this.$_add_items(this.todos);
        this.$emit("closeAddTodo");
      }
    },

    deleteTodoFromList() {
      this.deleteTodo(this.todoId);
      this.$_add_items(this.todos);
      this.$router.push("/");
    },

    confirmEditTodo() {
      const changedTodo = {
        id: this.todoId,
        name: this.todoName,
        items: this.todoItems
      };
      this.confirmEdit(changedTodo);
      this.$_add_items(this.todos);
    },

    getTodo() {
      const currentTodo = this.getCurrentTodo(this.todoId);
      this.todoName = currentTodo.name;
      this.todoItems = currentTodo.items;
    },

    returnEdited() {
      this.confirmEdit({ ...this.cashedTodo });
      this.getTodo();
      this.$_add_items(this.todos);
    },

    confirmDialog(callback) {
      this.$confirm({
        message: `Are you sure?`,
        button: {
          no: "Cancel",
          yes: "Yes"
        },
        callback: confirm => {
          if (confirm) callback();
        }
      });
    },

    confirmDelete() {
      this.confirmDialog(this.deleteTodoFromList);
    },

    confirmReturnEdited() {
      this.confirmDialog(this.returnEdited);
    }
  },

  mounted() {
    if (!this.create) {
      this.getTodo();
      this.cashTodo(this.todoId);
    }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/todo-card";
</style>
