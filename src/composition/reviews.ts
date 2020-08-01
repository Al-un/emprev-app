import { SetupContext, watch, computed } from '@vue/composition-api'

import { User, Review } from '@/models'
import api from '@/api'

import { useEntityList, useEntityCrud } from './base'

export const useReviewList = (ctx: SetupContext) => {
  const usersList = useEntityList<User>(
    ctx,
    async token => await api.user.list({ token, value: undefined }),
    async (token, user) => await api.user.delete({ token: token, value: user })
  )

  const reviewsList = useEntityList<Review>(
    ctx,
    async token => {
      const list = await api.review.listAll({ token, value: undefined })
      return list
    },
    async (token, review) => {
      /* a review cannot be deleted */
    }
  )

  const crud = useEntityCrud<Review>(
    ctx,
    (): Review => ({ reviewedUserId: '', reviewerUserId: '' }),
    async (token, value) => {
      const newUser = await api.review.create({ token, value })
      reviewsList.list.value = [...reviewsList.list.value, newUser]

      return newUser
    },
    async (token, value) => {
      const updatedReview = await api.review.update({ token, value })
      reviewsList.list.value.forEach(r => {
        if (r.id === updatedReview.id) r = updatedReview
      })

      return updatedReview
    }
  )

  /**
   * SUPER EXPENSIVE computed property but it display username instead of raw id
   */
  const reviews = computed(() => {
    const userMap: { [key: string]: string } = usersList.list.value.reduce(
      (acc, curr) => {
        return curr.id ? { ...acc, [curr.id]: curr.username } : acc
      },
      {}
    )

    return reviewsList.list.value.map(
      (r): Review => ({
        ...r,
        reviewerUser: {
          id: r.reviewerUserId,
          username: userMap[r.reviewerUserId],
        },
        reviewedUser: {
          id: r.reviewedUserId,
          username: userMap[r.reviewedUserId],
        },
      })
    )
  })

  return {
    users: usersList.list,
    loading: usersList.loading || reviewsList.loading || crud.loading,
    deleteReview: reviewsList.deleteEntity,
    cancel: crud.cancel,
    currentReview: crud.current,
    prepareForCreate: crud.prepareForCreate,
    prepareForUpdate: crud.prepareForUpdate,
    reviews,
    submitReview: crud.submit,
  }
}
