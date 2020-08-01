<template>
  <v-card class="user-card">
    <v-card-title>{{ user.username }}</v-card-title>

    <v-card-actions v-if="$slots['actions'] !== undefined">
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { User } from '@/models'

interface Props {
  user: User
}

export default defineComponent({
  props: {
    user: { type: Object as () => User, required: true },
  },

  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.user-card {
  &:hover,
  &:focus {
    cursor: pointer;
  }
}
</style>
