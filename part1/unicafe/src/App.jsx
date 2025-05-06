import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.onClick} >{props.text} </button>
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};


const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  if (all === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average.toFixed(1)} />
      <StatisticLine text="positive" value={positive.toFixed(1) + " %"} />
    </table>
  );
};


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const IncrementGood = () => {
    console.log(IncrementGood)
    setGood(good+1)
  }

  const IncrementNeutral = () => {
    console.log(IncrementNeutral)
    setNeutral(neutral+1)
  }

  const IncrementBad = () => {
    console.log(IncrementBad)
    setBad(bad+1)
  }

    return (
      <div>
        <h1> give feedback </h1>
          <Button onClick={IncrementGood} text="good"/>
          <Button onClick={IncrementNeutral} text="neutral"/>
          <Button onClick={IncrementBad} text="bad" />
          <h1> statistic </h1>
          <Statistics good={good} neutral={neutral} bad={bad} />  
        </div>
          )
}

export default App