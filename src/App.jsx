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
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: payload.digit,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          operation: payload.operation,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }
      return {
        ...state,
        operation: null,
        overwrite:true,
        currentOperand: evaluate(state),
        previousOperand: null,
      };
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          overwrite:false,
          currentOperand:null
        }
      }
      if (state.currentOperand == null) return state;
      if(state.currentOperand.length === 1){
        return {...state,currentOperand:null}
      }
      return{
        ...state,
        currentOperand:state.currentOperand.slice(0,-1)
      }
    case ACTIONS.CLEAR:
      return {};
  }
};

// Evaluate function
function evaluate({ previousOperand, currentOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return "";
  let result = "";
  switch (operation) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "%":
      result = prev / curr;
      break;
  }
  return result.toString();
}

// Digits formater
const formatter = new Intl.NumberFormat("en-us",{
  maximumFractionDigits:0
})

function operandFormat(operand){
  if(operand == null) return
  const [int,dec] = operand.split('.')
  if(dec == null) return formatter.format(int)
  return `${formatter.format(int)}.${dec}`

}

function App() {
  const [{ previousOperand, currentOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {operandFormat(previousOperand)}
          {operation}
        </div>
        <div className="current-operand">{operandFormat(currentOperand)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>

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

      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
