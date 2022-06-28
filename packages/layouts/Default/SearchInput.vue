<template>
  <v-text-field
    v-model="content"
    light
    color="primary"
    append-icon="mdi-magnify"
    background-color="white"
    outlined
    dense
    hide-details
    rounded
    clearable
    class="app-bar__search-input mr-4"
    @keydown.enter.prevent="handleEnter"
  ></v-text-field>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const content = ref('')

    const handleEnter = () => {
      console.log(content.value)
    }

    return {
      content,
      handleEnter,
    }
  },
})
</script>

<style lang="scss" scoped>
.app-bar__search-input {
  flex: none;
  width: 420px;

  &__type {
    width: 76px;
  }

  ::v-deep {
    input {
      color: #9e9e9e;
    }

    .v-select__selection {
      color: #9e9e9e;
      font-size: 12px;
      overflow: visible;
    }
  }
}
</style>
