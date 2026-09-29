import { useState } from "react";

const RandomNumberGenerator = (max) => {
  return Math.floor(Math.random() * max);
};

const ButtonComponent = (props) => {
  return <button onClick={props.onClick}> {props.text} </button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const [selected, setSelected] = useState(0);
  const titleDay = "Anecdote of the day";
  const titleVotes = "Anecdote with most votes";
  const [highestVoted, setHighestVoted] = useState(0);

  const AddVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    if (newVotes[selected] > newVotes[highestVoted]) {
      setHighestVoted(selected);
    }
    setVotes(newVotes);
  };

  const Title = (props) => {
    return <h1>{props.title}</h1>;
  };

  return (
    <div>
      <Title title={titleDay} />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <ButtonComponent onClick={AddVote} text="vote" />
      <ButtonComponent
        onClick={() => setSelected(RandomNumberGenerator(anecdotes.length))}
        text="next anecdote"
      />
      <Title title={titleVotes} />
      <p>{anecdotes[highestVoted]}</p>
    </div>
  );
};

export default App;
