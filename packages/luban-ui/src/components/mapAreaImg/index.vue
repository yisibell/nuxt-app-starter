<template>
  <div class="lu-map-area-img" :class="{ 'lu-map-area-img--pointer': !!href }">
    <a
      :href="disabledMapArea && href ? href : 'javascript:void(0);'"
      @click.prevent
    >
      <img
        ref="imgDom"
        :src="src"
        :alt="alt"
        :usemap="`#${mapId}`"
        :style="imgStyles"
        class="lu-map-area-img__img"
        @click.prevent="handleImgClick"
      />
    </a>
    <map
      v-if="!disabledMapArea"
      :id="mapId"
      :name="mapId"
      class="lu-map-area-img__map"
    >
      <area
        v-for="(v, i) in mapAreas"
        :key="i"
        :shape="v.shape || 'rect'"
        :coords="v.coords"
        :alt="v.alt"
        href="javascript:void(0);"
        class="lu-map-area-img__map__area"
        @click="handleAreaClick(v)"
      />
    </map>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  toRefs,
  ref,
  onBeforeUnmount,
  unref,
  computed,
} from '@nuxtjs/composition-api'
import * as uuid from 'uuid'
import debounce from 'lodash/debounce'
import { responsiveImgMapArea } from 'img-map-area'
import { formatCssUnit } from '~~/packages/helpers/modules/string'

export default defineComponent({
  name: 'LuMapAreaImg',
  props: {
    /**
     * 图片链接
     */
    src: {
      type: String,
      default: '',
    },
    /**
     * 图片缺省文本
     */
    alt: {
      type: String,
      default: '',
    },
    /**
     * 默认跳转链接
     */
    href: {
      type: String,
      default: '',
    },
    /**
     * 是否禁用热区
     */
    disabledMapArea: Boolean,
    /**
     * 图片热区
     */
    mapAreas: {
      type: Array,
      default: () => [],
    },
    contain: {
      type: Boolean,
      default: true,
    },
    borderRadius: {
      type: [String, undefined],
      default: undefined,
    },
    width: {
      type: [Number, String, undefined],
      default: undefined,
    },
    minWidth: {
      type: [Number, String, undefined],
      default: undefined,
    },
    maxWidth: {
      type: [Number, String, undefined],
      default: undefined,
    },
    height: {
      type: [Number, String, undefined],
      default: undefined,
    },
    minHeight: {
      type: [Number, String, undefined],
      default: undefined,
    },
    maxHeight: {
      type: [Number, String, undefined],
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const { disabledMapArea, href } = toRefs(props)

    const imgStyles = computed(() => {
      const {
        width,
        minWidth,
        maxWidth,
        height,
        minHeight,
        maxHeight,
        borderRadius,
        contain,
      } = props

      return {
        width: formatCssUnit(width),
        minWidth: formatCssUnit(minWidth),
        maxWidth: formatCssUnit(maxWidth),
        height: formatCssUnit(height),
        minHeight: formatCssUnit(minHeight),
        maxHeight: formatCssUnit(maxHeight),
        borderRadius,
        objectFit: contain ? 'contain' : 'cover',
      }
    })

    const mapId = ref(`lu-map-area-img--1`)
    const updateMapId = () => {
      mapId.value = `lu-map-area-img--${uuid.v4()}`
    }

    // 图片默认跳转
    const handleImgClick = () => {
      if (disabledMapArea.value && href.value) {
        emit('click', href.value)
      }
    }

    // 图片热区跳转
    const handleAreaClick = (v) => {
      if (disabledMapArea.value) return

      emit('click', v.href)
    }

    const imgDom = ref(null)
    const handleResize = debounce(() => {
      responsiveImgMapArea(unref(imgDom))
    }, 300)

    onMounted(() => {
      updateMapId()

      handleResize()
      window.addEventListener('resize', handleResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize)
    })

    return {
      imgStyles,
      mapId,
      updateMapId,
      handleImgClick,
      handleAreaClick,
      imgDom,
    }
  },
})
</script>

<style lang="scss" scoped>
.lu-map-area-img {
  &--pointer {
    cursor: pointer;
  }

  &__img {
    display: block;
    width: 100%;
  }
}
</style>
