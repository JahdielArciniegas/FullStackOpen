import { useState } from "react";

const Statistics = (props) => {
  return (
    <div>
      <h1>Statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.good + props.neutral + props.bad}</p>
      <p>
        Average{" "}
        {(1 * props.good + 0 * props.neutral + -1 * props.bad) /
          (props.good + props.neutral + props.bad)}
      </p>
      <p>
        Positive {(props.good * 100) / (props.good + props.neutral + props.bad)}
        %
      </p>
    </div>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
