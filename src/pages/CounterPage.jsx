import Counter from "../components/Counter";
import ClassCounter from "../components/ClassCounter";

const CounterPage = () => {
  return (
    <div style={{textAlign: 'center', fontSize: 15}}>
      <h1>Functional Counter</h1>
      <Counter />
      <h1>Class Counter</h1>
      <ClassCounter />
    </div>
  );
};

export default CounterPage;
