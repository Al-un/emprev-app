<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <login-form v-model="credentials" :status="status" @submit="submit" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  SetupContext,
  reactive,
  ref,
  computed,
} from '@vue/composition-api'

import { UserCredential, ApiReqStatus } from '@/models'
import LoginForm from '@/components/users/LoginForm.vue'

export default defineComponent({
  components: { LoginForm },

  setup(_: {}, ctx: SetupContext) {
    const credentials = reactive<UserCredential>({ username: '', password: '' })
    const status = ref<ApiReqStatus>('ready')

    const submit = async () => {
      if (!credentials.username || !credentials.password) {
        status.value = 'error'
        return
      }

      try {
        status.value = 'loading'
        await ctx.root.$store.dispatch('login', credentials)

        const nextPageName =
          (ctx.root.$route.query['nextPage'] as string) || 'home'

        status.value = 'success'
        window.setTimeout(() => {
          ctx.root.$router.replace({ name: nextPageName })
        }, 500)
      } catch (err) {
        status.value = 'error'
        console.log('Error', err)
      }
    }

    return {
      credentials,
      submit,
      status,
    }
  },
})
</script>
