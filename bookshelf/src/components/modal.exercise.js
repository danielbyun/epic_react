import React from 'react'

// 🐨 you're going to need the Dialog component
// It's just a light wrapper around ReachUI Dialog
// 📜 https://reacttraining.com/reach-ui/dialog/
import {CircleButton, Dialog} from './lib'

// 💰 Here's a reminder of how your components will be used:
/*
<Modal>
  <ModalOpenButton>
    <button>Open Modal</button>
  </ModalOpenButton>
  <ModalContents aria-label="Modal label (for screen readers)">
    <ModalDismissButton>
      <button>Close Modal</button>
    </ModalDismissButton>
    <h3>Modal title</h3>
    <div>Some great contents of the modal</div>
  </ModalContents>
</Modal>
*/

// we need this set of compound components to be structurally flexible
// meaning we don't have control over the structure of the components. But
// we still want to have implicitly shared state, so...
// 🐨 create a ModalContext here with React.createContext

// 🐨 create a Modal component that manages the isOpen state (via useState)
// and renders the ModalContext.Provider with the value which will pass the
// isOpen state and setIsOpen function

// 🐨 create a ModalDismissButton component that accepts children which will be
// the button which we want to clone to set it's onClick prop to trigger the
// modal to close
// 📜 https://reactjs.org/docs/react-api.html#cloneelement
// 💰 to get the setIsOpen function you'll need, you'll have to useContext!
// 💰 keep in mind that the children prop will be a single child (the user's button)

// 🐨 create a ModalOpenButton component which is effectively the same thing as
// ModalDismissButton except the onClick sets isOpen to true

// 🐨 create a ModalContents component which renders the Dialog.
// Set the isOpen prop and the onDismiss prop should set isOpen to close
// 💰 be sure to forward along the rest of the props (especially children).

// 🐨 don't forget to export all the components here
import VisuallyHidden from '@reach/visually-hidden'

const callAll = (...functions) => (...args) =>
  functions.forEach(fn => fn && fn(...args))

const ModalContext = React.createContext()
ModalContext.displayName = 'ModalContext'

const Modal = props => {
  const [isOpen, setIsOpen] = React.useState(false)
  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

const ModalDismissButton = ({children: child}) => {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    // onClick: (...args) => {
    //   setIsOpen(false)
    //   if (child.props.onClick) {
    //     child.props.onClick(...args)
    //   }
    // },
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

const ModalOpenButton = ({children: child}) => {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}

const ModalContentsBase = props => {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  )
}

const ModalContents = ({title, children, ...props}) => {
  return (
    <ModalContentsBase {...props}>
      <div
        css={{
          display: 'flex',
          justifyContent: 'flex-end',
          border: '1px solid red',
        }}
      >
        <ModalDismissButton>
          {/* 💰 here's what you should put in your <ModalDismissButton> */}
          <CircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>
        </ModalDismissButton>
      </div>
      <h3 css={{textAlign: 'center', fontSize: '2em'}}>{title}</h3>
      {children}
    </ModalContentsBase>
  )
}

export {
  Modal,
  ModalDismissButton,
  ModalOpenButton,
  ModalContentsBase,
  ModalContents,
}
