<template>
  <client-only>
    <svg-icon
      :title="iconClass"
      :data-icon-class="iconClass"
      :style="styles"
      class="lu-svg-icon"
      v-bind="[$props, $attrs]"
      v-on="$listeners"
    />
  </client-only>
</template>

<script>
import { computed, defineComponent, toRefs } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LuSvgIcon',
  inheritAttrs: false,
  props: {
    iconClass: {
      type: String,
      default: '',
    },
    /**
     * 字体大小
     */
    size: {
      type: [String, undefined],
      default: undefined,
    },
    /**
     * 字体颜色
     */
    color: {
      type: [String, undefined],
      default: undefined,
    },
  },
  setup(props) {
    const { size, color } = toRefs(props)

    const styles = computed(() => ({
      fontSize: size.value,
      fill: color.value,
      color: color.value,
    }))

    return {
      styles,
    }
  },
})
</script>

<style lang="scss" scoped>
.lu-svg-icon {
  cursor: pointer;
}
</style>
