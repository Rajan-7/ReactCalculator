import { useReducer } from "react";
import Button from "./Button";
import OperationButton from "./OperationButton";
import "./style.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  DELETE_DIGIT: "delete-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  EVALUATE: "evaluate",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
  }
};

function App() {
  const [{ previousOperand, currentOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  )
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEl</button>

      <OperationButton operation="﹪" dispatch={dispatch} />
      <Button digit="1" dispatch={dispatch} />
      <Button digit="2" dispatch={dispatch} />
      <Button digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />

      <Button digit="4" dispatch={dispatch} />
      <Button digit="5" dispatch={dispatch} />
      <Button digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />

      <Button digit="7" dispatch={dispatch} />
      <Button digit="8" dispatch={dispatch} />
      <Button digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />

      <Button digit="." dispatch={dispatch} />
      <Button digit="0" dispatch={dispatch} />

      <button className="span-two">=</button>
    </div>
  );
}

export default App;
