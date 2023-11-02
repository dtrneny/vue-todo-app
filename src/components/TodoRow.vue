
<script setup lang="ts">
    import { PropType, computed } from 'vue';
    import { Todo } from '../types/Todo';
    import BasicButton from './BasicButton.vue';

    const props = defineProps({
        todo: Object as PropType<Todo>
    });

    const emits = defineEmits();

    function handleFinish() {
        emits('on-finish', props.todo?.id);
    }

    function handleDelete() {
        emits('on-delete', props.todo?.id);
    }

    const rowClass = computed(() => {
        return {
            'todo-row': true,
            'finished': props.todo?.finished,
            [`priority-${props.todo?.priority}`]: true,
        };
    })
</script>

<template>

    <div :class="rowClass">
        <p>{{ todo?.title }}</p>
        <div class="todo-buttons">
            <BasicButton 
                v-if="!todo?.finished" 
                text="Dokončit" 
                buttonType="primary"
                @on-click="handleFinish" />
            <BasicButton 
                text="Odstranit" 
                buttonType="error"
                @on-click="handleDelete" />
        </div>
    </div>
    
</template>

<style scoped lang="scss">
.todo-row {
    padding: 8px;
    margin-bottom: 10px;

    display: flex;
    flex-direction: column;

    border-radius: $border-radius;
    
    &.finished {
        opacity: 0.5;
    }

    &.priority-low {
        background-color: $todo-low-priority-color;
    }

    &.priority-normal {
        background-color: $todo-normal-priority-color;
    }

    &.priority-high {
        background-color: $todo-high-priority-color;
    }
}

.todo-buttons {
    button {
        margin: 5px;
    }
}
</style>