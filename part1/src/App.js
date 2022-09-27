import { useState } from "react"

const Header = ( {title} ) => <h1>{title}</h1>

const Button = ( {handleClick, text} ) => {
  return <button onClick={handleClick}>{text}</button>
}

const Statistics = ( {type, count} ) => <div>{type} {count}</div>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGoodFeedback = () => setGood(good + 1)
  const addNeutralFeedback = () => setNeutral(neutral + 1)
  const addBadFeedback = () => setBad(bad + 1)

  let totalFeedback = good + neutral + bad

  const average = () => {
    if (good === 0 && neutral === 0 && bad === 0) return 0
    return (good - bad) / totalFeedback
  }

  const positivePercent = () => {
    if (good === 0 && neutral === 0 && bad === 0) return 0
    return good / totalFeedback * 100
  }

  return (
    <div>
      <Header title='give feedback' />
      <Button handleClick={addGoodFeedback} text='good' />
      <Button handleClick={addNeutralFeedback} text='neutral' />
      <Button handleClick={addBadFeedback} text='bad' />
      <Header title='statistics' />
      <Statistics type='good' count={good} />
      <Statistics type='neutral' count={neutral} />
      <Statistics type='bad' count={bad} />
      <Statistics type='all' count={totalFeedback} />
      <Statistics type='average' count={average()} />
      <Statistics type='positive' count={positivePercent() + '%'} />
    </div>
  )
}

export default App