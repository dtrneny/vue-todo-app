
<script lang="ts">
    import { defineComponent, ref, computed } from 'vue';

    import BasicButton from '@/components/BasicButton.vue';
    import TodoList from '@/components/TodoList.vue';
    import TodoForm from '@/components/TodoForm.vue';
    import CheckBox from '@/components/CheckBox.vue'

    import { todosMock } from '../data/todosMock';
    import { Todo } from '../types/Todo';
    import { getNumberFromPriority } from '../utils/todo.util';

    export default defineComponent({
        name: 'TodosView',
        components: {
            BasicButton,
            TodoList,
            TodoForm,
            CheckBox
        },
        setup() {

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
                if (removedIndex !== -1) {
                    todos.value.splice(removedIndex, 1);
                }
            }

            function finishTodo(todoID: string) {
                const editedTodo = todos.value.find((todo) => todo.id === todoID);
                if (editedTodo) {
                    editedTodo.finished = true;
                }
            }

            const presentedTodos = computed(() => {
                const filteredTodos = finishedFilter.value 
                    ? todos.value.filter((todo) => !todo.finished) 
                    : todos.value;

                return filteredTodos.sort((todoA, todoB) => {
                    if (todoA.finished === todoB.finished) {
                        return getNumberFromPriority(todoB.priority) - getNumberFromPriority(todoA.priority);
                    }
                    
                    return todoA.finished ? 1 : -1;
                });
            });

            return { 
                presentedTodos,
                isFormOpened,
                finishedFilter,
                closeForm,
                openForm,
                addNewTodo, 
                deleteTodo,
                finishTodo
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

        <TodoList 
            v-if="presentedTodos.length > 0"
            :todos="presentedTodos"
            @onDelete="deleteTodo"
            @onFinish="finishTodo" />
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
    height: 600px;
    margin: 5% auto 0 auto;
    padding: 30px;

    display: flex;
    flex-direction: column;
    gap: 15px;

    border-radius: $border-radius;

    background-color: $secondary-background-color;
}
</style>