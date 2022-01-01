---
title: "[Typescript] conditional types 활용해서 안정성 확보하기"
date: "2021-01-20T22:40:32.169Z"
template: "post"
draft: false
slug: "typescript-conditional-types"
category: "Typescript"
tags:
  - "Typescript"
  - "Frontend"
  - "Web Development"
description: "[8월 우아한테크세미나] 우아한 타입스크립트..."
socialImage: ""
---

[[8월 우아한테크세미나] 우아한 타입스크립트](https://www.youtube.com/watch?v=ViS8DLd6o-E&t=1161s&ab_channel=%EC%9A%B0%EC%95%84%ED%95%9CTech)

#### Item<T> - T에 따라 달라지는 container로 만들기  

- T가 string ⇒ StringContainer / else: NumberContainer

```tsx
interface StringContainer {
	value: string;
	format(): string;
	split(): string[];
}

interface NumberContainer {
	value: number;
	nearestPrime: number;
	round(): number;
}

type Item1<T> = {
	id: T,
	container: any;
};
```

```tsx
type Item2<T> = {
	id: T,
	container: T extends string ? StringContainer : NumberContainer;
};
```

```tsx
// T가 string도 number도 아니면 사용 불가하게 
type Item3<T> = {
	id: T extends string | number ? T : **never**;
	container: T extends string
		? StringContainer
		: T extends number
		? NumberContainer
		: **never** 
};
```

### e.g. ArrayFilter<T>

```tsx
type ArrayFilter<T> = T extends any[] ? T : never;

type StringsOrNumbers = ArrayFilter<string | number | string[] | number[]>
// never never string[] number[]
// => string[] number[]
```

### e.g. Flatten<T>

```tsx
type Flatten<T> = T extends any[] 
	? T[number]
	: T extends object
	? T[keyof T]
	: T;

const numbers = [1,2,3];
type NumbersArrayFlattened = Flatten<typeof numbers>;
// number

const person = {
	name: 'Mark',
	age: 38
};

type SomeObjectFlattened = Flatten<typeof person>;
// number | string

const isMale = true;
type SomeBooleanFlattened = Flatten<typeof isMale>;
// boolean

```

## ReadonlyArray<T>와 as const

리듀서 액션 선언할 때 라이브러리 안 쓰면 보통 as const를 같이 쓰는 것 같다

```tsx
const weekdays: ReadonlyArray<string> = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

const weekdays = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
] as const;

```

## Mapped Types

객체의 요소들에 대해 타입 지정 / 변경 ...

```tsx
type Partial<T> = {
	[P in keyof T]?: T[P];
};

type Required<T> = {
	[P in keyof T]-?: T[P];
};

type Readonly<T> = {
	readonly [P in keyof T]: T[P];
};

// T에서 K와 교집합에 있는 속성만 꺼낸다 
type Pick<T, K extends keyof T> = {
	[P in K]: T[P];
}

// type T인 속성들로 구성한다 
type Record<K extends keyof any, T> = {
	[P in K]: T;
}
```

## never 활용하기

never은 절대로 발생하지 않는 값의 타입.

- toastNodes에 undefined가 들어가지 않도록 never을 이용해서 에러 던져서 방어한다

```tsx
enum ToastType {
  AFTER_SAVED,
  AFTER_PUBLISHED,
  AFTER_RESTORE,
}

interface Toast {
  type: ToastType,
  createdAt: string,
}

const toasts : Toast[] = [];

function neverExpected(value: **never**): **never** {
  throw new Error(`Unexpected value: $value`)
}

const toastNodes = toasts.map((toast) => {
  switch(toast.type){
    case ToastType.AFTER_SAVED:
      return 
        <div key={toast.createdAt}>
          <AfterSavedToast />
        </div>
      
    case ToastType.AFTER_PUBLISHED:
      return 
        <div key={toast.createdAt}>
          <AfterPublishedToast />
        </div>
      
    case ToastType.AFTER_RESTORE:
      return 
        <div key={toast.createdAt}>
          <AfterRestoredToast />
        </div>
    default:
			// never여야해 (이 경우는 없어야해) 
      return neverExpected(toast.type)
  }
})
```