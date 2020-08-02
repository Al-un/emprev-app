<template>
  <v-container>
    <h1>##Created reviews</h1>
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
        <v-card-title class="headline grey lighten-2">
          XXNew review
        </v-card-title>

        <v-form @submit.prevent="submitReview">
          <v-card-text>
            <v-text-field
              v-model="currentReview.period"
              label="XXPeriod"
              required
              type="text"
            ></v-text-field>

            <v-select
              v-model="currentReview.reviewerUserId"
              :items="users"
              item-text="username"
              item-value="id"
              label="XXReviewerUserId"
            ></v-select>

            <v-select
              v-model="currentReview.reviewedUserId"
              :items="users"
              item-text="username"
              item-value="id"
              label="XXReviewedUserId"
            ></v-select>
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
      { text: 'XXReviewer', value: 'reviewerUser.username' },
      { text: 'XXReviewed', value: 'reviewedUser.username' },
      { text: 'XXScore', value: 'score' },
      { text: 'XXPeriod', value: 'period' },
      { text: 'XXComment', value: 'comment' },
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
