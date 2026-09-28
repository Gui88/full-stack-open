import { useState } from "react";

const calcTotal = (good, neutral, bad) => {
  return good + neutral + bad;
};

const calcAvg = (good, neutral, bad) => {
  return (good + bad * -1) / calcTotal(good, neutral, bad);
};

const calcPositivePct = (good, neutral, bad) => {
  return (good / calcTotal(good, neutral, bad)) * 100;
};

const FeedbackButton = (props) => {
  return <button onClick={props.onClick}> {props.text} </button>;
};

const StatisticLine = (props) => {
  const line = props.showPct ? (
    <>
      <td>{props.text}</td>
      <td>{props.value} %</td>
    </>
  ) : (
    <>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </>
  );
  return <tr>{line}</tr>;
};

// a proper place to define a component
const Statistics = ({ good, neutral, bad }) => {
  if (calcTotal(good, neutral, bad) > 0) {
    return (
      <>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={calcTotal(good, neutral, bad)} />
            <StatisticLine text="average" value={calcAvg(good, neutral, bad)} />
            <StatisticLine
              text="positive"
              value={calcPositivePct(good, neutral, bad)}
              showPct={true}
            />
          </tbody>
        </table>
      </>
    );
  } else {
    return "No feedback given";
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const titleFeedback = "give feedback";
  const titleStatistics = "statistics";

  const Title = (props) => {
    return <h1>{props.title}</h1>;
  };

  return (
    <div>
      <Title title={titleFeedback} />
      <FeedbackButton onClick={() => setGood(good + 1)} text="good" />
      <FeedbackButton onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <FeedbackButton onClick={() => setBad(bad + 1)} text="bad" />
      <Title title={titleStatistics} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};
export default App;
