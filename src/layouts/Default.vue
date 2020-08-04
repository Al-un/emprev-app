<template>
  <v-app :dark="layout.dark">
    <v-navigation-drawer
      v-if="user.isLogged"
      v-model="layout.drawer"
      app
      clipped
    >
      <v-list>
        <v-list-item to="/" router exact>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t('nav.menu.home') }}</v-list-item-title>
        </v-list-item>

        <v-list-group v-if="user.isAdmin" prepend-icon="mdi-account">
          <template v-slot:activator>
            <v-list-item-title>{{
              $t('nav.menu.users.title')
            }}</v-list-item-title>
          </template>

          <v-list-item to="/users" router exact>
            <v-list-item-icon>
              <v-icon>mdi-account-box-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{
              $t('nav.menu.users.list')
            }}</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group v-if="user.isAdmin" prepend-icon="mdi-gavel">
          <template v-slot:activator>
            <v-list-item-title>{{
              $t('nav.menu.reviews.title')
            }}</v-list-item-title>
          </template>

          <v-list-item to="/reviews" router exact>
            <v-list-item-icon>
              <v-icon>mdi-briefcase-edit</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{
              $t('nav.menu.reviews.list')
            }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>

      <template #append>
        <v-divider></v-divider>
        <v-container>
          <v-row align="center" justify="center">
            <v-icon>mdi-weather-sunny</v-icon>
            <v-switch v-model="layout.dark" color="primary" class="mx-4" />
            <v-icon>mdi-weather-night</v-icon>
          </v-row>
        </v-container>
      </template>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon
        v-if="user.isLogged"
        @click.stop="layout.drawer = !layout.drawer"
      />
      <v-spacer />
      <div v-if="user.isLogged">
        <v-btn @click="logout">
          <span>{{ $t('nav.header.logout') }}</span>
          <v-icon class="ml-2">mdi-logout</v-icon>
        </v-btn>
      </div>
      <!-- <v-btn v-else :to="loginDest" nuxt>{{ $t("nav.header.login") }}</v-btn> -->
    </v-app-bar>

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  SetupContext,
  watch,
} from '@vue/composition-api'

import { isAdmin, isAuthenticated } from '@/utils'
import { ROUTES } from '@/router'

const EMPREV_DARK = 'emprev_dark'

export default defineComponent({
  name: 'layout-default',

  setup(_: {}, ctx: SetupContext) {
    const isDark = !!localStorage.getItem(EMPREV_DARK) || false

    const layout = reactive({
      dark: isDark,
      drawer: false,
    })

    const user = {
      isAdmin: computed(() => isAdmin()),
      isLogged: computed(() => isAuthenticated()),
    }

    const logout = async () => {
      await ctx.root.$store.dispatch('logout')
      ctx.root.$router.push({ name: ROUTES.LOGIN })
    }

    watch(
      () => layout.dark,
      (newDarkVal: boolean) => {
        ctx.root.$vuetify.theme.dark = newDarkVal
        if (newDarkVal) {
          localStorage.setItem(EMPREV_DARK, newDarkVal + '')
        } else {
          localStorage.removeItem(EMPREV_DARK)
        }
      },
      { immediate: true }
    )

    return { layout, user, logout }
  },
})
</script>
