<template>
  <div class="login-container appbody">
    <v-card :width="500" :elevation="12" rounded :loading="loading">
      <div class="pa-6">
        <v-card-title class="justify-center"> 用户登录 </v-card-title>

        <div class="px-4">
          <v-divider></v-divider>
        </div>

        <v-card-text>
          <v-form
            ref="formVNode"
            v-model="valid"
            lazy-validation
            @submit.prevent="handleLogin"
          >
            <v-text-field
              v-model="form.userName"
              :rules="rules.userName"
              label="用户账号"
              prepend-inner-icon="mdi-account"
              required
              outlined
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              :rules="rules.password"
              type="password"
              prepend-inner-icon="mdi-lock"
              label="登录密码"
              required
              outlined
            ></v-text-field>

            <v-btn
              :loading="loading"
              type="submit"
              color="primary"
              block
              x-large
            >
              登 录
            </v-btn>
          </v-form>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import type { IVFormInstance } from '~~/packages/types/vuetify/form'

export default defineComponent({
  layout: 'simple',
  setup() {
    const form = ref({
      userName: '',
      password: '',
    })

    const rules = {
      userName: [(v: string) => !!v || '请输入用户账号'],
      password: [(v: string) => !!v || '请输入登录密码'],
    }

    const valid = ref(true)
    const loading = ref(false)

    const formVNode = ref(null)
    const handleLogin = () => {
      const formInstance = formVNode.value

      if (formInstance) {
        valid.value = (formInstance as IVFormInstance).validate()
        console.log(form.value, valid.value)
      }
    }

    return {
      valid,
      form,
      rules,
      formVNode,
      loading,
      handleLogin,
    }
  },
})
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
