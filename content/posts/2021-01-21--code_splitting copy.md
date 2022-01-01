---
title: "[React] Code Splitting"
date: "2021-01-21T00:00:00.001Z"
template: "post"
draft: false
slug: "react-code-splitting"
category: "React"
tags:
  - "React"
  - "Frontend"
  - "Web Development"
description: "런타임에 번들을 동적으로 생성하고 불러오는 것"
socialImage: ""
---

- 런타임에 번들을 동적으로 생성하고 불러오는 것

- 앱의 초기 구동 시에 모든 컴포넌트의 리소스를 다 다운받을 필요는 없다
- 리소스를 컴포넌트 단위로 분리시켜 필요한 것들만 다운로드 받을 수 있도록 함
- 당장 필요치 않은 코드 불러오지 X ⇒ 최초 로딩 비용 ↓

※ `React.lazy` 와 `Suspense` 는 아직 SSR 불가능하다고 한다. `Loadable Components` 같은 모듈 사용해야 함 

### React.lazy

```tsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

### Route-based code splitting

특정 route에 대해 필요없는 코드들까지 한번에 로드해버리는 것을 막기 위해 가장 좋은 방법이 router 에서 code splitting 하는 방식이라고 한다. 

⇒ **유저가 다른 페이지로 넘어가 때에만 그 페이지를 asynchronous하게 로딩**

```tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

*근데 RootRouter에서 lazy loading을 하게 되면 어차피 App 렌더링 시 RootRouter 렌더링 ⇒ 결국 거기서 lazy loading 하고 있는 컴포넌트들 다 렌더링 ⇒ 결국 최초 로딩 시 렌더링 되는 것들은 똑같이 한꺼번에 렌더링 될 거라고 생각했는데 아니었다. 루트에 접근했을 때 해당 컴포넌트가 레이지 로드 되는 방식인듯 ! Route 종류가 많을 때  엄청 유용할 것 같다. live-commerce/react 레포에서 이렇게 쓰고 있다.* 

### Suspense

- lazy 컴포넌트는 Suspense 컴포넌트 하위에서 렌더링되어야
- Suspense는 lazy 컴포넌트가 로드되길 기다리는 동안 로딩 화면과 같은 예비 컨텐츠를 보여줄 수 있게 함

```tsx
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

### Webpack ⇒ dynamic import

원래 방식대로 하지 않고 필요할 때 함수 형식으로 import 한다 

사이즈가 큰, 로딩에 오래걸리는 컴포넌트에는 이렇게 쓰는 것도 괜찮을 듯. 그런데 `lazy` 가 훨 깔끔함 

```tsx
if(videoComponent) {
  import('./component/video')
    .then(video => {
        video.loadElements()
    })
    .catch(e => console.log(e))
}
```

### Vue에선 이렇게 했었다

- 라우터에서의 컴포넌트 import 부분을 함수로 변경해준다
- 간단하긴 하군...

```jsx
// before
component: MyProfile

// after
component: () => import( "./components/MyProfile.vue" )
```