export default {
  addTodo(state, todo) {
    state.todos.unshift({ ...todo, id: Date.now() });
  },

  deleteTodo(state, todoId) {
    state.todos = state.todos.filter(todo => todo.id != todoId);
  },

  getTodos(state, todos) {
    state.todos = todos;
  },

  confirmEdit(state, newTodo) {
    state.todos = state.todos.map(todo => {
      if (todo.id === newTodo.id) return { ...newTodo };
      else return todo;
    });
  },

  cashTodo(state, id) {
    state.cashedTodo = { ...state.todos.filter(todo => todo.id === id)[0] };
  }
};
