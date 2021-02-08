import { OPERAND_ENTER, OPERATOR_ENTER } from "./types";

export function operandEnter(id, value) {
  return { type: OPERAND_ENTER, id, value };
}

export function operatorEnter(id, value) {
  return { type: OPERATOR_ENTER, id, value };
}
