
<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import TodoRow from './TodoRow.vue';
    import { Todo } from '../types/Todo';

    export default defineComponent({
        name: 'TodoList',
        components: {
            TodoRow
        },
        props: {
            todos: Object as PropType<Todo[]>
        },
        setup(_, context) {

            function onDelete(todoID: string) {
                context.emit('onDelete', todoID)
            }

            function onFinish(todoID: string) {
                context.emit('onFinish', todoID)
            }

            return {
                onDelete,
                onFinish
            }
        }
    })
</script>

<template>
    <section class="todo-list">
        <TodoRow 
            v-for="todo in todos" 
            :key="todo.id" 
            :todo="todo"
            @onDelete="onDelete"
            @onFinish="onFinish" />
    </section>
</template>

<style scoped lang="scss">
.todo-list {
    
    overflow-y: scroll;
}
</style>