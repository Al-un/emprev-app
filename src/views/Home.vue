<template>
  <div>
    <v-card v-if="currentReview">
      <v-card-title class="headline grey lighten-2">
        XXreview
      </v-card-title>
      <v-form @submit.prevent="submitReview">
        <div>Reviewer: {{ currentReview.reviewerUser.username }}</div>
        <div>Reviewed: {{ currentReview.reviewedUser.username }}</div>
        <div>Period: {{ currentReview.period }}</div>

        <v-slider
          v-model="currentReview.score"
          :min="1"
          :max="5"
          :step="1"
          track-color="primary"
        ></v-slider>

        <v-text-field
          v-model="currentReview.comment"
          label="XXComment"
          required
          type="text"
        ></v-text-field>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="cancel">
            XXCancelReview
          </v-btn>
          <v-btn type="submit">
            XXSubmitReview
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

    <div v-else>
      <v-list v-for="reviewGroup in reviewsByPeriod" :key="reviewGroup.period">
        <v-subheader>{{ reviewGroup.period }}</v-subheader>

        <v-list-item
          v-for="review in reviewGroup.reviews"
          :key="review.id"
          @click="prepareForUpdate(review)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="review.reviewedUser.username" />
            <v-list-item-subtitle
              v-if="review.comment"
              v-text="review.comment"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

import { useReviewDashboard } from '@/composition'

export default defineComponent({
  components: {},

  setup(_: {}, ctx: SetupContext) {
    const reviewDashboard = useReviewDashboard(ctx)

    return reviewDashboard
  },
})
</script>
