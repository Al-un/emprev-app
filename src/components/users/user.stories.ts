import { storiesOf } from '@storybook/vue'
import { object } from '@storybook/addon-knobs'

import { User } from '@/models'

import UserCard from './UserCard.vue'
import UserCardAdd from './UserCardAdd.vue'
import UserForm from './UserForm.vue'
import UserGrid from './UserGrid.vue'

const mockUser: User = {
  id: '123',
  username: 'SomeUsername',
  isAdmin: false,
  isDeleted: false,
}

storiesOf('Users', module)
  .add('UserCard', () => ({
    template: `<user-card :user="user" />`,
    components: { UserCard },
    props: {
      user: {
        default: object('User', mockUser),
      },
    },
  }))
  .add('UserCardAdd', () => ({
    template: `<user-card-add />`,
    components: { UserCardAdd },
  }))
  .add('UserForm', () => ({
    template: `<div>
      <user-form v-model="user" @submit="submit" @cancel="cancel"/>
      <div>User data: {{ user }}</div>
    </div>`,
    components: { UserForm },
    data() {
      return { user: mockUser }
    },
    methods: {
      cancel: () => window.alert('Cancelled'),
      submit: () => window.alert(`Submitted`),
    },
  }))
  .add('UserList', () => ({
    template: `<user-grid :users="users"/>`,
    components: { UserGrid },
    props: {
      users: {
        default: object('Users', [
          { username: 'John Doe', isAdmin: false, isDeleted: false },
          { username: 'Marisa Kirisame', isAdmin: false, isDeleted: false },
          { username: 'Reimu Hakurei', isAdmin: false, isDeleted: false },
          { username: 'Suika Ibuki', isAdmin: false, isDeleted: false },
          { username: 'Remilia Scarlet', isAdmin: false, isDeleted: false },
        ]),
      },
    },
  }))
