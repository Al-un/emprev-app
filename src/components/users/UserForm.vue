<template>
  <v-card>
    <v-card-title>##New user</v-card-title>

    <v-form class="user-form" @submit.prevent="form.submit">
      <v-card-text>
        <v-text-field
          v-model="value.username"
          label="XXUserName"
          required
        ></v-text-field>

        <v-text-field
          v-if="value.id === undefined"
          v-model="value.password"
          label="XXPassword"
          type="password"
          required
        ></v-text-field>

        <div class="user-attributes">
          <label for="adminStatus">XXIsAdmin</label>
          <v-switch id="adminStatus" v-model="value.isAdmin"></v-switch>
          <label for="deletedStatus">XXIsDeleted</label>
          <v-switch id="deletedStatus" v-model="value.isDeleted"></v-switch>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="mr-4" @click="$emit('cancel')">
          XXCancel
        </v-btn>
        <v-btn class="mr-4" type="submit">
          XXSubmit
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import { User } from '../../models'

interface Props {
  value: User
}

export default defineComponent({
  props: {
    value: { type: Object as () => User, required: true },
  },

  setup(_: Props, ctx: SetupContext) {
    const submit = () => {
      ctx.emit('submit')
    }

    return {
      form: { submit },
    }
  },
})
</script>

<style lang="scss">
.user-form {
  .user-attributes {
    display: grid;
    grid-template-columns: 3fr 1fr;

    label + * {
      justify-self: end;
    }
  }
}
</style>
