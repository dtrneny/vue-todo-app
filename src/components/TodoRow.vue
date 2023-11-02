
<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import { Todo } from '../types/Todo';
    import BasicButton from './BasicButton.vue';

    export default defineComponent({
        name: 'TodoRow',
        components: {
            BasicButton
        },
        props: {
            todo: Object as PropType<Todo>
        },
        setup(props, context) {

            function handleFinish() {
                context.emit('onFinish');
            }

            function handleDelete() {
                context.emit('onDelete', props.todo?.id);
            }

            return {
                handleFinish,
                handleDelete
            }
        }
    })
</script>

<template>
    <div :class="[
        'todo-row', 
        { 'finished': todo?.finished },
        `priority-${todo?.priority}`
    ]">
        <p>{{ todo?.title }}</p>
        <div class="todo-buttons">
            <BasicButton 
                v-show="!todo?.finished" 
                text="Dokončit" 
                buttonType="primary"
                @onClick="handleFinish" />
            <BasicButton 
                text="Odstranit" 
                buttonType="error"
                @onClick="handleDelete" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/main.scss';
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
        background-color: #b2dab2;
    }

    &.priority-normal {
        background-color: #ebd2a9;
    }

    &.priority-high {
        background-color: #f39699;
    }
}

.todo-buttons {
    button {
        margin: 5px;
    }
}
</style>