<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-toolbar-title class="headline">
        {{
          value.id
            ? $t('users.form.title.update')
            : $t('users.form.title.create')
        }}
      </v-toolbar-title>
    </v-toolbar>

    <v-form
      ref="formRef"
      v-model="isFormValid"
      class="user-form"
      @submit.prevent="submit"
    >
      <v-card-text>
        <v-text-field
          v-model="value.username"
          :label="$t('users.form.username')"
          :rules="[ruleIsRequired]"
          required
        ></v-text-field>

        <v-text-field
          v-if="value.id === undefined"
          v-model="value.password"
          :label="$t('users.form.password')"
          type="password"
          :rules="[ruleIsRequired]"
          required
        ></v-text-field>

        <div class="user-attributes">
          <label for="adminStatus">{{ $t('users.form.adminStatus') }}</label>
          <v-switch id="adminStatus" v-model="value.isAdmin"></v-switch>
          <label for="deletedStatus">{{
            $t('users.form.deletedStatus')
          }}</label>
          <v-switch id="deletedStatus" v-model="value.isDeleted"></v-switch>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="accent" text @click="$emit('cancel')">
          {{ $t('users.form.cancel') }}
        </v-btn>
        <v-btn color="primary" type="submit">
          {{
            value.id
              ? $t('users.form.submit.update')
              : $t('users.form.submit.create')
          }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import { User } from '@/models'
import { useForm } from '@/composition'

interface Props {
  value: User
}

export default defineComponent({
  props: {
    value: { type: Object as () => User, required: true },
  },

  setup(_: Props, ctx: SetupContext) {
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

<style lang="scss">
.user-form {
  .user-attributes {
    display: grid;
    grid-template-columns: 3fr 1fr;
    align-items: center;

    label + * {
      justify-self: end;
    }
  }
}
</style>
