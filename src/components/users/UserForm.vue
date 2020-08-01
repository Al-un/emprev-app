<template>
  <v-form class="user-form">
    <v-text-field
      v-model="value.username"
      label="XXUserName"
      required
    ></v-text-field>

    <v-text-field
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

    <v-container class="d-flex justify-end">
      <v-btn class="mr-4" @click="form.cancel">
        XXCancel
      </v-btn>
      <v-btn class="mr-4" @click="form.submit">
        XXSubmit
      </v-btn>
    </v-container>
  </v-form>
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
    const cancel = () => {
      ctx.emit('cancel')
    }
    const submit = () => {
      ctx.emit('submit')
    }

    return {
      form: { cancel, submit },
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
