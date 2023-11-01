
<template>
    <button>{{ text }}</button>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'BasicButton',
        props: {
            text: String
        },
        setup() {

        }
    })
</script>

<style scoped lang="scss">
button {
    background-color: antiquewhite;
}
</style>