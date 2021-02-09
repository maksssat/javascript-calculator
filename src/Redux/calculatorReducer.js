import { OPERAND_ENTER, OPERATOR_ENTER } from "./types";

const initialState = {
  display: "0",
};

let map = new Map([
  ["+", 1],
  ["-", 1],
  ["*", 2],
  ["/", 2],
]);

export default function calculatorReducer(state = initialState, action) {
  const id = action.id;
  const value = action.value;
  const display = state.display;

  switch (action.type) {
    case OPERAND_ENTER:
      //обработка нажатий на знак равно
      if (id === "equals") {
        const polishNotationStack = [];
        const polishNotation = [];
        const output = [];
        const input = display.match(
          /((?<=\/|\*|-|\+)-\d+)|(\/|\*|-|\+)|(\d+\.\d+)|\d+/g
        );

        //приведение к обратной польской нотации
        for (let i = 0; i < input.length; i++) {
          if (/\d/.test(input[i])) {
            polishNotation.push(+input[i]);
          } else if (/\/|\*|-|\+/.test(input[i])) {
            while (
              map.get(input[i]) <= map.get(...polishNotationStack.slice(-1))
            ) {
              polishNotation.push(...polishNotationStack.splice(-1, 1));
            }
            polishNotationStack.push(input[i]);
            console.log(polishNotationStack);
          }
        }

        //массив обратной польской нотации
        const polishNotationResult = [
          ...polishNotation,
          ...polishNotationStack.reverse(),
        ];

        console.log(polishNotationResult);

        //вычисление результата из обратной польской нотации
        polishNotationResult.forEach((item) => {
          if (/\d/.test(item)) {
            output.push(item);
          } else {
            switch (item) {
              case "+":
                output.push(output.splice(-2).reduce((a, b) => a + b));
                break;
              case "-":
                output.push(output.splice(-2).reduce((a, b) => a - b));
                break;
              case "*":
                output.push(output.splice(-2).reduce((a, b) => a * b));
                break;
              case "/":
                output.push(output.splice(-2).reduce((a, b) => a / b));
                break;
              default:
                break;
            }
          }
        });

        console.log(output);

        return { ...state, display: output[0] };
      } else if (
        display.length > 13 ||
        (id === "decimal" && (/\.$/.test(display) || /\\.\d+$/.test(display)))
      ) {
        return state;
      } else if (id === "decimal" && /(\/|\*|-|\+)$/.test(display)) {
        return { ...state, display: `${display}0${value}` };
      } else if (display === "0" && id === "decimal") {
        return { ...state, display: `${display}${value}` };
      } else if (display === "0") {
        return { ...state, display: `${value}` };
      } else if (display !== "0") {
        return { ...state, display: `${display}${value}` };
      }
      break;

    case OPERATOR_ENTER:
      if (id === "clear") {
        return {
          display: "0",
        };
      } else if (display.length > 13) {
        return state;
      } else {
        switch (id) {
          case "divide":
            if (/\d(\/|\*|-|\+)+$/.test(display)) {
              return {
                ...state,
                display: display.replace(/(\/|\*|-|\+)+$/, "/"),
              };
            } else if (/\d$/.test(display) && display !== "0") {
              return { ...state, display: `${display}${value}` };
            } else return state;
          case "multiply":
            if (/\d(\/|\*|-|\+)+$/.test(display)) {
              return {
                ...state,
                display: display.replace(/(\/|\*|-|\+)+$/, "*"),
              };
            } else if (/\d$/.test(display) && display !== "0") {
              return { ...state, display: `${display}${value}` };
            } else return state;
          case "subtract":
            if (/(-|\+)$/.test(display)) {
              return { ...state, display: display.replace(/(-|\+)$/, "-") };
            } else if (display !== "0") {
              return { ...state, display: `${display}${value}` };
            } else if (display === "0") {
              return { ...state, display: "-" };
            } else return state;
          case "add":
            if (/\d(\/|\*|-|\+)+$/.test(display)) {
              return {
                ...state,
                display: display.replace(/(\/|\*|-|\+)+$/, "+"),
              };
            } else if (/\d$/.test(display) && display !== "0") {
              return { ...state, display: `${display}${value}` };
            } else return state;
          default:
            return state;
        }
      }
    default:
      return state;
  }
}
