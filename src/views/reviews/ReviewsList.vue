<template>
  <v-container>
    <h1>{{ $t('reviews.mgmt.title') }}</h1>
    <v-data-table
      :headers="headers"
      :items="reviews"
      :items-per-page="15"
    ></v-data-table>

    <v-dialog v-model="showDialog" persistent :width="500">
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

      <review-form-new
        v-if="currentReview"
        v-model="currentReview"
        :users="users"
        @cancel="cancel"
        @submit="submitReview"
      ></review-form-new>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, watch } from '@vue/composition-api'

import ReviewFormNew from '@/components/reviews/ReviewFormNew.vue'
import { useReviewList } from '@/composition'

export default defineComponent({
  components: { ReviewFormNew },

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
