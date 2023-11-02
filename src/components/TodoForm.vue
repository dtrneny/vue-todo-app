
<script setup lang="ts">
    import { watch, ref } from 'vue';
    import { v4 as uuidv4 } from 'uuid';
    import { Todo } from '../types/Todo';
    import BasicButton from './BasicButton.vue';
    import InputField from './InputField.vue';
    import RadioButton from './RadioButton.vue';

    const emits = defineEmits();

    const titleError = ref('');
    const title = ref('')
    const priority = ref('normal')

    watch(title, (newValue, oldValue) => {
        if(!oldValue && newValue) titleError.value = '';
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

        emits('on-submit', newTodo);
    }

    function handleCancel() {
        emits('on-cancel');
    }
</script>

<template>

    <form @submit.prevent="handleSubmit">
        <InputField 
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
                submit
                text="Přidat" 
                buttonType="primary" />
            <BasicButton 
                text="Zrušit" 
                buttonType="error"
                @on-click="handleCancel" />
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