
<script setup lang="ts">
    defineProps({
        label: String,
        modelValue: String,
        value: String,
        checked: Boolean
    });
</script>

<template>

    <div class="radio-button-container">
        <input 
            type="radio"
            :value="modelValue"
            :checked="checked"
            @input="$emit('update:modelValue', value)" />
        <label>{{ label }}</label>
    </div>

</template>

<style scoped lang="scss">
    .radio-button-container {
        display: flex;
        gap: 5px;

        input {
            cursor: pointer;
        }
    }
</style>