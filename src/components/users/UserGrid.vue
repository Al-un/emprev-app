<template>
  <div class="user-grid">
    <user-card
      v-for="(user, idx) in users"
      :key="idx"
      :user="user"
      @user-edit="user => $emit('user-edit', user)"
      @user-delete="user => $emit('user-delete', user)"
    />
    <user-card-add @click="$emit('user-new')" />
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
  // Note: using a CSS variable for the repeat count does not work T_T
  grid-template-columns: repeat(1, 1fr);
  gap: $gap-size-xs;

  @include responsive(tablet) {
    grid-template-columns: repeat(3, 1fr);
  }
  @include responsive(desktop) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
