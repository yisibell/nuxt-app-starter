<template>
  <div ref="luTooltip" class="lu-tooltip">
    <slot name="default"></slot>
    <div ref="luTooltipContent" class="lu-tooltip__content">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  toRefs,
  watch,
} from '@nuxtjs/composition-api'

// see https://atomiks.github.io/tippyjs/v6/getting-started/
import tippy from 'tippy.js'

export default defineComponent({
  name: 'LuTooltip',
  inheritAttrs: false,
  // see options at https://atomiks.github.io/tippyjs/v6/all-props/
  props: {
    disabled: Boolean,
    content: {
      type: String,
      default: '',
    },
    allowHTML: {
      type: Boolean,
      default: true,
    },
    /**
     * 皮肤
     * 可选值：light
     */
    theme: {
      type: String,
      default: '',
    },
    placement: {
      type: String,
      default: 'top',
    },
    showOnCreate: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: [Number, String],
      default: 350,
    },
    trigger: {
      type: String,
      default: 'mouseenter focus',
    },
    appendTo: {
      type: [String, Function],
      default: () => () => document.querySelector('#app'),
    },
    interactive: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { attrs }) {
    const { disabled } = toRefs(props)

    const luTooltip = ref(null)
    const luTooltipContent = ref(null)

    const instance = ref(null)

    const init = () => {
      const opts = Object.assign({}, props, attrs, {
        content: luTooltipContent.value.innerHTML,
      })

      delete opts.disabled

      instance.value = tippy(luTooltip.value, opts)

      if (disabled.value) {
        disable()
      }
    }

    const show = () => {
      instance && instance.value?.show()
    }

    const hide = () => {
      instance && instance.value?.hide()
    }

    const disable = () => {
      instance && instance.value?.disable()
    }

    const enable = () => {
      instance && instance.value?.enable()
    }

    const destroy = () => {
      instance && instance.value?.destroy()
    }

    watch(disabled, (val) => {
      val ? disable() : enable()
    })

    onMounted(() => {
      nextTick(() => {
        init()
      })
    })

    onBeforeUnmount(() => {
      destroy()
    })

    return {
      luTooltip,
      luTooltipContent,
      instance,
      show,
      hide,
      disable,
      enable,
      destroy,
    }
  },
})
</script>

<style lang="scss" scoped>
.lu-tooltip {
  display: inline-block;

  &__content {
    display: none;
  }
}
</style>
