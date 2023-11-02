
<script lang="ts">
    import { defineComponent } from 'vue';
    import TodosView from '@/views/TodosView.vue';

    export default defineComponent({
        name: 'App',
        components: {TodosView}
    });
    
</script>

<template>
    <TodosView />
</template>

<style lang="scss">
@import '@/assets/main.scss';
</style>
