import { SetupContext, computed } from '@vue/composition-api'

import { User } from '@/models'
import api from '@/api'

import { useEntityList, useEntityCrud } from './base'

export const useUserList = (ctx: SetupContext) => {
  const list = useEntityList<User>(
    ctx,
    async token => await api.user.list({ token, value: undefined }),
    async (token, user) => await api.user.delete({ token: token, value: user })
  )

  const crud = useEntityCrud<User>(
    ctx,
    () => ({
      username: '',
      isAdmin: false,
      isDeleted: false,
    }),
    async (token, value) => {
      const newUser = await api.user.create({ token, value })
      list.list.value = [...list.list.value, newUser]

      return newUser
    },
    async (token, value) => {
      const updatedUser = await api.user.update({ token, value })
      list.list.value.forEach(u => {
        if (u.id === updatedUser.id) {
          u.isAdmin = updatedUser.isAdmin
          u.isDeleted = updatedUser.isDeleted
          u.username = updatedUser.username
        }
      })

      return updatedUser
    }
  )

  const deleteUser = (user: User) => {
    list.deleteEntity(user)
    list.list.value.forEach(u => {
      if (u.id === user.id) {
        u.isDeleted = true
      }
    })
  }

  return {
    users: list.list,
    loading: list.loading || crud.loading,
    deleteUser,
    cancelUserForm: crud.cancel,
    currentUser: crud.current,
    prepareForCreate: crud.prepareForCreate,
    prepareForUpdate: crud.prepareForUpdate,
    submitUserForm: crud.submit,
  }
}

/**
 *
 * @param ctx
 * @todo Types required here, which requires re-typing the RootState as well
 */
export const useLoggedUser = (ctx: SetupContext) => {
  const user = ctx.root.$store.state.user

  const isAdmin = computed<boolean>(() => (user ? user.isAdmin : false))
  const username = computed<string | undefined>(() =>
    user ? user.username : undefined
  )
  const userId = computed<string | undefined>(() =>
    user ? user.id : undefined
  )

  return {
    isAdmin,
    username,
    userId,
  }
}
