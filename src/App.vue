<template>
    <div>
        <BasicButton text="test"></BasicButton>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import BasicButton from './components/BasicButton.vue';

    export default defineComponent({
        name: 'App',
        components: {BasicButton}
    });
    
</script>

<style lang="scss">
@import './assets/main.scss';
</style>
