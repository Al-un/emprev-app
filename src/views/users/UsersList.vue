<template>
  <v-container>
    <v-row v-if="currentUser" align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <user-form
          v-model="currentUser"
          @cancel="cancelUserForm"
          @submit="submitUserForm"
        />
      </v-col>
    </v-row>

    <template v-else>
      <h1>{{ $t('users.list.title') }}</h1>

      <p class="my-4">{{ $t('users.list.description') }}</p>

      <user-grid
        :users="users"
        @user-new="prepareForCreate"
        @user-edit="prepareForUpdate"
        @user-delete="deleteUser"
      />
    </template>
  </v-container>
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
