import { LocaleMessageObject } from "vue-i18n/types";

import vuetifyMsgs from "./vuetify";

const msgs: LocaleMessageObject = {
  nav: {
    menu: {
      home: "Home",
      users: {
        title: "Users",
        list: "Manage users"
      },
      reviews: {
        title: "Reviews",
        list: "Manage reviews"
      }
    },
    header: {
      logout: "Logout"
    }
  },
  $vuetify: vuetifyMsgs
};

export default msgs;
