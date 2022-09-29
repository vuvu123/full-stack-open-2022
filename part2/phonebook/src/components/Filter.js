const Filter = ({ newFilter, filterName }) => {
  return (
    <div>
      filter shown with <input value={newFilter} onChange={filterName} />
    </div>
  )
}

export default Filter