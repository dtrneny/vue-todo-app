
<script setup lang="ts">
    import { PropType } from 'vue';
    import { Todo } from '../types/Todo';
    import TodoRow from './TodoRow.vue';

    defineProps({
        todos: Object as PropType<Todo[]>
    });

    const emits = defineEmits();

    function onDelete(todoID: string) {
        emits('on-delete', todoID);
    }

    function onFinish(todoID: string) {
        emits('on-finish', todoID);
    }

</script>

<template>

    <section class="todo-list">
        <TodoRow 
            v-for="todo in todos" 
            :key="todo.id" 
            :todo="todo"
            @on-delete="onDelete"
            @on-finish="onFinish" />
    </section>
    
</template>

<style scoped lang="scss">
.todo-list { overflow-y: scroll; }
</style>