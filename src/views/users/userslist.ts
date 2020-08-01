import { onMounted, SetupContext, ref } from '@vue/composition-api'
import { User } from '@/models'
import api from '@/api'
import { useAuthToken } from '../base'

export const useUserList = (ctx: SetupContext) => {
  const users = ref<User[]>([])

  const token = useAuthToken(ctx)

  const loading = ref<boolean>(false)

  onMounted(async () => {
    loading.value = true
    users.value = await api.user.list({ token: token.value, value: undefined })
    loading.value = false
  })

  const createUser = async (user: User) => {
    const newUser = await api.user.create({
      token: token.value,
      value: user,
    })
    users.value = [...users.value, newUser]
  }

  const updateUser = async (user: User) => {
    const updatedUser = await api.user.update({
      token: token.value,
      value: user,
    })
    users.value.forEach(u => {
      if (u.id === updatedUser.id) {
        u = updatedUser
      }
    })
  }

  const deleteUser = async (user: User) => {
    await api.user.delete({ token: token.value, value: user })

    users.value = users.value.filter(u => u.id !== user.id)
    // users.value.forEach(u => {
    //   if (u.id === user.id) {
    //     u.isDeleted = true
    //   }
    // })
  }

  const currentUser = ref<User | undefined>(undefined)

  const prepareForCreate = () => {
    currentUser.value = {
      id: undefined,
      username: '',
      isAdmin: false,
      isDeleted: false,
      password: '',
    }
  }

  const prepareForUpdate = (user: User) => {
    currentUser.value = user
  }

  const cancelUserForm = () => {
    currentUser.value = undefined
  }

  const submitUserForm = async () => {
    if (!currentUser.value) {
      return
    }

    loading.value = true
    if (!currentUser.value.id) {
      await createUser(currentUser.value)
    } else {
      await updateUser(currentUser.value)
    }

    loading.value = false
    currentUser.value = undefined
  }

  return {
    users,
    loading,
    deleteUser,
    cancelUserForm,
    currentUser,
    prepareForCreate,
    prepareForUpdate,
    submitUserForm,
  }
}
