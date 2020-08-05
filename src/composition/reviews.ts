import { SetupContext, computed } from '@vue/composition-api'

import { User, Review, ReviewByPeriod } from '@/models'
import api from '@/api'

import { useEntityList, useEntityCrud } from './base'
import { useLoggedUser } from './users'

/**
 * Reviews list management composition
 * @param ctx
 */
export const useReviewList = (ctx: SetupContext) => {
  const usersList = useEntityList<User>(
    ctx,
    async token => await api.user.list({ token, value: undefined }),
    async () => {
      /* */
    }
  )

  const reviewsList = useEntityList<Review>(
    ctx,
    async token => await api.review.listAll({ token, value: undefined }),
    async () => {
      /* no review update by administrators*/
    }
  )

  const crud = useEntityCrud<Review>(
    ctx,
    (): Review => ({ period: '', reviewedUserId: '', reviewerUserId: '' }),
    async (token, value) => {
      const newUser = await api.review.create({ token, value })
      reviewsList.list.value = [...reviewsList.list.value, newUser]

      return newUser
    },
    async (token, value) => {
      /* Reviews cannot be updated here */
      return value
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

/**
 * Review submission composition
 * @param ctx
 */
export const useReviewDashboard = (ctx: SetupContext) => {
  const loggedUser = useLoggedUser(ctx)
  const usersList = useEntityList<User>(
    ctx,
    async token => await api.user.list({ token, value: undefined }),
    async () => {
      /* no user deletion here */
    }
  )

  const reviewsList = useEntityList<Review>(
    ctx,
    async token =>
      await api.review.list({ token, value: loggedUser.userId.value || '' }),
    async () => {
      /* no review update here */
    }
  )

  const crud = useEntityCrud<Review>(
    ctx,
    (): Review => ({ period: '', reviewedUserId: '', reviewerUserId: '' }),
    async (_, value) => value, // no creation
    async (token, value) => {
      const updatedReview = await api.review.update({ token, value })

      reviewsList.list.value.forEach(r => {
        if (r.id === updatedReview.id) r = updatedReview
      })

      return updatedReview
    }
  )

  const prepareForUpdate = (review: Review) => {
    if (review.score) {
      return
    }
    crud.prepareForUpdate(review)
  }

  /**
   * SUPER EXPENSIVE computed property but it display username instead of raw id
   */
  const reviewsByPeriod = computed(() => {
    const userMap: { [key: string]: string } = usersList.list.value.reduce(
      (acc, curr) => {
        return curr.id ? { ...acc, [curr.id]: curr.username } : acc
      },
      {}
    )

    const mappedUserList = reviewsList.list.value.map(
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

    const reviews: ReviewByPeriod[] = mappedUserList.reduce((acc, curr) => {
      const grouping = acc.find(r => r.period === curr.period)
      if (grouping) {
        grouping.reviews.push(curr)
      } else {
        acc = [...acc, { period: curr.period, reviews: [curr] }]
      }
      return acc
    }, [] as ReviewByPeriod[])

    return reviews
  })

  return {
    users: usersList.list,
    loading: usersList.loading || reviewsList.loading || crud.loading,
    deleteReview: reviewsList.deleteEntity,
    cancel: crud.cancel,
    currentReview: crud.current,
    prepareForCreate: crud.prepareForCreate,
    prepareForUpdate,
    reviewsByPeriod,
    submitReview: crud.submit,
  }
}
