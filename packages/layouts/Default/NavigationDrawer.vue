<template>
  <v-navigation-drawer
    :value="visible"
    app
    absolute
    temporary
    @input="handleInput"
  >
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Elen Hong </v-list-item-title>
          <v-list-item-subtitle>yisiwings@163.com</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-icon>mdi-menu-down</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <template v-for="item in items">
        <v-list-group
          v-if="item.items && item.items.length > 0"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="child in item.items" :key="child.title">
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item v-else :key="item.title">
          <v-list-item-icon>
            <v-icon>{{ item.action }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, watch, toRefs } from '@nuxtjs/composition-api'

export default defineComponent({
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    modelValue: Boolean,
  },
  setup(props, { emit }) {
    const { modelValue } = toRefs(props)
    const visible = ref(modelValue.value)

    watch(modelValue, (val) => {
      visible.value = val
    })

    const handleInput = (val: boolean) => {
      emit('update:modelValue', val)
    }

    const items = [
      {
        action: 'mdi-home',
        title: 'Home',
      },
      {
        action: 'mdi-account',
        title: 'Account',
      },
      {
        action: 'mdi-silverware-fork-knife',
        active: true,
        items: [
          { title: 'Breakfast & brunch' },
          { title: 'New American' },
          { title: 'Sushi' },
        ],
        title: 'Dining',
      },
      {
        action: 'mdi-school',
        items: [{ title: 'List Item' }],
        title: 'Education',
      },
      {
        action: 'mdi-human-male-female-child',
        items: [{ title: 'List Item' }],
        title: 'Family',
      },
      {
        action: 'mdi-bottle-tonic-plus',
        items: [{ title: 'List Item' }],
        title: 'Health',
      },
      {
        action: 'mdi-briefcase',
        items: [{ title: 'List Item' }],
        title: 'Office',
      },
      {
        action: 'mdi-tag',
        items: [{ title: 'List Item' }],
        title: 'Promotions',
      },
    ]

    return {
      visible,
      handleInput,
      items,
    }
  },
})
</script>
