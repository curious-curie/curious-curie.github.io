---
title: LRU Cache Algorithm
date: "2020-09-01T22:40:32.169Z"
template: "post"
draft: false
slug: "lru-cache-algorithm2"
category: "CS"
tags:
  - "Computer Architecture"
  - "Cache"
  - "CS"
description: "페이지 교체 알고리즘, 그리고 LRU 알고리즘 구현해보기"
socialImage: ""
---


`strictNullChecks` 옵션이 안 켜져 있으면 `null` 과 `undefined` 는 세 가지 타입에 다 할당 가능하다.

## object

모든 `non-primitive` 할당 가능 

- `string, number, bigint, boolean, symbol` 제외 다 가능
- `{ [key: string]: any }` 랑 비슷

```tsx
function foo(bar: object){
    console.log(bar);
}

foo([1])
foo({name:'name'})
foo(12) // error
foo(true) // error 
foo(null) //ok
```

## Object

모든 Javascript 객체 할당 가능 (모든 JS object의 베이스)

⇒ `primitive, non-primitive` 모두 가능 

## {}

`Object` 와 동일  

```tsx
function foo(bar: Object){  // or bar: {}
    console.log(bar);
}

foo([1])
foo({name:'name'})
foo(12) // ok
foo(true) // ok 
foo(null) //ok
```

⇒ non-primitive 값만 받는 type에서는 (키-밸류 형식의 object...) `object` 를 쓰는게 더 적합.

# Object vs. any?

```tsx
let foo: any;
let bar: Object;

console.log(foo.notExistingMethod()); // ...(1)
console.log(bar.notExistingMethod()); // ...(2)
```

(1) 트랜스파일 단계에서 에러가 나지 않는다. 실행 시 `foo.notExistingMethod is not a function` 에러가 발생

⇒ any 로 타입을 설정했다는 건 트랜스파일러에게 그 안에 뭐가 저장되어있는지에 대한 정보는 하나도 주지 않았다는 것 

⇒ 그래서 아무것도 제한하지 않고 트랜스파일 된다 

(2) Object 클래스에 notExistingMethod() 함수가 없기 때문에 트랜스파일 단계에서 에러가 난다

`property 'notExistingMethod' does not exist on type 'Object'`

⇒ 진짜로 무슨 타입이 넘어올지 모르는 경우를 제외하고는 `any` 의 사용은 지양해야함!