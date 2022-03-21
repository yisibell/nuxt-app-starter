<template>
  <div class="lu-loading" :style="styleVars">
    <div v-if="type === 'three-bounce'" class="lu-loading--three-bounce">
      <div class="lu-loading--three-bounce__child"></div>
      <div class="lu-loading--three-bounce__child"></div>
      <div class="lu-loading--three-bounce__child"></div>
    </div>
    <div v-else-if="type === 'wave'" class="lu-loading--wave">
      <div class="lu-loading--wave__child"></div>
      <div class="lu-loading--wave__child"></div>
      <div class="lu-loading--wave__child"></div>
      <div class="lu-loading--wave__child"></div>
      <div class="lu-loading--wave__child"></div>
    </div>
    <div v-else-if="type === 'cube-grid'" class="lu-loading--cube-grid">
      <div class="lu-loading--cube-grid__child"></div>
      <div class="lu-loading--cube-grid__child"></div>
      <div class="lu-loading--cube-grid__child"></div>
      <div class="lu-loading--cube-grid__child"></div>
      <div class="lu-loading--cube-grid__child"></div>
      <div class="lu-loading--cube-grid__child"></div>
      <div class="lu-loading--cube-grid__child"></div>
      <div class="lu-loading--cube-grid__child"></div>
      <div class="lu-loading--cube-grid__child"></div>
    </div>
    <span v-else>Loading...</span>
  </div>
</template>

<script>
export default {
  name: 'LuLoading',
  props: {
    /**
     * loading 类型
     * 可选值：three-bounce, wave, cube-grid
     */
    type: {
      type: String,
      default: 'three-bounce',
    },
    /**
     * 颜色
     */
    themeColor: {
      type: String,
      default: '#999999',
    },
  },
  computed: {
    styleVars() {
      return {
        '--theme-color': this.themeColor,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.lu-loading {
  text-align: center;

  &--three-bounce {
    &__child {
      background-color: var(--theme-color);
    }
  }

  &--wave {
    &__child {
      background-color: var(--theme-color);
    }
  }

  &--cube-grid {
    &__child {
      background-color: var(--theme-color);
    }
  }
}
</style>
