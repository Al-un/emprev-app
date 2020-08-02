<template>
  <v-container>
    <v-row v-if="currentReview" align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">
            XXreview
          </v-card-title>

          <v-form @submit.prevent="submitReview">
            <v-card-text>
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
            </v-card-text>

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
      </v-col>
    </v-row>

    <div v-else>
      <h2>XXReviews</h2>

      <p>XXOnce submitted, reviews cannot be modified</p>

      <v-divider></v-divider>
      <v-list v-for="reviewGroup in reviewsByPeriod" :key="reviewGroup.period">
        <v-subheader>XX Period: {{ reviewGroup.period }}</v-subheader>

        <v-list-item
          v-for="review in reviewGroup.reviews"
          :key="review.id"
          @click="prepareForUpdate(review)"
        >
          <v-list-item-icon>
            <v-icon v-if="review.score !== undefined">mdi-check</v-icon>
            <v-icon v-else>mdi-clock</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              ><span
                >XXTo review user: {{ review.reviewedUser.username }}</span
              ></v-list-item-title
            >

            <template v-if="review.score">
              <v-list-item-subtitle>
                <p>{{ review.score }}</p>
                <p>{{ review.comment }}</p>
              </v-list-item-subtitle>
            </template>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
      </v-list>
    </div>
  </v-container>
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
