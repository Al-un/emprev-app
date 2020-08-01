import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
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
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
]

const router = new VueRouter({
  routes,
})

// Authentication guard
router.beforeEach((to, from, next): void => {
  // All internal routes are named!
  if (!to.name) {
    next({ name: ROUTES.NOT_FOUND })
    return
  }

  if (!PUBLIC_ROUTES.includes(to.name)) {
    if (!isAuthenticated()) {
      next({ name: ROUTES.LOGIN, query: { nextPage: to.name } })
    }
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
