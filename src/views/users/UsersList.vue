<template>
  <div>
    <div>{{ loading }}</div>
    <user-form
      v-if="currentUser"
      v-model="currentUser"
      @cancel="cancelUserForm"
      @submit="submitUserForm"
    />
    <user-grid
      v-else
      :users="users"
      @user-new="prepareForCreate"
      @user-edit="prepareForUpdate"
      @user-delete="deleteUser"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

import UserForm from '@/components/users/UserForm.vue'
import UserGrid from '@/components/users/UserGrid.vue'
import { useUserList } from '@/composition'

export default defineComponent({
  components: { UserForm, UserGrid },

  setup(_: {}, ctx: SetupContext) {
    return useUserList(ctx)
  },
})
</script>

<style lang="scss"></style>
