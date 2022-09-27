import { useState } from "react"

const Header = ( {title} ) => <h1>{title}</h1>

const Button = ( {handleClick, text} ) => {
  return <button onClick={handleClick}>{text}</button>
}

const Statistic = ( {type, count} ) => <p>{type} {count}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGoodFeedback = () => {
    setGood(good + 1)
  }

  const addNeutralFeedback = () => setNeutral(neutral + 1)
  const addBadFeedback = () => setBad(bad + 1)

  return (
    <div>
      <Header title='give feedback' />
      <Button handleClick={addGoodFeedback} text='good' />
      <Button handleClick={addNeutralFeedback} text='neutral' />
      <Button handleClick={addBadFeedback} text='bad' />
      <Header title='statistics' />
      <Statistic type='good' count={good} />
      <Statistic type='neutral' count={neutral} />
      <Statistic type='bad' count={bad} />
    </div>
  )
}

export default App