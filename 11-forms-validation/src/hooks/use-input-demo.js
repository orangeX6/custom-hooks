import { useState } from 'react';

const useInputDemo = (validate) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validate(value);
  const valueHasError = !valueIsValid && isTouched;

  const inputChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const inputFocusHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setIsTouched(false);
    setValue('');
  };

  return {
    value,
    isValid: valueIsValid,
    hasError: valueHasError,
    inputChangeHandler,
    inputFocusHandler,
    reset,
  };
};

export default useInputDemo;
