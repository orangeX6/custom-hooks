/*


#hooks 
-> useState
-> useEffect
-> useContext
-> useReducer 
-> useCallBack
-> useMemo
-> useRef
-> useImperativeHandle

# RULES OF HOOKS 
>>  1.1 Only call react hooks in react functions
>>  1.2 Custom hooks 
>>  2.1 Only call React Hooks at the top level 
>>  3. In useEffect() - ALWAYS ADD everything you refer to inside of useEffect as a dependency unless there is a good reason not to. (eg - only call useEffect on initial state render)

#   useReducer
-> const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn)
>> useReducer is a good replacement of useState when you have two states that belong together and/or if you have state updates that depends on other state

>> useReducer just like useState returns 2 arrays. The function on the useReducer hook dispatches a new action(i.e a trigger an update of the state)
>> The action will be consumed by the first argument you pass to the useReducer

>> reducerFn --> (prevState, action) => newState 
>> A function that is triggered automatically once an action is dispatched   (via dispatchFn()) - it receives the latest state snapshot and should return the new, updated state

>> initialState - to set initial State
>> initFn - a function to set the initial state programmatically


# useCallback hook
->> useCallback is a hook that allows us to basically store a function across component executions.
>> So it basically allows us to tell React that we want to save a function and that this function should not be recreated with every execution.

? what useCallback does behind the scene
>> let obj1 = {}
->> undefined
>> let obj2={}
->> undefined
>> obj1 === obj2
->> false
>> obj2 = obj1
->> {}
>> obj1 === obj2
->> true

->> Use callBack requires 2 arguments - 
>> The function which should not be recreated
>> An array of dependencies for the callback call. The dependencies are same as that for useEffect



#useRef, useImperativeHandle hooks and forwardRefs function
# useRef 
>> useRef creates a reference to the DOM element to access the values and methods of that element 
>> ref hook is supported on all built in html components
>> eg 
const inputRef = useRef()

useEffect(()=> {
  inputRef.current.focus() //got access to js focus method on HTML input element
},[])

return (
  <div>
    <input ref={inputRef} />
  </div>
)

# useImperativeHandle 
->-------------------------------------------
>> NOTE - Avoid using this approach at all cost
->-------------------------------------------
-> useImperativeHandle hook, has a strange name, is a hook that allows us to use Component or functionalities from inside this Component imperatively, which simply means not through the regular state props management, not by controlling the Component through state in the parent Component, but instead by directly calling or manipulating something in the Component programmatically.
-> Takes 2 arguments - refs, f()
IMPORTANT - in our Component function argument list, we have always just worked with props and in 99.9% of cases, that is all you will need. However, there technically also is a second argument you can accept and that's a ref.
>> ref - takes the reference
>> func - should return object. (Contain all the external data and bind it to internal func)

 //Focus points to an internal function activate
useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  //activate func
useImperativeHandle(ref, () => { 
   const activate = () => {
    inputRef.current.focus();
  };
  
#forwardRefs
>>In order to enable this second argument here, we need to export our Component function in a special way. We need to wrap it with something, and it's called forwardRef. 
>> And that is basically a function which we execute, to which we pass our Component function. 
>> So our Component function is now the first argument to forwardRef and forwardRef returns a React Component, so Input still is a React Component but a React Component that is capable of being bound to a ref. 

EXAMPLE
import React, { useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.emailIsValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        ref={inputRef}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

# useMemo Hook
-> useMemo basically allows you to memoize, so basically that means to store, any kind of data which you want to store, just like useCallback does it for functions.
>> Now, just like useCallback, useMemo wants a second argument which is an array of dependencies, basically to ensure that this stored value is updated whenever one of the values you're using in there changes.
-------------------------------------------------
-------------------------------------------------
-------------------------------------------------
-------------------------------------------------
-------------------------------------------------
-------------------------------------------------
-------------------------------------------------

# importing React, whats called behind the scenes - 
# when we use jsx the following code is executed behind the scenes
return React.createElement(element, attribute arguments, content between opening and closing tags )

Example -
-> import React from 'react'
->import Expenses from './Expenses'
->
->JSX ->
->return (
->  <div>
->    <h2> Let's get started</h2>
->    <Expenses items={expenses} />
->  </div>
->)
->
->BEHIND THE SCENES ->
->return React.createElement(
->  'div',
->  {}, 
->  React.createElement('h2',{},'Let'\s get started')
->  React.createElement(Expenses, {items: expenses})
->  )

-> useState 
-> if your state update depends on the previous state, the following
>> useState gives access to a prevState variable which holds the previous state of the object we are updating 

 const [userInput, setUserInput] = useState({
    title: '',
    amount: '',
    date: '',
  });


  const titleChange = e => {
    setUserInput((prevState)=>{
    return {...prevState, title: e.target.value}
  })
  }

  // if you are setting style prop as background-color which has a (-) dash in it, make sure to define it in either of the two ways
//-> {'background-color':'red'}
//->{backgroundColor:'red'}



# TAGGED TEMPLATE LITERAL SYNTAX
-> Its a javascript feature 
->>  const Button = styled.button``
>> button is simply a method on styled object. Style object is an object we are importing from style components and there we can access the button method.
-> its just a special kind of method,, which we call with `` instead of ().

# CSS Modules 
>>What CSS Modules does or what this concept of CSS Modules does is it takes those CSS classes and a CSS file and basically changes those class names to be unique.

>> Importing css module file 
-> import styles from './Button.module.css';

-> Naming a module file 
>>Button.module.css


# workarounds around using jsx. 
-> if we want to render multiple components we usually wrap them in a <div>. This will create unnecessary divs rendered in the final output. So we can use - 

-> 1.
Arrays -
return (
    [
        <Form />,
        <Button/>
    ]
)


-> 2. Wrapper component 
const Wrapper = props => {
    return props.children;
}
export default Wrapper;

-> 3. React Fragment
<></> or <React.Fragment></React.Fragment>


# PORTAL
-> With portal you can display a div as a sibling to the root div and not a children to root div. This is useful while building modal like components

# REACT CONTEXT (CONTEXT API)
-> React Context allows us to manage State behind the scenes in React, such that we are able to directly change it from any component in our App and directly pass it to any component in our app without building a prop chain.

>>  defining context
const authContext = React.createContext({isLoggedIn:false})

export default AuthContext

>> Providing context 
? Providing means that you wrap in JSX code all the components that should be able to tap into that Context. Any component thats not wrapped will not be able to listen to the context component
<ContextName.Provider>
  <ComponentWhoWantsToAccessContext />
</ContextName.Provider>

>>Listening to Context
? To get access to the context value we have to listen to it and we can do that in 2 ways - 
->  AuthContext Consumer
->  React Hook

>> We can also add A custom context provider component in context api 

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

The data in object we create using React.createContext can be a dummy data which explains the structure of the context. 

->> CONTEXT LIMITATIONS 
>> Where to use Props vs Context
-> Props for configuration, context for state management across the app
>> React Context is NOT OPTIMIZED for high frequency changes
>> React context also should not be used to replace ALL component communications and props



# How react works
-> React 
>> A js library for building user interfaces
                      Context (Component wide data)
                        ⬇️
   Props ->           Components     -> ReactDOM (What the user sees) 
 (Data from parent component) ⬆️
                            State (Internal Data)
-> ReactDOM 
>> Interface to the web

->> HoW REACT WORKS 
->>  Components                ->        Real  DOM  (What user sees)
>>     ⬆️                                      How?
->>  React                     ->                ReactDOM
>> React determines how the           |  ReactDOM receives the   
>> component tree currently looks     | difference and then
>> like and what it should look like  | manipulate the real DOM

-> Re-evaluating a component and re-running its component function is not the same as re-rendering the real Dom or manipulating the real Dom.

>>  Components                                  RealDOM
      ⬆️                                         ⬆️
>>  Re-evaluated whenever props,        Changes to the Real DOM are
>> state or context changes     <-->    only made for differences
>>  React executes component            between evaluations
>> function

>> Reevaluating components which wont change will of-course cause some performance toll


->> Preventing unnecessary Re-evaluations with React.memo()
>> Wrap the component which you want to render only when its state is changed in React.memo while exporting 

>> export default React.memo(DemoOutput)

? Why aren't we using that on all components if it allows us to optimize them? 
>> Because this optimization comes at a cost. The memo method here tells React that whenever the App component changed, it should go to this component here and compare the new prop values to the previous prop values, so therefore React needs to do two things. It needs to store the previous prop values, and it needs to make that comparison. And that, of course, also has its own performance cost. And it, therefore, greatly depends on the component you're applying this to whether it's worth it or not because you're trading the performance cost of re-evaluating the component for the performance cost of comparing props. And it's impossible to say which cost is higher because it depends on the number of props you have and on the complexity of your component and the number of child components your component has. Of course, React.memo can be a great tool if you have a huge component tree with a lot of child components. And on a high level in the component tree, you can avoid unnecessary re-render cycles for the entire branch of the component tree. 

>> React memo wont directly work on non primitive types of js like function,obj and arrays. The solution is using the useCallback hook



# 13 Class based components - 
-> Note - You SHOULD use and MUST use class based components if you are working with error boundaries. 

# Error Boundaries -
>> Sometimes something goes wrong in your applications
>> Sometimes there are errors which you can't prevent or which are simply being used to transport information that something went wrong from one part of the application to another part.
! REFER TO INTRODUCING ERROR BOUNDARIES (CHAPTER 171 (number Might change in future))

#REDUX 
-> Redux is a state management system for cross-component or app-wide state.

# Redux vs Context
-> React context has a few potential disadvantages. 
>> Complex Setup - multiple contexts will lead to deeply nested jsx. Writing a single context file and using all the contexts in it will make the file difficult to manage

>> Performance - Context is great for low frequency changes but not good for high frequency changes ( Not a replacement for flux-like state propagation (eg.redux))

# HOW REDUX WORKS ? 
-> Redux is all about having one central data(state) store for your entire application. 

    ┏━---Forwarded to------> Reducer Function
    |                           ⬇️ Mutates stored data
    |                       Central Data Store
    |                            ⬇️ Subscription
Action <---dispatch-------  Components

>> Components never directly manipulate data from store, instead we have reducer functions

>>  Reducer functions in general, are just a general concept. Reducer functions are functions, which takes some input, and then transform that input, they reduce it, for example they can reduce a list of numbers to the sum of that number and that's just one example. But they in general transform, inputs and spit out a new output a new result.

>>Action is really just a simple JavaScript object, which describes the kind of operation, the reducers should perform.

>> Components triggers(dispatches) certain actions. Redux then forwards actions to the reducer, reads that description of the desired operation, and then this operation is performed by the reducer. And then the reducer, spits out a new state, which effectively will replace the existing state in that Central Data Store. And when that happens, when that state in that data store is updated, subscribing components are notified, so that they can update their UI.
*/
