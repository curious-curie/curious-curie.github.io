---
title: "[JS] no-await-in-loop?"
date: "2021-03-16T00:00:00.001Z"
template: "post"
draft: false
slug: "no-await-in-loop"
category: "Javascript"
tags:
  - "Frontend"
  - "Javascript"
  - "Web Development"
description: "eslint 룰 중에 no-await-in-loop이 있는 이유?"
socialImage: ""
---

Performing an operation on each element of an iterable is a common task. However, performing an await as part of each operation is an indication that the program is **not taking full advantage of the parallelization benefits of async/await.**

Usually, the code should be refactored to create all the promises at once, then get access to the results using Promise.all(). Otherwise, **each successive operation will not start until the previous one has completed.**

map, forEach 안에 async-await 쓰면, map, forEach 자체는 await 하지 않기 때문에 루프 이후와 실행 순서 보장되지 않는다 
그리고 그 배열들 안에서 await이 걸려서 각각의 요청들이 parallel 하게 수행되지 않고 순차적으로 실행된다 
(우리 코드 보면 이걸 의도해서 forEach를 쓰는 경우도 있긴 하다)
=> for ... of 쓰거나, Promise.all 쓰는게 좋다. 

Concretely, the following function should be refactored as shown:
```javascript
async function foo(things) {
  const results = [];
  for (const thing of things) {
    // Bad: each loop iteration is delayed until the entire asynchronous operation completes
    results.push(await bar(thing));
  }
  return baz(results);
}
```

```javascript
async function foo(things) {
  const results = [];
  for (const thing of things) {
    // Good: all asynchronous operations are immediately started.
    results.push(bar(thing));
  }
  // Now that all the asynchronous operations are running, here we wait until they all complete.
  return baz(await Promise.all(results));
}
```
Promise-all
```javascript
async function parallel(array) {
  const promises = array.map(item => delay(item));
  await Promise.all(promises);
  console.log("Done!");
}

출처: https://mygumi.tistory.com/328 [마이구미의 HelloWorld]
```
