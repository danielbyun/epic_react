// 🐨 here are the things you're going to need for this test:
import * as React from 'react'
import {
  render,
  screen,
  waitForLoadingToFinish,
  userEvent,
  logInAsUser,
} from 'test/app-test-utils'

import {App} from 'app'

import {buildBook, buildListItem} from 'test/generate'
import * as booksDB from 'test/data/books'
import * as listItemsDB from 'test/data/list-items'

import {formatDate} from 'utils/misc'

import {lorem} from 'faker'

const renderBookScreen = async ({user, book, listItem} = {}) => {
  if (user === undefined) {
    user = await logInAsUser()
  }

  if (book === undefined) {
    book = await booksDB.create(buildBook())
  }

  if (listItem === undefined) {
    listItem = await listItemsDB.create(buildListItem({owner: user, book}))
  }

  const route = `book/${book.id}`

  const utils = await render(<App />, {route, user})
  return {...utils, user, book, listItem}
}

test('renders all the book information', async () => {
  const {book} = await renderBookScreen({listItem: null})

  // trick the application to think we're logged in + render book page
  // screen.debug()

  expect(screen.getByRole('heading', {name: book.title})).toBeInTheDocument()
  expect(screen.getByText(book.author)).toBeInTheDocument()
  expect(screen.getByText(book.publisher)).toBeInTheDocument()
  expect(screen.getByText(book.synopsis)).toBeInTheDocument()
  expect(screen.getByRole('img', {name: /book cover/i})).toHaveAttribute(
    'src',
    book.coverImageUrl,
  )
  expect(screen.getByRole('button', {name: /add to list/i})).toBeInTheDocument()
  expect(
    screen.queryByRole('button', {name: /remove from list/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('button', {name: /mark as read/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('button', {name: /mark as unread/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('textarea', {name: /notes/i}),
  ).not.toBeInTheDocument()
  expect(screen.queryByRole('radio', {name: /star/i})).not.toBeInTheDocument()
  expect(screen.queryByLabelText(/start date/i)).not.toBeInTheDocument()
})

test('can create a list item for the book', async () => {
  await renderBookScreen({listItem: null})

  const addToListButton = screen.getByRole('button', {name: /add to list/i})
  userEvent.click(addToListButton)
  expect(addToListButton).toBeDisabled()

  await waitForLoadingToFinish()

  const startDateNode = screen.getByLabelText(/start date/i)
  expect(startDateNode).toHaveTextContent(formatDate(new Date()))

  expect(
    screen.getByRole('button', {name: /mark as read/i}),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('button', {name: /remove from list/i}),
  ).toBeInTheDocument()
  expect(screen.getByRole('textbox', {name: /notes/i})).toBeInTheDocument()
  expect(
    screen.queryByRole('button', {name: /add to list/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('button', {name: /mark as unread/i}),
  ).not.toBeInTheDocument()
  expect(screen.queryByRole('radio', {name: /star/i})).not.toBeInTheDocument()

  // screen.debug()
})

test('can remove a list item for the book', async () => {
  await renderBookScreen()

  const removeListButton = screen.getByRole('button', {
    name: /remove from list/i,
  })
  userEvent.click(removeListButton)
  expect(removeListButton).toBeDisabled()

  await waitForLoadingToFinish()

  expect(screen.getByRole('button', {name: /add to list/i})).toBeInTheDocument()

  expect(
    screen.queryByRole('button', {name: /remove from list/i}),
  ).not.toBeInTheDocument()

  // screen.debug()
})

test('can mark a list item as read', async () => {
  const {listItem} = await renderBookScreen()
  await listItem.update(listItem.id, {finishDate: null})

  const markAsReadButton = screen.getByRole('button', {
    name: /mark as read/i,
  })
  userEvent.click(markAsReadButton)
  expect(markAsReadButton).toBeDisabled()

  await waitForLoadingToFinish()

  expect(
    screen.getByRole('button', {name: /mark as unread/i}),
  ).toBeInTheDocument()
  expect(screen.getAllByRole('radio', {name: /star/i})).toHaveLength(5)

  const startAndFinishDateNode = screen.getByLabelText(/start and finish date/i)
  expect(startAndFinishDateNode).toHaveTextContent(
    `${formatDate(listItem.startDate)} — ${formatDate(Date.now())}`,
  )

  expect(
    screen.queryByRole('button', {name: /mark as read/i}),
  ).not.toBeInTheDocument()

  // screen.debug()
})

test('can edit a note', async () => {
  // fake the timer
  jest.useFakeTimers()

  const {listItem} = await renderBookScreen()

  const newNotes = lorem.words()
  const notesTextarea = screen.getByRole('textbox', {name: /notes/i})

  userEvent.clear(notesTextarea)
  userEvent.type(notesTextarea, newNotes)

  await screen.findByLabelText(/loading/i)

  await waitForLoadingToFinish()

  expect(notesTextarea).toHaveValue(newNotes)

  expect(await listItemsDB.read(listItem.id)).toMatchObject({
    notes: newNotes,
  })
})
