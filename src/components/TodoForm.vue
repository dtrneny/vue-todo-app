
<script lang="ts">
    import { defineComponent, watch, ref } from 'vue';
    import { v4 as uuidv4 } from 'uuid';
    import BasicButton from './BasicButton.vue';
    import BasicInputField from './BasicInputField.vue';
    import RadioButton from './RadioButton.vue';
    import { Todo } from '../types/Todo';

    export default defineComponent({
        name: 'TodoForm',
        components: {
            BasicButton,
            BasicInputField,
            RadioButton
        },
        setup(_, context) {

            const titleError = ref('');
            const title = ref('')
            const priority = ref('normal')

            watch(title, (newValue, oldValue) => {
                if(!oldValue && newValue) titleError.value = ''
            })

            function handleSubmit() {

                if (!title.value) {
                    titleError.value = "Prosím vyplňte toto pole.";
                    return
                }

                const newTodo: Todo = {
                    title: title.value,
                    id: uuidv4(),
                    priority: priority.value as "low" | "normal" | "high",
                    finished: false
                }

                context.emit('onSubmit', newTodo);
            }

            function handleCancel() {
                context.emit('onCancel');
            }

            return {
                title,
                priority,
                titleError,
                handleSubmit,
                handleCancel
            }
        }
    })
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <BasicInputField 
            label="Název" 
            placeholder="Zadejte název úkolu"
            v-model="title"
            :errorMessage="titleError" />

        <div class="form-radio-buttons">
            <label>Priorita</label>
            <RadioButton 
                label="Nízká"
                value="low"
                :checked="priority === 'low'"
                v-model="priority" />
            <RadioButton 
                label="Normální"
                value="normal"
                :checked="priority === 'normal'"
                v-model="priority" />
            <RadioButton 
                label="Vysoká"
                value="high"
                :checked="priority === 'high'"
                v-model="priority" />
        </div>

        <div class="form-buttons">
            <BasicButton 
                isForSubmit
                text="Přidat" 
                buttonType="primary" />
            <BasicButton 
                text="Zrušit" 
                buttonType="error"
                @onClick="handleCancel" />
        </div>
    </form>
</template>

<style scoped lang="scss">
    form {
        display: flex;
        flex-direction: column;
        gap: 15px;

        .form-radio-buttons {
            display: flex;
            flex-direction: inherit;
            gap: 5px;
        }

        .form-buttons {
            button {
                margin: 5px;
            }
        }
    }
</style>