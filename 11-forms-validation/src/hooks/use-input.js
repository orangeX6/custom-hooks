import { useReducer } from 'react';

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case 'VALUE_ENTERED':
      return { ...state, enteredValue: action.payload };
    case 'TOUCHED':
      return { ...state, isTouched: true };
    case 'RESET':
      return { ...initialState };
    default:
      return initialState;
  }
};

const initialState = {
  enteredValue: '',
  isTouched: false,
};

const useInput = (validateValue) => {
  const [state, dispatch] = useReducer(inputStateReducer, initialState);

  const { enteredValue, isTouched } = state;

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    // setEnteredValue(e.target.value);
    dispatch({ type: 'VALUE_ENTERED', payload: e.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'TOUCHED' });
  };

  const reset = () => {
    // setEnteredValue('');
    // setIsTouched(false);
    dispatch({ type: 'RESET' });
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    reset,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
