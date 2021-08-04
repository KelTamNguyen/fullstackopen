import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0);

  const handleFeedback = (feedback) => () => {
    switch (feedback) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1)
        break;
      default:
    }
    setAll(all + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button name='good' onClick={handleFeedback('good')} />
      <Button name='neutral' onClick={handleFeedback('neutral')} />
      <Button name='bad' onClick={handleFeedback('bad')} />
      <h1>statistics</h1>
      {all === 0 ? 
      <p>No feedback given</p> : 
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
      />}
    </div>
  )
}

const Button = ({ name, onClick }) => {
  return (
    <button onClick={onClick}>{name}</button>
  );
}

const Statistics = ({ good, neutral, bad, all }) => {
  return(
    <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={(good - bad)/(good + neutral + bad)} />
          <StatisticLine text='positive' value={`${(good/all) * 100}%`} />
        </tbody>
      </table>
  );
}

const StatisticLine = ({ text, value }) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

export default App