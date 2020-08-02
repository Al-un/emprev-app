<template>
  <v-card>
    <v-form @submit.prevent="$emit('submit')">
      <v-card-title>XXLogin</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="value.username"
          autocomplete="username"
          :label="$t('views.login.username')"
          prepend-icon="mdi-account"
          required
          type="text"
        ></v-text-field>
        <v-text-field
          v-model="value.password"
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
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { UserCredential } from '@/models'

interface Props {
  value: UserCredential
}

export default defineComponent({
  name: 'LoginForm',
  props: {
    value: { type: Object as () => UserCredential, required: true },
  },

  setup(props: Props) {
    const showPassword = ref(false)
    const togglePwdVisibility = () => (showPassword.value = !showPassword.value)

    return {
      showPassword,
      togglePwdVisibility,
    }
  },
})
</script>
