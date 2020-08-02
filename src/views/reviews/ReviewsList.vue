<template>
  <v-container>
    <h1>{{ $t('reviews.mgmt.title') }}</h1>
    <v-data-table
      :headers="headers"
      :items="reviews"
      :items-per-page="15"
    ></v-data-table>

    <v-dialog v-model="showDialog" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          fixed
          bottom
          right
          color="secondary"
          v-bind="attrs"
          v-on="on"
          @click="prepareForCreate"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card v-if="currentReview">
        <v-card-title class="headline">
          {{ $t('reviews.form.new.title') }}
        </v-card-title>

        <v-form @submit.prevent="submitReview">
          <v-card-text>
            <v-text-field
              v-model="currentReview.period"
              :label="$t('reviews.form.new.period')"
              required
              type="text"
            ></v-text-field>

            <v-select
              v-model="currentReview.reviewerUserId"
              :items="users"
              item-text="username"
              item-value="id"
              :label="$t('reviews.form.new.reviewer')"
            ></v-select>

            <v-select
              v-model="currentReview.reviewedUserId"
              :items="users"
              item-text="username"
              item-value="id"
              :label="$t('reviews.form.new.reviewed')"
            ></v-select>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" text @click="cancel">
              {{ $t('reviews.form.new.cancel') }}
            </v-btn>
            <v-btn color="primary" type="submit">
              {{ $t('reviews.form.new.submit') }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, watch } from '@vue/composition-api'
import { useReviewList } from '../../composition'

export default defineComponent({
  components: {},

  setup(_: {}, ctx: SetupContext) {
    const headers = [
      {
        text: ctx.root.$t('reviews.mgmt.list.reviewer'),
        value: 'reviewerUser.username',
      },
      {
        text: ctx.root.$t('reviews.mgmt.list.reviewed'),
        value: 'reviewedUser.username',
      },
      { text: ctx.root.$t('reviews.mgmt.list.score'), value: 'score' },
      { text: ctx.root.$t('reviews.mgmt.list.period'), value: 'period' },
      { text: ctx.root.$t('reviews.mgmt.list.comment'), value: 'comment' },
    ]
    const reviews = useReviewList(ctx)

    const showDialog = ref(false)

    const cancel = () => {
      reviews.cancel()
      showDialog.value = false
    }
    const submitReview = () => {
      reviews.submitReview()
      showDialog.value = false
    }

    return { ...reviews, headers, showDialog, cancel, submitReview }
  },
})
</script>

<style lang="scss"></style>
