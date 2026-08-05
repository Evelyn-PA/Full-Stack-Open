import { useCounterStore } from "../store/store";

const Buttons = () => {
  const { incrementGood, incrementBad, incrementNeutral } = useCounterStore(
    (state) => state.actions,
  );
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
    </div>
  );
};

export default Buttons;
