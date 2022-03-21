<template>
  <div v-if="!hidePagination" class="lu-pagination">
    <div class="lu-pagination__total">
      <slot name="total" :pageCount="pageCount" :currentPage="current">
        <span>
          {{ $t('page_common_pagination_total_x_pages', { x: pageCount }) }}
        </span>
      </slot>
    </div>
    <v-pagination
      :value="current"
      :length="pageCount"
      v-bind="[$props, $attrs]"
      @input="handleInput"
    ></v-pagination>
  </div>
</template>

<script>
import {
  defineComponent,
  toRefs,
  watch,
  ref,
  computed,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LuPagination',
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    /**
     * 当前页码
     */
    modelValue: {
      type: Number,
      default: 1,
    },
    /**
     * 每页显示条数
     */
    pageSize: {
      type: Number,
      default: 10,
    },
    /**
     * 数据总数
     */
    total: {
      type: Number,
      default: 0,
    },
    /**
     * 最大可见分页数
     */
    totalVisible: {
      type: Number,
      default: 10,
    },
    /**
     * 是否圆形页码
     */
    circle: {
      type: Boolean,
      default: true,
    },
    /**
     * 无数据时隐藏分页
     */
    hideOnNoData: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const { modelValue, hideOnNoData, total, pageSize } = toRefs(props)
    const current = ref(modelValue.value)

    const handleInput = (index) => {
      emit('update:modelValue', index)
      emit('current-change', index)
    }

    const pageCount = computed(() => Math.ceil(total.value / pageSize.value))

    const hidePagination = computed(
      () => hideOnNoData.value && total.value <= 0
    )

    watch(modelValue, (val) => {
      current.value = val
    })

    return {
      current,
      pageCount,
      handleInput,
      hidePagination,
    }
  },
})
</script>

<style lang="scss" scoped>
.lu-pagination {
  display: flex;
  align-items: center;

  &__total {
    font-size: 13px;
    color: #959595;
  }
}
</style>
