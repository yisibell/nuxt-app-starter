<template>
  <v-navigation-drawer
    class="lu-drawer"
    :style="styleVars"
    v-bind="[$props, $attrs]"
    :value="active"
    v-on="$listeners"
    @input="handleInput"
  >
    <template #prepend>
      <slot name="prepend">
        <v-app-bar :height="44" color="#ffffff" flat class="lu-drawer__app-bar">
          <v-btn v-if="right" icon @click="handleClose">
            <lu-svg-icon :icon-class="closeBtnIcon" />
          </v-btn>

          <v-spacer></v-spacer>

          <v-toolbar-title>
            <slot name="title">{{ title }}</slot>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn v-if="!right" icon @click="handleClose">
            <lu-svg-icon :icon-class="closeBtnIcon" />
          </v-btn>
        </v-app-bar>
      </slot>
    </template>

    <slot name="default"></slot>
    <template #img><slot name="img"></slot></template>
    <template #append><slot name="append"></slot></template>
  </v-navigation-drawer>
</template>

<script>
import {
  defineComponent,
  toRefs,
  watch,
  ref,
  nextTick,
  computed,
  onBeforeUnmount,
} from '@nuxtjs/composition-api'
import useLockScroll from '~~/packages/composables/helper/useLockScroll'

export default defineComponent({
  name: 'LuDrawer',
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: true,
    },
    temporary: {
      type: Boolean,
      default: true,
    },
    right: {
      type: Boolean,
      default: true,
    },
    width: {
      type: [Number, String],
      default: '86%',
    },
    touchless: {
      type: Boolean,
      default: true,
    },
    /**
     * 关闭按钮图标
     */
    closeBtnIcon: {
      type: String,
      default: 'close',
    },
    /**
     * 背景色
     */
    backgroundColor: {
      type: String,
      default: 'inherit',
    },
    /**
     * 层级
     */
    zIndex: {
      type: Number,
      default: 20,
    },
  },
  setup(props, { emit }) {
    const { modelValue, backgroundColor, zIndex } = toRefs(props)
    const active = ref(modelValue.value)

    const styleVars = computed(() => ({
      '--content-bgc': backgroundColor.value,
      '--z-index': zIndex.value,
    }))

    const handleInput = (val) => {
      emit('update:modelValue', val)
    }

    const handleClose = () => {
      handleInput(false)
      emit('close')
    }

    const { lock, unlock } = useLockScroll(true)

    watch(modelValue, (val) => {
      active.value = val

      nextTick(() => {
        const type = val ? 'opened' : 'closed'

        if (val) {
          lock()
        } else {
          unlock()
        }

        emit(type)
      })
    })

    onBeforeUnmount(() => {
      unlock()
    })

    return {
      active,
      handleClose,
      handleInput,
      styleVars,
    }
  },
})
</script>

<style lang="scss" scoped>
.lu-drawer {
  &.v-navigation-drawer--fixed {
    z-index: var(--z-index);
  }
}

:deep() {
  .v-navigation-drawer {
    &__content {
      background-color: var(--content-bgc);
      overscroll-behavior: contain;
    }
  }

  .v-toolbar__content {
    border-bottom: 1px solid #e2e2e2;
  }
}
</style>
