<template>
  <div class="error-page">
    <div class="error-page__code">
      {{ code }}
    </div>
    <div class="error-page__msg">
      {{ msg }}
    </div>
    <div class="error-page__sub-msg">
      <i>That’s all we know.</i>
    </div>
    <div class="error-page__robot">
      <img src="/images/robot.png" alt="robot" />
    </div>
  </div>
</template>

<script>
import { defineComponent, useMeta, computed } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    error: {
      type: Object,
      default: () => ({
        statusCode: '',
        message: '',
      }),
    },
  },
  setup(props) {
    const { title } = useMeta()
    const pageNotFound = '404 Not Found'
    const otherError = 'this is an error.'
    const code = computed(() => props.error.statusCode || 404)
    const msg = computed(() => props.error.message || otherError)

    title.value = code.value === 404 ? pageNotFound : otherError

    return {
      code,
      msg,
    }
  },
  head: {},
})
</script>

<style lang="scss" scoped>
.error-page {
  text-align: center;
  min-height: 60vh;

  &__code {
    font-weight: 600;
    font-size: 28px;
  }

  &__msg {
    font-size: 14px;
  }

  &__sub-msg {
    font-size: 16px;
    i {
      color: rgb(112, 108, 108);
    }
  }
}
</style>
