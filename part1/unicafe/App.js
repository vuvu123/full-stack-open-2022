import { useState } from "react"

const Header = ( {title} ) => <h1>{title}</h1>

const Button = ( {handleClick, text} ) => {
  return <button onClick={handleClick}>{text}</button>
}

const Statistics = ( { good, neutral, bad, totalFeedback, average, positivePercent, isFeedbackGiven } ) => {
  if (!isFeedbackGiven) return <div>No feedback given</div>
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={totalFeedback} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positivePercent + ' %'} />
      </tbody>
    </table>
  )
}

const StatisticLine = ( {text, value} ) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let totalFeedback = good + neutral + bad

  const addGoodFeedback = () => setGood(good + 1)
  const addNeutralFeedback = () => setNeutral(neutral + 1)
  const addBadFeedback = () => setBad(bad + 1)
  const isFeedbackGiven = () => !(good === 0 && neutral === 0 && bad === 0)
  const average = () => (good - bad) / totalFeedback
  const positivePercent = () => good / totalFeedback * 100

  return (
    <div>
      <Header title='give feedback' />
      <Button handleClick={addGoodFeedback} text='good' />
      <Button handleClick={addNeutralFeedback} text='neutral' />
      <Button handleClick={addBadFeedback} text='bad' />
      <Header title='statistics' />
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        totalFeedback={totalFeedback}
        average={average()}
        positivePercent={positivePercent()}
        isFeedbackGiven={isFeedbackGiven()}
         />
    </div>
  )
}

export default App