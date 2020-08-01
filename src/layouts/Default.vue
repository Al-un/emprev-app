<template>
  <v-app :dark="layout.dark">
    <v-navigation-drawer v-model="layout.drawer" app clipped>
      <v-list>
        <v-list-item to="/" router exact>
          <v-list-item-icon>
            <v-icon>mdi-apps</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t('nav.menu.home') }}</v-list-item-title>
        </v-list-item>

        <v-list-group v-if="user.isAdmin">
          <template v-slot:activator>
            <v-list-item-title>{{
              $t('nav.menu.users.title')
            }}</v-list-item-title>
          </template>

          <v-list-item to="/users" router exact>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{
              $t('nav.menu.users.list')
            }}</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group v-if="user.isAdmin">
          <template v-slot:activator>
            <v-list-item-title>{{
              $t('nav.menu.reviews.title')
            }}</v-list-item-title>
          </template>

          <v-list-item to="/reviews" router exact>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{
              $t('nav.menu.reviews.list')
            }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="layout.drawer = !layout.drawer" />
      <v-spacer />
      <div v-if="user.isLogged">
        <v-btn @click="logout">{{ $t('nav.header.logout') }}</v-btn>
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
} from '@vue/composition-api'

import { isAdmin, isAuthenticated } from '@/utils'
import { ROUTES } from '@/router'

export default defineComponent({
  name: 'layout-default',

  setup(_: {}, ctx: SetupContext) {
    const layout = reactive({
      dark: false,
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

    return { layout, user, logout }
  },
})
</script>
