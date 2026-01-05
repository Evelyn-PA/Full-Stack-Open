import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const Button = (props) => (
    <button onClick={props.onClick}>{props.text}</button>
  )

  const Statistics = (props) => {
    const total = props.good + props.neutral + props.bad
    const average = total === 0 ? 0 : (props.good * 1 + props.neutral * 0 + props.bad * -1) / total
    const positive = total === 0 ? 0 : ((props.good / total) * 100)

    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive + "%"} />
        </tbody>

      </table>


    )
  }

  const StatisticLine = ({ text, value }) => (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>

  )
  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />

      <h1>Statistics</h1>
      {good + bad + neutral === 0 ? "No feedback given" :
        (<Statistics good={good} neutral={neutral} bad={bad} />)}
    </div>
  )
}

export default App
