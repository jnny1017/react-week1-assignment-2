/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

const initialState = {
  accumulator: 0,
  number: null,
  operator: '',
}

function render({ accumulator, number, operator }) {
  function handleClickReset() {
    render(initialState);
  }

  function handleClickNumber(value) {
    render({
      accumulator,
      number: (number || 0) * 10 + value,
      operator,
    });
  }

  function handleClickOperator(value) {
    render({
        accumulator: calculate(operator, accumulator, number),
        number: null,
        operator : value,
      });
  }

  function or(x, y) {
    return x === null ? y : x;
  }

  const operatorFunctions = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  }

  function defaultFunction(x, y) {
    return or(y, x);
  }

  function calculate(operator, accumulator, number) {
    return (operatorFunctions[operator] || defaultFunction)(accumulator, number);
  }

  const element = (
    <div>
      <div>{or(number, accumulator)}</div>
      <div>
        {Array.from({length: 10}, ((_, i) => i)).map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </div>
      <div>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator)}>
            {operator}
          </button>
        ))}
        <button type="button" onClick={() => handleClickReset()}>reset</button>
      </div>
    </div>

  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);

