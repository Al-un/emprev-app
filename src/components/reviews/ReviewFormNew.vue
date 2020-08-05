<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title class="headline">
        {{ $t('reviews.form.new.title') }}
      </v-toolbar-title>
    </v-toolbar>

    <v-form ref="formRef" v-model="isFormValid" @submit.prevent="submit">
      <v-card-text>
        <v-text-field
          v-model="value.period"
          :label="$t('reviews.form.new.period')"
          :rules="[ruleIsRequired]"
          required
          type="text"
        ></v-text-field>

        <v-select
          v-model="value.reviewerUserId"
          :items="users"
          item-text="username"
          item-value="id"
          :label="$t('reviews.form.new.reviewer')"
          :rules="[ruleIsRequired]"
          required
        ></v-select>

        <v-select
          v-model="value.reviewedUserId"
          :items="users"
          item-text="username"
          item-value="id"
          :label="$t('reviews.form.new.reviewed')"
          :rules="[ruleIsRequired]"
          required
        ></v-select>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="accent" text @click="$emit('cancel')">
          {{ $t('reviews.form.new.cancel') }}
        </v-btn>
        <v-btn color="primary" type="submit">
          {{ $t('reviews.form.new.submit') }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

import { useForm } from '@/composition'
import { Review, User } from '@/models'

interface Props {
  value: Review
  users: User[]
}

export default defineComponent({
  props: {
    value: { type: Object as () => Review, required: true },
    users: { type: Array as () => User[], required: true },
  },

  setup(_: Props, ctx: SetupContext) {
    const { formRef, isFormValid, ruleIsRequired } = useForm(ctx)

    const submit = () => {
      if (formRef) {
        ;(formRef.value as any).validate()
      }

      if (isFormValid.value) {
        ctx.emit('submit')
      }
    }

    return { formRef, isFormValid, ruleIsRequired, submit }
  },
})
</script>
