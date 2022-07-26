<template>
  <div class="lu-swiper-thumbs">
    <div class="lu-swiper-thumbs__wrapper">
      <LuSwiperBase
        v-if="items.length"
        ref="swiperThumbs"
        class="lu-swiper-thumbs__thumb"
        direction="vertical"
        slides-per-view="auto"
        :class="{ 'mt-7': items.length > showNavigationWhenItemsGet }"
        :show-navigation="items.length > showNavigationWhenItemsGet"
        :show-pagination="false"
        :observer="true"
        :space-between="2"
      >
        <slot name="thumb">
          <div
            v-for="(v, i) in items"
            :key="i"
            class="swiper-slide"
            @mouseenter="thumbHover(i)"
          >
            <img
              :src="v.src"
              :class="{
                'lu-swiper-thumbs__thumb__img--active': i === activeIndex,
              }"
              width="85"
            />
          </div>
        </slot>
      </LuSwiperBase>
    </div>

    <LuSwiperBase
      v-if="items.length"
      ref="swiperGallery"
      class="lu-swiper-thumbs__gallery"
      :on="gallerySwiperOn"
      :show-pagination="false"
      :show-navigation="false"
      auto-height
      @mouseenter="showNavigation = true"
      @mouseleave="showNavigation = false"
    >
      <template #header><slot name="gallery-top"></slot></template>
      <slot name="gallery">
        <div v-for="(v, i) in items" :key="i" class="swiper-slide">
          <img :src="v.src" class="lu-swiper-thumbs__gallery__img" />
        </div>
      </slot>
    </LuSwiperBase>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LuSwiperThumbs',
  props: {
    /**
     * 图片列表
     */
    items: {
      type: Array,
      default: () => [],
    },
    /**
     * 缩略图超过多少时，显示切换箭头
     */
    showNavigationWhenItemsGet: {
      type: Number,
      default: 5,
    },
  },
  setup() {
    const activeIndex = ref(0)
    const swiperThumbs = ref(null)
    const swiperGallery = ref(null)
    const showNavigation = ref(false)

    const gallerySwiperOn = {
      slideChange() {
        activeIndex.value = this.activeIndex
      },
    }

    const thumbHover = (index) => {
      swiperGallery.value.slideTo(index)
    }

    return {
      activeIndex,
      thumbHover,
      gallerySwiperOn,
      swiperThumbs,
      swiperGallery,
      showNavigation,
    }
  },
})
</script>

<style lang="scss" scoped>
$--thumbs-height: 376px;

.lu-swiper-thumbs {
  display: flex;

  .swiper-container {
    height: 100%;
    padding-bottom: 0;
  }

  .swiper-slide {
    height: auto;
  }

  &__wrapper {
    position: relative;
  }

  &__thumb {
    max-height: $--thumbs-height;
    margin-right: 14px;
    width: 60px;

    &.swiper-container {
      width: auto;
      position: static;
    }

    &__img {
      &--active {
        padding: 1px;
        border: solid thin var(--v-primary-base);
        box-sizing: border-box;
      }
    }

    :deep() {
      .swiper-button-prev,
      .swiper-button-next {
        position: absolute;
        width: 85px;
        height: 20px;
        background-color: #f5f5f5;
        right: 0;
        left: 0;
        cursor: pointer;
        z-index: 1;
      }

      .swiper-button-prev {
        top: 20px;
        transform: rotate(180deg);

        &::after {
          transform: rotate(-90deg);
          font-size: 17px;
          color: #000;
          margin-bottom: 0;
          font-weight: bold;
        }
      }

      .swiper-button-next {
        top: $--thumbs-height + 60px;

        &::after {
          transform: rotate(90deg);
          font-size: 17px;
          margin-bottom: 0;
          color: #000;
          font-weight: bold;
        }
      }
    }
  }

  &__gallery {
    position: relative;
    flex: 1;

    &__img {
      cursor: default;
      width: 100%;
    }
  }
}
</style>
