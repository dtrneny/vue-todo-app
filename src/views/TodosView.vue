
<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { todosMock } from '../data/todosMock';
    import { Todo } from '../types/Todo';
    import { getOrderedTodosByPriorityAndState } from '../utils/todo.util';
    import BasicButton from '@/components/BasicButton.vue';
    import TodoList from '@/components/TodoList.vue';
    import TodoForm from '@/components/TodoForm.vue';
    import CheckBox from '@/components/CheckBox.vue'

    const isFormOpened = ref(false);
    const finishedFilter = ref(false);
    const todos = ref(todosMock);

    function closeForm() {
        isFormOpened.value = false;
    }

    function openForm() {
        isFormOpened.value = true;
    }

    function addNewTodo(newTodo: Todo) {
        todos.value.push(newTodo);
        isFormOpened.value = false;
    }

    function deleteTodo(todoID: string) {
        const removedIndex = todos.value.findIndex((todo) => todo.id === todoID);
        if (removedIndex !== -1) todos.value.splice(removedIndex, 1);
    }

    function finishTodo(todoID: string) {
        const editedTodo = todos.value.find((todo) => todo.id === todoID);
        if (editedTodo) editedTodo.finished = true;
    }

    const presentedTodos = computed(() => {
        const filteredTodos = finishedFilter.value 
            ? todos.value.filter((todo) => !todo.finished) 
            : todos.value;

        return getOrderedTodosByPriorityAndState(filteredTodos)
    });
</script>

<template>

    <main>
        <h2>TODO App</h2>

        <BasicButton 
            v-if="!isFormOpened" 
            text="Nový úkol" 
            buttonType="primary"
            @on-click="openForm" />
        <TodoForm 
            v-else
            @on-cancel="closeForm"
            @on-submit="addNewTodo" />

        <TodoList 
            v-if="presentedTodos.length > 0"
            :todos="presentedTodos"
            @on-delete="deleteTodo"
            @on-finish="finishTodo" />
        <p v-else>Aktuálně nemáte žádný úkol</p>

        <CheckBox
            label="Pouze nedokončené"
            v-model="finishedFilter" />
    </main>

</template>

<style scoped lang="scss">
@import '@/assets/main.scss';
main {
    width: 50%;
    height: 70%;
    padding: 30px;

    display: flex;
    flex-direction: column;
    gap: 15px;

    border-radius: $border-radius;

    background-color: $secondary-background-color;
}
</style>