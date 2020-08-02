<template>
  <v-card>
    <v-form ref="formRef" v-model="isFormValid" @submit.prevent="submit">
      <v-card-title v-text="$t('users.login.title')"></v-card-title>

      <v-card-text>
        <v-alert v-if="status === 'loading'" type="info">
          {{ $t(`users.login.${status}`) }}
        </v-alert>
        <v-alert v-else-if="status === 'success'" type="success">
          {{ $t(`users.login.${status}`) }}
        </v-alert>
        <v-alert v-else-if="status === 'error'" type="error">
          {{ $t(`users.login.${status}`) }}
        </v-alert>

        <v-text-field
          v-model="value.username"
          autocomplete="username"
          :label="$t('users.login.username')"
          prepend-icon="mdi-account"
          :rules="[ruleIsRequired]"
          required
          type="text"
        ></v-text-field>
        <v-text-field
          v-model="value.password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          autocomplete="current-password"
          :label="$t('users.login.password')"
          prepend-icon="mdi-lock"
          :rules="[ruleIsRequired]"
          required
          :type="showPassword ? 'text' : 'password'"
          @click:append="togglePwdVisibility"
        ></v-text-field>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" type="submit">{{
          $t('users.login.submit')
        }}</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from '@vue/composition-api'

import { UserCredential, ApiReqStatus } from '@/models'
import { useRules } from '../../composition/base'

interface Props {
  value: UserCredential
  status: ApiReqStatus
}

export default defineComponent({
  name: 'LoginForm',
  props: {
    value: { type: Object as () => UserCredential, required: true },
    status: { type: String as () => ApiReqStatus, default: 'idle' },
  },

  setup(props: Props, ctx: SetupContext) {
    const showPassword = ref(false)
    const togglePwdVisibility = () => (showPassword.value = !showPassword.value)
    const { formRef, isFormValid, ruleIsRequired } = useRules(ctx)

    const submit = () => {
      if (formRef) {
        ;(formRef.value as any).validate()
      }

      if (isFormValid.value) {
        ctx.emit('submit')
      }
    }

    return {
      isFormValid,
      formRef,
      ruleIsRequired,
      showPassword,
      submit,
      togglePwdVisibility,
    }
  },
})
</script>
