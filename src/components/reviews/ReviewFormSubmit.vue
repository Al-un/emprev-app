<template>
  <v-card>
    <!-- <v-card-title class="headline"
      >{{ $t('reviews.dashboard.form.title', [value.reviewedUser.username]) }}
    </v-card-title> -->
    <v-toolbar color="primary" dark>
      <v-toolbar-title>
        {{ $t('reviews.dashboard.form.title', [value.reviewedUser.username]) }}
      </v-toolbar-title>
    </v-toolbar>

    <v-card-subtitle>{{
      $t('reviews.dashboard.form.subtitle', [value.period])
    }}</v-card-subtitle>

    <v-card-text>
      <v-alert type="info" text outlined dense>
        {{ $t('reviews.dashboard.form.description') }}
      </v-alert>
    </v-card-text>

    <v-form ref="formRef" v-model="isFormValid" @submit.prevent="submit">
      <v-card-text>
        <p v-text="$t('reviews.dashboard.form.score', [value.score])" />
        <v-slider
          v-model="value.score"
          :min="1"
          :max="5"
          :step="1"
          track-color="primary"
        ></v-slider>

        <v-textarea
          v-model="value.comment"
          auto-grow
          :label="$t('reviews.dashboard.form.comment')"
          :rules="[ruleIsRequired]"
          required
          type="text"
        ></v-textarea>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="accent" text @click="$emit('cancel')">
          {{ $t('reviews.dashboard.form.cancel') }}
        </v-btn>
        <v-btn color="primary" type="submit">
          {{ $t('reviews.dashboard.form.submit') }}
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
}

export default defineComponent({
  props: {
    value: { type: Object as () => Review, required: true },
  },

  setup(_: {}, ctx: SetupContext) {
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
