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

function render(state) {
  const {
    beforeInput, operator, result,
  } = state;

  function handleClickNumber(number) {
    if (typeof (beforeInput) === 'number') {
      render({ ...state, result: (result * 10) + number });
      return;
    }
    render({ ...state, beforeInput: result, result: number });
  }

  function handleClickOperator(inputOperator) {
    if (inputOperator === '=') {
      render({ result: operator(beforeInput, result) });
      return;
    }

    if (operator === null) {
      render({ ...state, beforeInput: inputOperator, operator: inputOperator });
      return;
    }

    render({
      beforeInput: inputOperator,
      operator: inputOperator,
      result: operator(beforeInput, result),
    });
  }

  const calculationFunctions = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
    '=': '=',
  };
  const element = (
    <div>
      <p>간단 계산기</p>
      {result}
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>

      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button" onClick={() => handleClickOperator(calculationFunctions[i])}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  beforeInput: 0,
  operator: null,
  result: 0,
});
