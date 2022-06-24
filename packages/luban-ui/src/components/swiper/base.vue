<template>
  <!-- Swiper -->
  <div ref="swiper-container" :style="[styleVars]" class="swiper-container">
    <slot name="header"></slot>

    <div class="swiper-wrapper">
      <slot name="default"></slot>
    </div>

    <!-- If we need Pagination -->
    <div
      v-if="showPagination"
      ref="swiper-pagination"
      class="swiper-pagination"
    ></div>

    <!-- If we need navigation buttons -->
    <template v-if="showNavigation">
      <div ref="swiper-button-prev" class="swiper-button-prev"></div>
      <div ref="swiper-button-next" class="swiper-button-next"></div>
    </template>

    <!-- If we need scrollbar -->
    <div
      v-if="showScrollbar"
      ref="swiper-scrollbar"
      class="swiper-scrollbar"
    ></div>

    <slot name="footer"></slot>
  </div>
</template>

<script>
import { Swiper, Pagination, Navigation, Autoplay } from 'swiper'

Swiper.use([Pagination, Navigation, Autoplay])

export default {
  name: 'LuSwiperBase',
  props: {
    /**
     * 自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
     */
    autoHeight: Boolean,
    /**
     * 强制Swiper的宽度(px)，当你的Swiper在隐藏状态下初始化时用得上。这个参数会使自适应失效。
     * 可设置为undefined使这个参数无效。
     */
    width: {
      type: [Number, undefined],
      default: undefined,
    },
    /**
     * 强制Swiper的高度(px)，当你的Swiper在隐藏状态下初始化时且切换方向为垂直才用得上。这个参数会使自适应失效。
     */
    height: {
      type: [Number, undefined],
      default: undefined,
    },
    /**
     * Swiper的滑动方向，可设置为水平方向切换(horizontal)或垂直方向切换(vertical)。
     */
    direction: {
      type: String,
      default: 'horizontal',
    },
    /**
     * 容器底部的 padding 值
     */
    containerPaddingBottom: {
      type: [String, Number],
      default: '1rem',
    },
    /**
     * 是否启用导航控件
     */
    showNavigation: {
      type: Boolean,
      default: true,
    },
    /**
     * 导航箭头颜色
     */
    navigationButtonColor: {
      type: String,
      default: '#424242',
    },
    /**
     * 是否启用分页控件
     */
    showPagination: {
      type: Boolean,
      default: true,
    },
    /**
     * 设置分页控件的 bottom 值
     */
    paginationPositionBottom: {
      type: [Number, String],
      default: 0,
    },
    /**
     * 是否启用滚动条控件
     */
    showScrollbar: {
      type: Boolean,
      default: false,
    },
    /**
     * 每个视图显示的 slides 个数
     */
    slidesPerView: {
      type: [Number, String],
      default: 1,
    },
    /**
     *  定义 slides 的数量多少为一组
     */
    slidesPerGroup: {
      type: Number,
      default: 1,
    },
    /**
     * 每个 slide 之间的间距
     */
    spaceBetween: {
      type: Number,
      default: 0,
    },
    /**
     * 是否可无限轮播
     */
    loop: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否自动循环
     */
    autoplay: {
      type: [Object, Boolean],
      default: false,
    },
    /**
     * 在loop模式下，为 group 填充空白 slide
     */
    loopFillGroupWithBlank: {
      type: Boolean,
      default: true,
    },
    /**
     * slide会根据惯性滑动可能不止一格且不会贴合
     */
    freeMode: {
      type: Boolean,
      default: false,
    },
    observer: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      swiper: null,
    }
  },
  computed: {
    swiperProps() {
      return Object.assign(this.$props, this.$attrs)
    },
    styleVars() {
      return {
        '--container-padding-bottom': this.containerPaddingBottom,
        '--pagination-position-bottom': this.paginationPositionBottom,
        '--navigation-button-color': this.navigationButtonColor,
      }
    },
  },
  mounted() {
    this.create()
  },
  methods: {
    create() {
      const el = this.$refs['swiper-container']
      const paginationEl = this.$refs['swiper-pagination']
      const prevEl = this.$refs['swiper-button-prev']
      const nextEl = this.$refs['swiper-button-next']
      const scrollbarEl = this.$refs['swiper-scrollbar']

      const options = {
        ...this.swiperProps,
      }

      if (this.showPagination) {
        options.pagination = Object.assign(
          {
            el: paginationEl,
            clickable: true,
          },
          options.pagination
        )
      }

      if (this.showNavigation) {
        options.navigation = {
          nextEl,
          prevEl,
        }
      }

      if (this.showScrollbar) {
        options.scrollbar = {
          el: scrollbarEl,
        }
      }

      this.swiper = new Swiper(el, options)
    },
    update() {
      this.swiper && this.swiper.update()
    },
    init() {
      this.swiper && this.swiper.init()
    },
    slideTo(index) {
      this.swiper.slideTo(index)
    },
    // loop模式下
    slideToLoop(index) {
      this.swiper.slideToLoop(index)
    },
    slidePrev(speed, runCallbacks) {
      this.swiper.slidePrev(speed, runCallbacks)
    },
    slideNext(speed, runCallbacks) {
      this.swiper.slideNext(speed, runCallbacks)
    },
  },
}
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  padding-bottom: var(--container-padding-bottom);
}

.swiper-pagination {
  bottom: var(--pagination-position-bottom) !important;
}

.swiper-button-prev,
.swiper-button-next {
  color: var(--navigation-button-color);
  &::after {
    font-size: 22px;
    color: #000;
    font-weight: bold;
  }
  &.swiper-button-disabled {
    pointer-events: auto !important;
  }
}
</style>
