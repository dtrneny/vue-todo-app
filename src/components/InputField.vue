
<script setup lang="ts">
    defineProps({
        label: String,
        placeholder: String,
        modelValue: String,
        errorMessage: String,
    });
</script>

<template>

    <div class="basic-input-field ">
        <label>{{ label }}</label>

        <input 
            type="text" 
            :placeholder="placeholder" 
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"/>

        <span class="error-message">{{ errorMessage }}</span>
    </div>

</template>

<style scoped lang="scss">
.basic-input-field {
    display: flex;
    flex-direction: column;
    gap: 5px;

    input {
        padding: 8px;
        border: 1px solid $secondary-lighter-color;
        border-radius: $border-radius;

        &:focus {
            border: 1px solid $primary-color;
        }
    }

    .error-message {
        color: $error-color;
        font-size: 14px;
    }
}
</style>