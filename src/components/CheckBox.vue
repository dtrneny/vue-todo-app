
<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'CheckBox',
        props: {
            label: String,
            modelValue: Boolean
        }
    })
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
@import '@/assets/main.scss';
.check-box-container {
    display: flex;
    gap: 5px;
}
</style>