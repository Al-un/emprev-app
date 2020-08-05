<template>
  <div>
    Loading...
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

/**
 * Basic loader component. Vuetify provides a nice set of loading components
 * as well but I could not properly set up loading statuses in pages so it was
 * not worthy to dig in here.
 */
export default defineComponent({
  name: 'BaseLoader',

  setup() {
    return {}
  },
})
</script>
