<template>
  <div v-intersect="onIntersect" class="lu-intersect-loading">
    <template v-if="error">
      <slot name="error">
        <div class="lu-intersect-loading__error" @click="handleErrorClick">
          {{ errorText }}
        </div>
      </slot>
    </template>

    <lu-loading v-else-if="!finished" />
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  onBeforeUnmount,
  onMounted,
  toRefs,
} from '@nuxtjs/composition-api'
import debounce from 'lodash/debounce'

export default defineComponent({
  name: 'LuIntersectLoading',
  props: {
    /**
     * load事件触发的延迟毫秒数
     */
    delay: {
      type: Number,
      default: 500,
    },
    /**
     * 是否加载失败，加载失败后点击错误提示可以重新触发load事件
     * 必须使用 sync 修饰符
     */
    error: {
      type: Boolean,
      default: false,
    },
    /**
     * 加载失败后的提示文案
     */
    errorText: {
      type: String,
      default: 'Error, Click To Reload',
    },
    /**
     * 是否已加载完成，加载完成后不再触发load事件
     */
    finished: {
      type: Boolean,
      default: false,
    },
    /**
     * 监听scroll的元素选择器，默认监听window
     */
    scrollContainerSelector: {
      type: String,
      default: '',
    },
    /**
     * 自动检测交叉观察者延时毫秒数
     */
    intersectWatcherDelay: {
      type: Number,
      default: 3000,
    },
  },
  setup(props, { emit }) {
    const {
      delay,
      finished,
      error,
      scrollContainerSelector,
      intersectWatcherDelay,
    } = toRefs(props)

    const getListenerElement = () =>
      scrollContainerSelector.value
        ? document.querySelector(scrollContainerSelector.value)
        : window

    const isIntersecting = ref(true)
    const onIntersect = (entries) => {
      isIntersecting.value = entries[0].isIntersecting
    }

    const emitLoad = () => {
      emit('load')
    }

    const handleErrorClick = debounce(() => {
      emit('update:error', false)
      emitLoad()
    }, delay.value)

    const handleLoad = debounce(() => {
      if (isIntersecting.value && !finished.value && !error.value) {
        emitLoad()
      }
    }, delay.value)

    const intersectWatcherTimer = ref(null)
    const setIntersectWatcher = () => {
      intersectWatcherTimer.value = setInterval(() => {
        handleLoad()
      }, intersectWatcherDelay.value)
    }
    const clearIntersectWatcher = () => {
      if (intersectWatcherTimer.value) {
        clearInterval(intersectWatcherTimer.value)
        intersectWatcherTimer.value = null
      }
    }

    onMounted(() => {
      getListenerElement().addEventListener('scroll', handleLoad)
      setIntersectWatcher()
    })

    onBeforeUnmount(() => {
      const el = getListenerElement()
      el && el.removeEventListener('scroll', handleLoad)

      clearIntersectWatcher()
    })

    return {
      intersectWatcherTimer,
      setIntersectWatcher,
      clearIntersectWatcher,
      isIntersecting,
      onIntersect,
      handleLoad,
      handleErrorClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.lu-intersect-loading {
  padding: 25px 0px;
  display: flex;
  justify-content: center;

  &__error {
    color: #555353;
    cursor: pointer;
    font-size: 14px;
  }

  &__finished {
    width: 80%;
    color: #999999;
    font-size: 14px;
    font-style: italic;
    display: flex;
    align-items: center;
  }
}
</style>
