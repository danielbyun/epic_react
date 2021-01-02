// React.memo for reducing unnecessary re-renders
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {useCombobox} from '../use-combobox'
import {getItems} from '../workerized-filter-cities'
import {useAsync, useForceRerender} from '../utils'

// 🐨 Memoize the Menu here using React.memo
const Menu = React.memo(function Menu({
  items,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectedItem,
}) {
  return (
    <ul {...getMenuProps()}>
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          getItemProps={getItemProps}
          item={item}
          index={index}
          isSelected={selectedItem?.id === item.id} // extra credit 2
          isHighlighted={highlightedIndex === index} // extra credit 2
        >
          {item.name}
        </ListItem>
      ))}
    </ul>
  )
})

const ListItem = React.memo(
  function ListItem({
    getItemProps,
    item,
    index,
    isSelected,
    isHighlighted,
    ...props
  }) {
    return (
      <li
        {...getItemProps({
          index,
          item,
          style: {
            fontWeight: isSelected ? 'bold' : 'normal',
            backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
          },
          ...props,
        })}
      />
    )
  },
  // (prevProps, nextProps) => {
  //   if (prevProps.getItemProps !== nextProps.getItemProps) return false
  //   if (prevProps.items !== nextProps.items) return false
  //   if (prevProps.index !== nextProps.index) return false
  //   if (prevProps.selectedItem !== nextProps.selectedItem) return false

  //   if (prevProps.highlightedIndex !== nextProps.highlightedIndex) {
  //     // determine if we care about this highlightedIndex change
  //     const wasPrevHighlighted = prevProps.highlightedIndex === prevProps.index

  //     const isNowHighlighted = nextProps.highlightedIndex === nextProps.index

  //     return wasPrevHighlighted === isNowHighlighted
  //   }

  //   return true
  // },
)
// 🐨 Memoize the ListItem here using React.memo

const App = () => {
  const forceRerender = useForceRerender()
  const [inputValue, setInputValue] = React.useState('')

  const {data: allItems, run} = useAsync({data: [], status: 'pending'})
  React.useEffect(() => {
    run(getItems(inputValue))
  }, [inputValue, run])
  const items = allItems.slice(0, 100)

  const {
    selectedItem,
    highlightedIndex,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    selectItem,
  } = useCombobox({
    items,
    inputValue,
    onInputValueChange: ({inputValue: newValue}) => setInputValue(newValue),
    onSelectedItemChange: ({selectedItem}) =>
      alert(
        selectedItem
          ? `You selected ${selectedItem.name}`
          : 'Selection Cleared',
      ),
    itemToString: item => (item ? item.name : ''),
  })

  return (
    <div className="city-app">
      <button onClick={forceRerender}>force rerender</button>
      <div>
        <label {...getLabelProps()}>Find a city</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps({type: 'text'})} />
          <button onClick={() => selectItem(null)} aria-label="toggle menu">
            &#10005;
          </button>
        </div>
        <Menu
          items={items}
          getMenuProps={getMenuProps}
          getItemProps={getItemProps}
          highlightedIndex={highlightedIndex}
          selectedItem={selectedItem}
        />
      </div>
    </div>
  )
}

export default App

/*
eslint
  no-func-assign: 0,
*/
