import {
  onMounted,
  ref,
  computed,
  watch,
  Ref,
  ComputedRef,
  unref,
} from '@nuxtjs/composition-api'

/**
 * 获取图片的原始大小
 */
export default (url: Ref<string> | ComputedRef<string>) => {
  const imageNaturalWidth = ref(0)
  const imageNaturalHeight = ref(0)

  // 图片宽高比
  const imageAspectRatio = computed(
    () => imageNaturalWidth.value / imageNaturalHeight.value || undefined
  )

  const getImageSize = (url: string) => {
    const imgEl = new Image()
    imgEl.src = url
    imgEl.onload = () => {
      imageNaturalWidth.value = imgEl.width
      imageNaturalHeight.value = imgEl.height
    }
  }

  onMounted(() => {
    getImageSize(unref(url))
  })

  watch(url, (val) => {
    getImageSize(val)
  })

  return {
    imageNaturalWidth,
    imageNaturalHeight,
    imageAspectRatio,
  }
}
