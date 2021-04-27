// 🐨 you're gonna need this stuff:
import React from 'react'
import {render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Modal, ModalContents, ModalOpenButton} from '../modal'

test('can be opened and closed', () => {
  const label = 'Modal Label'
  const title = 'Modal Title'
  const content = 'Modal Content'

  render(
    <Modal>
      <ModalOpenButton>
        <button>Open</button>
      </ModalOpenButton>
      <ModalContents aria-label={label} title={title}>
        <div>Modal Content</div>
      </ModalContents>
    </Modal>,
  )
  userEvent.click(screen.getByRole('button', {name: /open/i}))

  const modal = screen.getByRole('dialog')
  expect(modal).toHaveAttribute('aria-label', label)

  const inModal = within(modal)
  expect(inModal.getByRole('heading', {name: title})).toBeInTheDocument()
  expect(inModal.getByText(content)).toBeInTheDocument()

  userEvent.click(inModal.getByRole('button', {name: /close/i}))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
// 🐨 render the Modal, ModalOpenButton, and ModalContents
// 🐨 click the open button
// 🐨 verify the modal contains the modal contents, title, and label
// 🐨 click the close button
// 🐨 verify the modal is no longer rendered
// 💰 (use `query*` rather than `get*` or `find*` queries to verify it is not rendered)
