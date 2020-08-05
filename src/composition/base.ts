import { ref, UnwrapRef, SetupContext, onMounted } from '@vue/composition-api'
import { InputValidationRule } from 'vuetify/types'

import { Entity } from '@/models'
import { useAuthToken } from './auth'

/**
 * Sets of form validation rules, vuetify-compliant, as well as form validity
 * state
 *
 * @param ctx
 *
 * @todo should the `submit` method be defined here? It assumes that the
 * emitted event will always be "submit"
 */
export const useForm = (ctx: SetupContext) => {
  const formRef = ref(null)
  const isFormValid = ref(false)

  const ruleIsRequired: InputValidationRule = (val: string | number) => {
    if (!val) {
      return ctx.root.$t('common.form.required') as string
    }
    return true
  }

  return { formRef, isFormValid, ruleIsRequired }
}

/**
 * Generic definition for a CRUD management for an entity. Specically, this
 * composition handles creations and updates.
 *
 * @param ctx
 * @param getNew generate a new entity. Equivalent to default constructor in OOP
 * @param create create method to be called
 * @param update update method to be called
 */
export const useEntityCrud = <E extends Entity>(
  ctx: SetupContext,
  getNew: () => UnwrapRef<E>,
  createMethod: (token: string, entity: UnwrapRef<E>) => Promise<E>,
  updateMethod: (token: string, entity: UnwrapRef<E>) => Promise<E>
) => {
  /**
   * The to-be-created or to-be-updated entity
   */
  const current = ref<E | undefined>(undefined)
  /**
   * Loading status specific to CRUD only. Potentially to be renamed
   * in components/views to avoid conflict with other loading status
   */
  const loading = ref(false)
  // Get the token from Vuex
  const token = useAuthToken(ctx)

  /**
   * A form is expected to appear with a new value. ID should be empty.
   */
  const prepareForCreate = () => {
    current.value = getNew()
  }

  /**
   * A form is expected to appear with an existing entity. The form might
   * now allow editing all the fields.
   *
   * @param entity to be edited entity
   */
  const prepareForUpdate = (entity: UnwrapRef<E>) => {
    current.value = JSON.parse(JSON.stringify(entity))
  }

  /**
   * Discard changes. It only cancels the `current` value. If more actions are
   * required, it is up to the view to guarantee those actions are performed.
   *
   * @todo check if `current` does not modify the original entity!!
   */
  const cancel = () => {
    current.value = undefined
  }

  /**
   * Submit changes (creation or update, based on ID existence)
   */
  const submit = async () => {
    if (!current.value) {
      // Error: should never happen!
      console.error(`Why are you submitting a change with an empty entity?`)
      return
    }

    loading.value = true

    if (!current.value.id) {
      await createMethod(token.value, current.value)
    } else {
      await updateMethod(token.value, current.value)
    }

    loading.value = false
    current.value = undefined
  }

  return {
    cancel,
    current,
    loading,
    prepareForCreate,
    prepareForUpdate,
    submit,
  }
}

/**
 * Generic definition of a entity list management. The basic functionalities are
 * - list entities based on a provided fetching method
 * - delete entities. Entities are only deleted and the list is NOT updated.
 *
 * Creation and update are handled by the CRUD composition.
 *
 * @param ctx
 * @param loadList fetch the entity list
 * @param deleteMethod delete an entity
 */
export const useEntityList = <E extends Entity>(
  ctx: SetupContext,
  loadList: (token: string) => Promise<E[]>,
  deleteMethod: (token: string, entity: E) => Promise<void>
) => {
  // Entities list
  const list = ref<E[]>([])
  // List specific loading status
  const loading = ref<boolean>(false)
  // Use token from Vuex
  const token = useAuthToken(ctx)

  onMounted(async () => {
    loading.value = true
    list.value = await loadList(token.value)
    loading.value = false
  })

  const deleteEntity = async (entity: E) => {
    await deleteMethod(token.value, entity)
    // list.value = list.value.filter(e => e.id !== entity.id)
  }

  return {
    deleteEntity,
    list,
    loading,
  }
}
