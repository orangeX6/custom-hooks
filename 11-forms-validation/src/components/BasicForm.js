import useInputDemo from '../hooks/use-input-demo';
import validator from 'validator';

const BasicForm = (props) => {
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    inputChangeHandler: firstNameHandler,
    inputFocusHandler: firstNameFocusHandler,
    reset: resetFirstName,
  } = useInputDemo((value) => value !== '');

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    inputChangeHandler: lastNameHandler,
    inputFocusHandler: lastNameFocusHandler,
    reset: resetLastName,
  } = useInputDemo((value) => value !== '');

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputChangeHandler: emailHandler,
    inputFocusHandler: emailFocusHandler,
    reset: resetEmail,
  } = useInputDemo((value) => validator.isEmail(value));

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    console.log(`Submitted - ${firstName} ${lastName} ${email}`);

    resetFirstName();
    resetLastName();
    resetEmail();
  };

  const firstNameClasses = firstNameHasError
    ? 'form-control invalid'
    : 'form-control';

  const lastNameClasses = lastNameHasError
    ? 'form-control invalid'
    : 'form-control';

  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={firstName}
            onChange={firstNameHandler}
            onBlur={firstNameFocusHandler}
          />
          {firstNameHasError && (
            <p className="error-text">Please enter your first name</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            value={lastName}
            onChange={lastNameHandler}
            onBlur={lastNameFocusHandler}
          />
          {lastNameHasError && (
            <p className="error-text">Please enter your last name</p>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={emailHandler}
          onBlur={emailFocusHandler}
        />
        {emailHasError && (
          <p className="error-text">Please enter a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
