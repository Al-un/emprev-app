import { SetupContext, computed } from '@vue/composition-api'

export const useAuthToken = (ctx: SetupContext) => {
  const token = computed(() => ctx.root.$store.state.token)

  return token
}
