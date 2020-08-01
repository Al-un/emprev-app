import { SetupContext } from '@vue/composition-api'

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
        if (u.id === updatedUser.id) u = updatedUser
      })

      return updatedUser
    }
  )

  return {
    users: list.list,
    loading: list.loading || crud.loading,
    deleteUser: list.deleteEntity,
    cancelUserForm: crud.cancel,
    currentUser: crud.current,
    prepareForCreate: crud.prepareForCreate,
    prepareForUpdate: crud.prepareForUpdate,
    submitUserForm: crud.submit,
  }
}
