<template>
  <v-card class="user-card">
    <v-card-title>{{ user.username }}</v-card-title>

    <v-card-actions class="d-flex justify-end">
      <v-btn class="mr-4" @click="$emit('user-edit', user)">
        XXEdit
      </v-btn>
      <v-btn class="mr-4" @click="$emit('user-delete', user)">
        XXDelete
      </v-btn>
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
