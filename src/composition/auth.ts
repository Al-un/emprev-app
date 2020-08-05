import { SetupContext, computed } from '@vue/composition-api'

/**
 * This is an equivalent of having a Vuex getter used in all the
 * views requiring access to the JWT token
 *
 * @param ctx
 */
export const useAuthToken = (ctx: SetupContext) => {
  const token = computed(() => ctx.root.$store.state.token)

  return token
}
