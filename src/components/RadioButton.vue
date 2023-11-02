
<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'RadioButton',
        props: {
            label: String,
            modelValue: String,
            value: String,
            checked: Boolean
        }
    })
</script>

<template>
    <div>
        <input 
            type="radio"
            :value="modelValue"
            :checked="checked"
            @input="$emit('update:modelValue', value)" />
        <label>{{ label }}</label>
    </div>
</template>

<style scoped lang="scss">

</style>