---
title: "[React] Before you memo()"
date: "2021-04-14T00:00:00.001Z"
template: "post"
draft: false
slug: "before-you-memo"
category: "React"
tags:
  - "Frontend"
  - "React"
  - "Web Development"
description: "https://overreacted.io/before-you-memo/ 를 읽고 정리"
socialImage: ""
---

> https://overreacted.io/before-you-memo/ 를 읽고 정리

### Move State Down 
```javascript
export default function App() {
  let [color, setColor] = useState('red');
  return (
    <div>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
      <ExpensiveTree />
    </div>
  );
}
```
`input`에 따라 state가 바뀌어서 app 자체가 모두 리렌더링되니까, Form 컴포넌트를 분리한다 
```javascript
export default function App() {
  return (
    <>
      <Form />
      <ExpensiveTree />
    </>
  );
}

function Form() {
  let [color, setColor] = useState('red');
  return (
    <>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
    </>
  );
}
```
`color`가 바뀌면 `Form`만 리렌더링된다. 

### Lift Content Up 
```javascript
export default function App() {
  let [color, setColor] = useState('red');
  return (
    <div style={{ color }}>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p>Hello, world!</p>
      <ExpensiveTree />
    </div>
  );
}
```
위처럼 `color`가 Form 상위 컴포넌트에서도 쓰여야 한다면? 

```javascript
export default function App() {
  return (
    <ColorPicker>
      <p>Hello, world!</p>
      <ExpensiveTree />
    </ColorPicker>
  );
}

function ColorPicker({ children }) {
  let [color, setColor] = useState("red");
  return (
    <div style={{ color }}>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      {children}
    </div>
  );
}
```

`App`을 `color`에 dependent 한 것과 그렇지 않은 부분으로 나눈다.
그렇지 않은 부분은 `ColorPicker` 에 JSX content로 전달된다 => `children` prop
`color`이 바뀌면 `ColorPicker`은 리렌더링되지만 `children` prop은 변화 없기 때문에 `children` 내부 컴포넌트들은 리렌더 되지 않는다

### So...
`memo` `useMemo` 등을 쓰기 전에 바뀌지 않는 부분들을 바뀌는 부분에서 분리해서 리렌더링을 막는 것도 고려해 보아야 한다
(우리 코드에도 많이 적용할 수 있을듯) 