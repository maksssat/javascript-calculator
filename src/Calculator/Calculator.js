import Buttons from "./Buttons";
import Display from "./Display";
import React, { useRef } from "react";

//определение приоритета операторов
let map = new Map([
  ["+", 1],
  ["-", 1],
  ["*", 2],
  ["/", 2],
]);

export default function Calculator() {
  const [display, setDisplay] = React.useState("0");
  const [result, setResult] = React.useState("");
  const [stack, setStack] = React.useState(["+", "-", "*", "/"]);
  const [polNot, setPolNot] = React.useState([]);
  const stackRef = useRef();
  stackRef.current = stack;

  //приведение к польской нотации
  function toPolishNotation(n) {
    if (/\d/.test(n)) {
      setPolNot([...polNot, n]);
    } /* else if (stack.length === 0) {
      setStack([n]);
    } */ else {
      // while (map.get(n) <= map.get(...stack.slice(-1))) {
      //   setPolNot([...polNot, ...stack.slice(-1)]);
      setStack(stackRef.current.slice(0, -1));
      //   console.log("test1");
      // }
      // setStack([...stack, n]);
      console.log(stackRef.current);
    }
    console.log(stack);
  }

  // обработка нажатии чисел, знака равно, запятой
  function handleNumberClick({ target }) {
    if (
      display.length > 13 ||
      (target.id === "decimal" && (/,$/.test(display) || /,\d+$/.test(display)))
    ) {
      return;
    } else if (target.id === "decimal" && /\/$|x$|-$|\+$/.test(display)) {
      setDisplay(`${display}0${target.value}`);
    } else if (display === "0" && target.id === "decimal") {
      setDisplay(`${display}${target.value}`);
    } else if (display === "0") {
      setDisplay(`${target.value}`);
      toPolishNotation(target.value);
    } else if (display !== "0") {
      setDisplay(`${display}${target.value}`);
      toPolishNotation(target.value);
    }
  }

  // обработка нажатий операторов
  function handleOperatorClick({ target }) {
    if (target.id === "clear") {
      setDisplay("0");
      setResult("");
      setStack([]);
      setPolNot([]);
    } else if (display.length > 13) {
      return;
    } else {
      switch (target.id) {
        case "divide":
          if (/\d(\/$|x$|-$|\+$)/.test(display)) {
            setDisplay(display.replace(/\/$|x$|-$|\+$/, "/"));
            toPolishNotation(target.value);
          } else if (/\d$/.test(display) && display !== "0") {
            setDisplay(`${display}${target.value}`);
            toPolishNotation(target.value);
          }
          break;
        case "multiply":
          if (/\d(\/$|x$|-$|\+$)/.test(display)) {
            setDisplay(display.replace(/\/$|x$|-$|\+$/, "x"));
            toPolishNotation(target.value);
          } else if (/\d$/.test(display) && display !== "0") {
            setDisplay(`${display}${target.value}`);
            toPolishNotation(target.value);
          }
          break;
        case "subtract":
          if (/-$|\+$/.test(display)) {
            setDisplay(display.replace(/-$|\+$/, "-"));
            toPolishNotation(target.value);
          } else if (display !== "0") {
            setDisplay(`${display}${target.value}`);
            toPolishNotation(target.value);
          }
          break;
        case "add":
          if (/\d(\/$|x$|-$|\+$)/.test(display)) {
            setDisplay(display.replace(/\/$|x$|-$|\+$/, "+"));
            toPolishNotation(target.value);
          } else if (/\d$/.test(display) && display !== "0") {
            setDisplay(`${display}${target.value}`);
            toPolishNotation(target.value);
          }
          break;
      }
    }
  }

  return (
    <div className="calculator">
      <Display display={display} result={result} />
      <Buttons
        onNumberClick={handleNumberClick}
        onOperatorClick={handleOperatorClick}
      />
    </div>
  );
}
