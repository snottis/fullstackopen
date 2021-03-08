import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const plussaa = (func, val) => func(val + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button func={() => plussaa(setGood, good)} text="good" />
      <Button func={() => plussaa(setNeutral, neutral)} text="neutral" />
      <Button func={() => plussaa(setBad, bad)} text="bad" />
      <h1>statistics</h1>
      <Statistics {...{ good, neutral, bad }} />
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={(good - bad) / all} />
        <StatisticLine text="positive" value={(good / all) * 100 + ' %'} />
      </tbody>
    </table>
  );
};

const Button = ({ text, func }) => {
  return <button onClick={func}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
