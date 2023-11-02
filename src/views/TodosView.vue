
<script lang="ts">
    import { defineComponent, ref, computed } from 'vue';

    import BasicButton from '@/components/BasicButton.vue';
    import TodoList from '@/components/TodoList.vue';
    import TodoForm from '@/components/TodoForm.vue';

    import { todosMock } from '../data/todosMock';
    import { Todo } from '../types/Todo';

    export default defineComponent({
        name: 'TodosView',
        components: {
            BasicButton,
            TodoList,
            TodoForm
        },
        setup() {

            const isFormOpened = ref(false);
            const todos = ref(todosMock);

            function closeForm() {
                isFormOpened.value = false;
            }

            function openForm() {
                isFormOpened.value = true;
            }

            function addNewTodo(newTodo: Todo) {
                todos.value.push(newTodo);
            }

            function deleteTodo(todoID: string) {
                todos.value = todos.value.filter((todo) => todo.id !== todoID);
            }

            const presentedTodos = computed(() => {
                return todos.value?.sort((a, b) => (Number(a.finished) - Number(b.finished)))
            })

            return { 
                presentedTodos,
                isFormOpened,
                closeForm,
                openForm,
                addNewTodo, 
                deleteTodo
            }
        }
    })
</script>

<template>
    <main>
        <h2>TODO App</h2>
        <BasicButton 
            v-if="!isFormOpened" 
            text="Nový úkol" 
            buttonType="primary"
            @onClick="openForm" />
        <TodoForm 
            v-else
            @onCancel="closeForm"
            @onSubmit="addNewTodo" />
        <TodoList @onDelete="deleteTodo" :todos="presentedTodos" />
        <div>Pouze nedokončené</div>
    </main>
</template>

<style scoped lang="scss">
@import '@/assets/main.scss';
main {
    width: 50%;
    height: 600px;
    margin: 5% auto 0 auto;
    padding: 30px;

    display: flex;
    flex-direction: column;
    gap: 15px;

    border-radius: $border-radius;

    background-color: $secondary-background-color;
}

h2 {
    margin: 0;
}
</style>