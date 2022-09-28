const Total = ({ parts }) => {
  const total = parts.reduce((total, part) => {
    return total + part.exercises
  }, 0)

  return (
    <div>
      <p>
        <strong>Total of {total} exercises</strong>
      </p>
    </div>
  )
}

export default Total