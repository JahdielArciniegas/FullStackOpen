import { useState } from "react";

const StatistcLine = (props) => (
  <p>
    {props.text} {props.value}
  </p>
);

const Statistics = (props) => {
  const render = props.good + props.neutral + props.bad;
  const total = props.good + props.neutral + props.bad;
  const average = (1 * props.good + 0 * props.neutral + -1 * props.bad) / total;
  const positive = (props.good * 100) / total;
  if (render === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <div>
        <h1>Statistics</h1>
        <StatistcLine text={"good"} value={props.good} />
        <StatistcLine text={"neutral"} value={props.neutral} />
        <StatistcLine text={"bad"} value={props.bad} />
        <StatistcLine text={"total"} value={total} />
        <StatistcLine text={"average"} value={average} />
        <StatistcLine text={"positive"} value={positive + "%"} />
      </div>
    );
  }
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => setGood(good + 1);
  const handleClickNeutral = () => setNeutral(neutral + 1);
  const handleClickBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleClickGood} text={"Good"} />
      <Button handleClick={handleClickNeutral} text={"Neutral"} />
      <Button handleClick={handleClickBad} text={"Bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
