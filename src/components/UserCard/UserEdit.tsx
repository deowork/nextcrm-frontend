import React, { useState } from 'react'
import UserEditForm from '@/components/UserCard/UserEditForm'
import { ActionIcon, Modal } from '@mantine/core'
import { Pencil } from 'tabler-icons-react'

export default function UserEdit({ user }) {
  const [editModalOpened, setEditModalOpened] = useState(false)

  const handleNameChange = () => {
    setEditModalOpened(false)
  }

  return (
    <ActionIcon>
      <Pencil size={16} onClick={() => setEditModalOpened(true)} />

      <Modal
        title="Edit user"
        size="md"
        data-id={user.id}
        shadow="xl"
        opened={editModalOpened}
        overlayBlur={3}
        overlayOpacity={0.55}
        onClose={() => setEditModalOpened(false)}>
        <UserEditForm onModal={handleNameChange} user={user} />
      </Modal>
    </ActionIcon>
  )
}
