import { ref, UnwrapRef, SetupContext, onMounted } from '@vue/composition-api'
import { InputValidationRule } from 'vuetify/types'

import { Entity } from '@/models'
import { useAuthToken } from './auth'

/**
 * Sets of form validation rules, vuetify-compliant
 * @param ctx
 */
export const useForm = (ctx: SetupContext) => {
  const formRef = ref(null)
  const isFormValid = ref(false)

  const ruleIsRequired: InputValidationRule = (val: any) => {
    if (!val) {
      return ctx.root.$t('common.form.required') as string
    }
    return true
  }

  return { formRef, isFormValid, ruleIsRequired }
}

/**
 * Generic definition for a CRUD management for an entity. Specically, this
 * composition handles creation and updates
 *
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
   * Loading the to-be-created or to-be-updated entity here
   */
  const current = ref<E | undefined>(undefined)
  /**
   * Loading status specific to CRUD only. Potentially to be renamed
   * in components/views to avoid conflict with other loading status
   */
  const loading = ref(false)
  const token = useAuthToken(ctx)

  /**
   * A form is expected to appear with a new value. ID should be empty
   */
  const prepareForCreate = () => {
    current.value = getNew()
  }

  /**
   * A form is expected to appear with an existing entity. The form might
   * now allow editing all the fields
   * @param entity to be edited entity
   */
  const prepareForUpdate = (entity: UnwrapRef<E>) => {
    current.value = JSON.parse(JSON.stringify(entity))
  }

  /**
   * Discard changes
   *
   * @todo check if `current` does not modify the original entityu
   */
  const cancel = () => {
    current.value = undefined
  }

  /**
   * Submit changes (creation or update) based on ID
   */
  const submit = async () => {
    if (!current.value) {
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

export const useEntityList = <E extends Entity>(
  ctx: SetupContext,
  loadList: (token: string) => Promise<E[]>,
  deleteMethod: (token: string, entity: E) => Promise<void>
) => {
  const token = useAuthToken(ctx)
  const list = ref<E[]>([])
  const loading = ref<boolean>(false)

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
