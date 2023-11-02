
<script lang="ts">
    import { defineComponent, reactive, toRefs, watch, ref } from 'vue';
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

            const formState = reactive({
                title: '',
                priority: 'normal'
            })

            watch(() => {
                return {...formState}
            }, (newValue, oldValue) => {
                if(oldValue.title === '' && newValue.title !== '') titleError.value = ''
            })

            function handleSubmit() {

                if (!formState.title) {
                    titleError.value = "Prosím vyplňte toto pole.";
                    return
                }

                const newTodo: Todo = {
                    title: formState.title,
                    id: uuidv4(),
                    priority: formState.priority as "low" | "normal" | "high",
                    finished: false
                }

                context.emit('onSubmit', newTodo);
            }

            function handleCancel() {
                context.emit('onCancel');
            }

            return {
                handleSubmit,
                handleCancel,
                ...toRefs(formState),
                titleError
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