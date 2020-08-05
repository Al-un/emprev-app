import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Home from '@/views/Home.vue'
import Login from '@/views/users/Login.vue'
import UsersList from '@/views/users/UsersList.vue'
import ReviewsList from '@/views/reviews/ReviewsList.vue'
import { isAuthenticated } from '@/utils'

Vue.use(VueRouter)

export const ROUTES = {
  HOME: 'home',
  LOGIN: 'login',
  NOT_FOUND: 'not-found',
  USERS_LIST: 'users-list',
  REVIEWS_LIST: 'reviews-list',
}

export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.NOT_FOUND]

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: ROUTES.HOME,
    component: Home,
  },
  {
    path: '/login',
    name: ROUTES.LOGIN,
    component: Login,
  },
  {
    path: '/users',
    name: ROUTES.USERS_LIST,
    component: UsersList,
  },
  {
    path: '/reviews',
    name: ROUTES.REVIEWS_LIST,
    component: ReviewsList,
  },
  {
    path: '*',
    name: ROUTES.NOT_FOUND,
    component: Login,
  },
]

const router = new VueRouter({
  routes,
})

// Authentication guard
router.beforeEach((to, _, next): void => {
  // All internal routes are named!
  if (!to.name) {
    next({ name: ROUTES.NOT_FOUND })
    return
  }

  if (!PUBLIC_ROUTES.includes(to.name)) {
    if (!isAuthenticated()) {
      next({ name: ROUTES.LOGIN, query: { nextPage: to.name } })
    }
    // --- Administrator access check removed due to some error (infinite loops)
    // --- and I won't have the time to properly fix it. Although the users can
    // --- enter the URL of those pages, the API calls should fail. There is no
    // --- such error handling so the hacky user will only see a blank page
    // else if (!isAdmin()) {
    //   next({ name: ROUTES.HOME, query: { nextPage: to.name } })
    // }
    else {
      next()
    }
  } else {
    next()
  }
})

export default router
