<template>
  <v-form ref="loginForm" @submit.prevent="submit">
    <v-text-field
      v-model="credentials.username"
      autocomplete="username"
      :label="$t('views.login.username')"
      prepend-icon="mdi-account"
      required
      type="type"
    ></v-text-field>
    <v-text-field
      v-model="credentials.password"
      :append-icon="
        showPassword ? (showPassword ? 'mdi-eye' : 'mdi-eye-off') : ''
      "
      autocomplete="current-password"
      :label="$t('views.login.password')"
      prepend-icon="mdi-lock"
      required
      :type="showPassword ? 'text' : 'password'"
      @click:append="togglePwdVisibility"
    ></v-text-field>

    <v-btn block color="primary" type="submit">{{
      $t('views.login.submit')
    }}</v-btn>
  </v-form>
</template>

<script lang="ts">
import {
  defineComponent,
  SetupContext,
  reactive,
  ref,
} from '@vue/composition-api'
import { UserCredential } from '../models'

export default defineComponent({
  setup(_: {}, ctx: SetupContext) {
    const credentials = reactive<UserCredential>({ username: '', password: '' })
    const showPassword = ref(false)
    const togglePwdVisibility = () => (showPassword.value = !showPassword.value)

    const submit = async () => {
      try {
        await ctx.root.$store.dispatch('login', credentials)

        const nextPageName =
          (ctx.root.$route.query['nextPage'] as string) || 'home'

        window.setTimeout(() => {
          ctx.root.$router.replace({ name: nextPageName })
        }, 500)
      } catch (err) {
        console.log('Error', err)
      }
    }

    return { credentials, showPassword, togglePwdVisibility, submit }
  },
})
</script>
