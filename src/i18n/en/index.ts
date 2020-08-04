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
  common: {
    form: {
      required: 'This is a required field',
    },
  },
  users: {
    login: {
      error: 'Hmmm...login has failed somewhere.',
      loading: 'Login...',
      password: 'Password',
      submit: 'Submit',
      success: 'Login successful! Redirecting soon...',
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
      description:
        'An user password cannot be changed nor reset. Make sure you input the correct password!',
    },
  },
  reviews: {
    dashboard: {
      form: {
        cancel: 'Do it later',
        comment: 'Comment (*)',
        description:
          'A performance review is not about judging your peers but help them to improve. Please provide honest and constructive ouputs to improve everyone daily lives. And don\'t forget that "violence is the last refuge of the incompetent".',
        title: 'Employee review: {0}',
        score: 'Score {0} / 5',
        submit: 'Submit review',
        subtitle: 'Period: {0}',
      },
      list: {
        description:
          'Once submitted, a review cannot be modified. Already submitted reviewed are displayed for reference only.',
        empty:
          'There is currently no review for you. Ask an admin to create a review request',
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
