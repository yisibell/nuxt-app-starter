<template>
  <client-only>
    <svg-icon
      :title="name"
      :data-name="name"
      class="lu-svg-icon"
      v-bind="[$props, $attrs]"
      v-on="$listeners"
    />
  </client-only>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LuSvgIcon',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.lu-svg-icon {
  cursor: pointer;
}
</style>
