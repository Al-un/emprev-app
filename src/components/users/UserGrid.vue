<template>
  <div class="user-grid">
    <user-card v-for="(user, idx) in users" :key="idx" :user="user" />
    <user-card-add />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { User } from '@/models'
import UserCard from './UserCard.vue'
import UserCardAdd from './UserCardAdd.vue'

interface Props {
  users: User[]
}

export default defineComponent({
  components: { UserCard, UserCardAdd },
  props: {
    users: { type: Array as () => User[], required: true },
  },

  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.user-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: $gap-size-xs;

  @include responsive(tablet) {
    grid-template-columns: repeat(3, 1fr);
  }
  @include responsive(desktop) {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
