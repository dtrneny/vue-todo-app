
<script lang="ts">
    import { PropType, defineComponent } from 'vue';

    enum ButtonVariant {
        Primary = 'primary',
        Error = 'error',
    }

    export default defineComponent({
        name: 'BasicButton',
        props: {
            text: String,
            buttonType: {
                type: String as PropType<ButtonVariant>,
                default: ButtonVariant.Primary,
                validator: (value: ButtonVariant) => Object.values(ButtonVariant).includes(value)
            },
            isForSubmit: {
                type: Boolean,
                default: false
            }
        },
        setup(_, context) {
            function handleClick() {
                context.emit('onClick')
            }

            return {
                handleClick
            }
        }
    })
</script>

<template>
    <button @click="handleClick" :class="buttonType" :type="isForSubmit ? 'submit' : 'button'">{{ text }}</button>
</template>

<style scoped lang="scss">
button {
    @import '@/assets/main.scss';

    padding: 8px 16px;
    border-radius: $border-radius;

    max-width: fit-content;
    
    font-size: 16px;
    font-weight: 500;

    &:hover {
        cursor: pointer;
    }

    &.primary {
        background-color: $primary-color;
        border: 2px solid $primary-color;
        transition: background-color 0.3s ease, border 0.3s ease;

        &:hover {
            background-color: $secondary-color;
            border-color: $secondary-color;
        }

        &:active {
            background-color: $secondary-darker-color;
        }
    }

    &.error {
        background-color: $error-color;
        border: 2px solid $error-color;
        transition: background-color 0.3s ease, border 0.3s ease;

        &:hover {
            background-color: $error-secondary-color;
            border-color:$error-secondary-color;
        }

        &:active {
            background-color: $error-darker-color;
        }
    }
}
</style>