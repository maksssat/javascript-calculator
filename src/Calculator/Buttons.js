const numbers = [
  {
    value: 7,
    id: "seven",
  },
  {
    value: 8,
    id: "eight",
  },
  {
    value: 9,
    id: "nine",
  },
  {
    value: 4,
    id: "four",
  },
  {
    value: 5,
    id: "five",
  },
  {
    value: 6,
    id: "six",
  },
  {
    value: 1,
    id: "one",
  },
  {
    value: 2,
    id: "two",
  },
  {
    value: 3,
    id: "three",
  },
  {
    value: 0,
    id: "zero",
  },
  {
    value: ",",
    id: "decimal",
  },
  {
    value: "=",
    id: "equals",
  },
];

const operators = [
  {
    value: "C",
    id: "clear",
  },
  {
    value: "/",
    id: "divide",
  },
  {
    value: "*",
    id: "multiply",
  },
  {
    value: "-",
    id: "subtract",
  },
  {
    value: "+",
    id: "add",
  },
];

export default function Buttons(props) {
  return (
    <div className="buttons">
      <div className="numbers">
        {numbers.map(({ value, id }) => {
          return (
            <button
              id={id}
              onClick={props.onNumberClick}
              value={value}
              key={id}
            >
              {value}
            </button>
          );
        })}
      </div>
      <div className="operators">
        {operators.map(({ id, value }) => {
          return (
            <button
              onClick={props.onOperatorClick}
              id={id}
              key={id}
              value={value}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}
