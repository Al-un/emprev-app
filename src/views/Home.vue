<template>
  <v-container>
    <base-loader v-if="loading" />

    <v-row v-if="currentReview" align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <review-form-submit
          v-model="currentReview"
          @cancel="cancel"
          @submit="submitReview"
        />
      </v-col>
    </v-row>

    <div v-else>
      <h2>{{ $t('reviews.dashboard.list.title') }}</h2>

      <p>{{ $t('reviews.dashboard.list.description') }}</p>

      <v-divider></v-divider>
      <v-alert v-if="reviewsByPeriod.length === 0 && !loading" type="info">
        {{ $t('reviews.dashboard.list.empty') }}
      </v-alert>

      <v-list v-for="reviewGroup in reviewsByPeriod" :key="reviewGroup.period">
        <v-subheader
          v-text="$t('reviews.dashboard.list.period', [reviewGroup.period])"
        ></v-subheader>

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
              v-text="
                $t('reviews.dashboard.list.reviewed', [
                  review.reviewedUser.username,
                ])
              "
            ></v-list-item-title>

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

import ReviewFormSubmit from '@/components/reviews/ReviewFormSubmit.vue'
import { useReviewDashboard } from '@/composition'

export default defineComponent({
  components: { ReviewFormSubmit },

  setup(_: {}, ctx: SetupContext) {
    const reviewDashboard = useReviewDashboard(ctx)

    return reviewDashboard
  },
})
</script>
