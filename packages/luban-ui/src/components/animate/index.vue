<template>
  <div class="lu-animate" :class="[animateClass]" :style="[animateStyles]">
    <slot name="default"></slot>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  toRefs,
  watch,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LuAnimate',
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    /**
     * 控制动画开启
     */
    modelValue: {
      type: Boolean,
      default: false,
    },
    /**
     * 动画类型
     */
    type: {
      type: String,
      default: 'bounce',
    },
    /**
     * 应用动画的基础类名
     */
    animateBaseClassName: {
      type: String,
      default: 'lu-animate--',
    },
    /**
     * 动画持续时长
     * 单位：秒
     */
    duration: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    const { modelValue, type, animateBaseClassName, duration } = toRefs(props)

    const ms = computed(() => duration.value * 1000)
    const active = ref(modelValue.value)
    const animateClassName = computed(
      () => `${animateBaseClassName.value}${type.value}`
    )
    const animateClass = computed(() =>
      active.value ? animateClassName.value : ''
    )
    const animateStyles = computed(() => ({
      animationDuration: `${duration.value}s`,
    }))

    watch(modelValue, (val) => {
      active.value = val

      setTimeout(() => {
        active.value = false
        emit('update:modelValue', active.value)
      }, ms.value + 1000)
    })

    return {
      animateClassName,
      animateClass,
      animateStyles,
    }
  },
})
</script>

<style lang="scss" scoped>
.lu-animate {
  display: inline-block;
}
</style>
