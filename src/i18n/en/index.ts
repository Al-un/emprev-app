import { LocaleMessageObject } from 'vue-i18n/types'

import vuetifyMsgs from './vuetify'

const msgs: LocaleMessageObject = {
  nav: {
    menu: {
      home: 'Home',
      users: {
        title: 'Users',
        list: 'Manage users',
      },
      reviews: {
        title: 'Reviews',
        list: 'Manage reviews',
      },
    },
    header: {
      logout: 'Logout',
    },
  },
  users: {
    login: {
      password: 'Password',
      submit: 'Submit',
      title: 'Login',
      username: 'Username',
    },
    form: {
      adminStatus: 'Administrator',
      cancel: 'Cancel',
      deletedStatus: 'Deleted user',
      password: 'Password',
      submit: {
        create: 'Create user',
        update: 'Update user',
      },
      title: {
        create: 'New user',
        update: 'Edit user',
      },
      username: 'Username',
    },
    list: {
      title: 'Users',
    },
  },
  reviews: {
    dashboard: {
      form: {
        cancel: 'Do it later',
        comment: 'Comment (*)',
        title: 'Employee review: {0}',
        submit: 'Submit review',
        subtitle: 'Period: {0}',
      },
      list: {
        description:
          'Once submitted, a review cannot be modified. Already submitted reviewed are displayed for reference only.',
        period: 'Period {0}',
        reviewed: 'To be reviewed employee: {0}',
        title: 'Reviews',
      },
    },
    mgmt: {
      title: 'All reviews',
      list: {
        comment: 'Comment',
        period: 'Period',
        reviewed: 'Reviewed',
        reviewer: 'Reviewer',
        score: 'Score',
      },
    },
    form: {
      new: {
        cancel: 'Cancel',
        period: 'Period',
        reviewed: 'Reviewed employee',
        reviewer: 'Reviewer employee',
        submit: 'Request review',
        title: 'New review request',
      },
    },
  },
  $vuetify: vuetifyMsgs,
}

export default msgs
