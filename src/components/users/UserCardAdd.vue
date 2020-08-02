<template>
  <v-card class="user-card-add" v-on="$listeners">
    <v-card-text>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-icon x-large color="primary">mdi-plus</v-icon>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>

<style lang="scss">
.user-card-add {
  &:hover,
  &:focus {
    cursor: pointer;
  }
}
</style>
