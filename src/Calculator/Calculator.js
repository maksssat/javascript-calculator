import Buttons from "./Buttons";
import Display from "./Display";
import React from "react";

export default function Calculator() {
  return (
    <div className="calculator">
      <Display />
      <Buttons />
    </div>
  );
}
