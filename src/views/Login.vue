<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-form @submit.prevent="submit">
            <v-card-title>XXLogin</v-card-title>

            <v-card-text>
              <v-text-field
                v-model="credentials.username"
                autocomplete="username"
                :label="$t('views.login.username')"
                prepend-icon="mdi-account"
                required
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="credentials.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                autocomplete="current-password"
                :label="$t('views.login.password')"
                prepend-icon="mdi-lock"
                required
                :type="showPassword ? 'text' : 'password'"
                @click:append="togglePwdVisibility"
              ></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit">{{
                $t('views.login.submit')
              }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
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

    return {
      credentials,
      showPassword,
      togglePwdVisibility,
      submit,
    }
  },
})
</script>
