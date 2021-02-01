import Buttons from "./Buttons";
import Display from "./Display";
import React from "react";

export default function Calculator() {
  const [display, setDisplay] = React.useState("0");
  const [result, setResult] = React.useState("");

  function handleNumberClick({ target }) {
    if ((/,/.test(display) && target.id === "decimal") || display.length > 13) {
      return;
    } else if (
      (display === "0" && target.id === "decimal") ||
      display !== "0"
    ) {
      setDisplay(`${display}${target.value}`);
    } else if (display === "0") {
      setDisplay(`${target.value}`);
    }
  }

  function handleOperatorClick({ target }) {
    if (target.id === "clear") {
      setDisplay("0");
    } else if (display.length > 13) {
      return;
    } else {
      switch (target.id) {
        case "divide":
          if (/\/$|\*$|-$|\+$/.test(display)) {
            setDisplay(display.replace(/\/$|\*$|-$|\+$/, "/"));
          } else {
            setDisplay(`${display}${target.value}`);
          }
          break;
        case "multiply":
          if (/\/$|\*$|-$|\+$/.test(display)) {
            setDisplay(display.replace(/\/$|\*$|-$|\+$/, "*"));
          } else {
            setDisplay(`${display}${target.value}`);
          }
          break;
        case "subtract":
          if (/-$|\+$/.test(display)) {
            setDisplay(display.replace(/-$/, "-"));
          } else {
            setDisplay(`${display}${target.value}`);
          }
          break;
        case "add":
          if (/\/$|\*$|-$|\+$/.test(display)) {
            setDisplay(display.replace(/\/$|\*$|-$|\+$/, "+"));
          } else {
            setDisplay(`${display}${target.value}`);
          }
          break;
        default:
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
