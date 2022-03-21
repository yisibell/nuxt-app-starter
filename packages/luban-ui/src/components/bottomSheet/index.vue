<template>
  <v-bottom-sheet
    class="lu-bottom-sheet"
    :value="sheetActive"
    v-bind="[$props, $attrs]"
    v-on="$listeners"
    @input="handleInput"
  >
    <template #activator="{ on, attrs }">
      <slot name="activator" v-bind="attrs" v-on="on"></slot>
    </template>

    <v-sheet :height="height" :style="styleVars" :class="customClass">
      <v-app-bar
        v-if="showTitleBar"
        :height="titleBarHeight"
        :color="titleBarColor"
        flat
      >
        <lu-title-bar
          :close-btn-icon="closeBtnIcon"
          :show-close-btn="showCloseBtn"
          :close-btn-position="closeBtnPosition"
          @close="handleClose"
        >
          <template #left-close-icon>
            <slot name="left-close-icon"></slot>
          </template>
          <slot name="title">{{ title }}</slot>
          <template #right-close-icon>
            <slot name="right-close-icon"></slot>
          </template>
        </lu-title-bar>
      </v-app-bar>
      <div class="lu-bottom-sheet__body" :class="contentAcss">
        <slot name="default"></slot>
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import {
  defineComponent,
  toRefs,
  ref,
  watch,
  computed,
  nextTick,
  onBeforeUnmount,
} from '@nuxtjs/composition-api'
import useLockScroll from '~~/packages/composables/helper/useLockScroll'

export default defineComponent({
  name: 'LuBottomSheet',
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    /**
     * 控制组件可见还是隐藏
     */
    modelValue: {
      type: Boolean,
      default: false,
    },
    /**
     * 在元素外部单击不会将其停用
     */
    persistent: {
      type: Boolean,
      default: false,
    },
    /**
     * 高度，请使用 vh 单位
     */
    height: {
      type: String,
      default: '85vh',
    },
    /**
     * 是否展示应用条
     */
    showTitleBar: {
      type: Boolean,
      default: true,
    },

    /**
     * 标题文本
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * 标题栏颜色
     */
    titleBarColor: {
      type: String,
      default: '#ffffff',
    },
    /**
     * 标题栏高度
     */
    titleBarHeight: {
      type: String,
      default: '48px',
    },
    /**
     * 是否显示关闭按钮
     */
    showCloseBtn: {
      type: Boolean,
      default: true,
    },
    /**
     * 关闭按钮icon, 使用 svg
     */
    closeBtnIcon: {
      type: String,
      default: 'close',
    },
    /**
     * 关闭按钮位置 top-left, top-right
     */
    closeBtnPosition: {
      type: String,
      default: 'top-right',
    },
    /**
     * 自定义class，修改样式
     */
    customClass: {
      type: String,
      default: '',
    },
    /**
     * 是否锁定背景滚动
     */
    lockScroll: {
      type: Boolean,
      default: true,
    },
    contentAcss: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const { modelValue, height, titleBarHeight, lockScroll } = toRefs(props)
    const sheetActive = ref(modelValue.value)

    const styleVars = computed(() => ({
      '--sheet-body-height': height.value,
      '--sheet-app-bar-height': titleBarHeight.value,
    }))

    const handleInput = (val) => {
      emit('update:modelValue', val)

      if (!val) {
        emit('close')
      }
    }

    const handleClose = () => {
      handleInput(false)
    }

    const { lock, unlock } = useLockScroll(lockScroll.value)

    watch(modelValue, (val) => {
      sheetActive.value = val

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
      sheetActive,
      styleVars,
      handleInput,
      handleClose,
    }
  },
})
</script>

<style lang="scss" scoped>
.lu-bottom-sheet {
  &__body {
    height: calc(var(--sheet-body-height) - var(--sheet-app-bar-height));
    overflow-y: auto;
    padding: 14px;
  }
}
</style>
