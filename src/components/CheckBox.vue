
<script setup lang="ts">
    defineProps({
        label: String,
        modelValue: Boolean
    });
</script>

<template>

    <div class="check-box-container">
        <input 
            type="checkbox"
            :checked="modelValue"
            @input="(event) => $emit('update:modelValue', (event.target as HTMLInputElement).checked)" />

        <label>{{ label }}</label>
    </div>
    
</template>

<style scoped lang="scss">
.check-box-container {
    display: flex;
    gap: 10px;
}
</style>