<template>
  <v-card class="user-card">
    <v-card-title>
      {{ user.username }}
      <v-spacer></v-spacer>
      <v-icon v-if="user.isDeleted" color="error">mdi-wifi-off</v-icon>
      <v-icon v-else color="success">mdi-heart</v-icon>
    </v-card-title>

    <v-card-actions v-if="!user.isRoot">
      <v-spacer></v-spacer>
      <v-btn color="info" @click="$emit('user-edit', user)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        v-if="!user.isDeleted"
        color="error"
        @click="$emit('user-delete', user)"
      >
        <v-icon>mdi-delete</v-icon>
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
