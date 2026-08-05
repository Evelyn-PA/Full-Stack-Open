import { useCounterStore } from "../store/store";

const Statistics = () => {
  const counterGood = useCounterStore((state) => state.counterGood);
  const counterBad = useCounterStore((state) => state.counterBad);
  const counterNeutral = useCounterStore((state) => state.counterNeutral);

  const good = counterGood;
  const neutral = counterNeutral;
  const bad = counterBad;
  const all = counterGood + counterBad + counterNeutral;
  const average = (good + bad * -1) / all;
  const positive = (good / all) * 100;

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
