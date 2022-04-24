import {
  AddressBook,
  FileAnalytics,
  PresentationAnalytics,
  Users,
} from 'tabler-icons-react'

export const routes = [
  { label: 'Dashboard', link: '/dashboard', icon: PresentationAnalytics },
  { label: 'Orders', link: '/orders', notifications: 1, icon: FileAnalytics },
  { label: 'Contacts', link: '/contacts', icon: AddressBook },
  { label: 'Users', link: '/users', icon: Users },
]
