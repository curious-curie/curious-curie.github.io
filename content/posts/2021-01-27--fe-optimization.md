---
title: "[FE] 프론트엔드 성능 최적화"
date: "2021-01-27T22:40:32.169Z"
template: "post"
draft: false
slug: "fe-optimization"
category: "Frontend"
tags:
  - "Frontend"
  - "React"
  - "Web Development"
description: "FE 성능 측정과 최적화 방법들"
socialImage: ""
---

### 로딩 과정의 이해 (Request → Connect → Response)

- Stalled: Request 보내기 전 대기 시간

(우선순위 요청 확인, 동일 도메인 요청 제한 확인 및 브라우저의 디스크캐시 용량 할당 ...)

- DNS Lookup: 도메인 명에 따른 IP 주소를 조회한 시간
- Initial Connection: 서버와 브라우저 간의 연결 설정 시간
- Time to First Byte
    - 서버가 해당 요소의 첫 byte 정보를 브라우저에 보내기 위해 걸린 시간 (서버에서 페이지를 조합하는 시간)
- Content Download: 요소를 다운로드 하는 시간

### 성능 지표

### LCP (Largest Contentful Paint)

뷰포트 내에서 보여지는 가장 큰 요소의 렌더링 시간

로딩 성능을 측정하는 지표 ⇒ 좋은 사용자 경험을 위해 2.5내 로딩 필요 

### FID (First Input Delay)

페이지 로딩 동안 사용자가 첫 인터랙션 수행 시 브라우저가 그 요청에 대한 응답과 처리를 시작하는 시간 의미

100ms 이하여야 

### CLS (Cumulative Layout Shift)

페이지의 전체 수명 동안 발생하는 모든 예기치않은 레이아웃 이동에 대한 모든 개별 레이아웃 이동 점수의 합계를 측정 

비주얼 안정성을 측정, 0.1 내의 CLS 점수를 유지해야함 

#### FCP (First Contentful Paint)

페이지 로딩 시작 후 ~ 내용의 일부가 화면에 처음 렌더링 된 시점

#### TTI (Time To Interact)

페이지 로딩이 시작된 후로 메인 서브 리소스들이 모두 로딩되고 사용자의 입력에 빠르고 안정적으로 반응할 준비가 된 시점

## 성능 개선

### 1) 요청 수 최소화

1. 자원의 Merge
2. Lazy Loading - 필요없는 자원은 나중에 요청 
    - 초기 뷰포트 내 렌더링 되지 않는 경우 lazy load 👌
    - Image Lazy Loading ⇒ onload 이후에 자원 불러들이는 방법
    - Native Lazy Loading ⇒ img, iframe에 `loading='lazy'`)
        - Reflow 방지 위해 width/height 설정 권장
3. Code-Splitting - 자원 로딩 쪼개기 
    - chunking (분리해서 로딩, 대체로 라우팅 별 chunk)


### 2) 요청 크기 최소화

- Minify ⇒ 주석 및 공백 제거
- Obfuscation ⇒ 변수명 변경
- **이미지 최적화**
    - 적절한 image 포맷 사용 (PNG: png-8, png-24 / JPEG 압축률 등)
    - 기기에 대응되는 적절한 크기의 이미지 사용
    - 고해상도 이미지를 작은 크기로 줄여 보여주는 경우 디코딩 리소스 많이 든다
    - 불필요한 메타정보 제거
    - 이미지 압축: 최적화 도구 사용 (jpegtran, OptiPNG...)
- **HTTP Header에서 불필요한 값 제거**
- Tree-Shaking: Dead Code Elimination
    - ES6 module import 시 사용되는 것만
    - 번들러의 tree shaking

### 3) 빠르게 렌더링 하기

1. script 태그 옵션 → defer, async
    - defer: script 태그 다운로드 하는 동안 HTML 파싱 중단 X, 파싱 완료 이후 스크립트 실행
        - DOM 제어 관련 스크립트는 defer 이용
    - async: script 태그 다운로드 하는 동안 HTML 파싱 중단 X, 다운로드가 완료되면 바로 스크립트 실행, 이 때 HTML 파싱이 중단
        - DOM 제어와 관련 없고 의존성 없는 경우 async
2. Reflow 최소화
    - DOM tree에서 분리 하고 작업 이후 최종 반영하기

    `obj.style.width = .... obj.style.height = ...` 후에 `document.body.appendChild(obj)`

    - `display: none` 적용해서 분리한 후에 display 다시 바꿔서 노출시키기 (Render tree에서 분리)
    - `content-visibility: auto` 특정요소의 렌더링 작업이 필요한 시점 전엔 수행되지 않도록...

### 그 밖에

- 의도치 않은 레이어 생성 조심 (z-index)
- inline 지양 : 로컬 캐싱 되지 않으므로!
- 여러개의 script 블락을 병합하자: 별도의 노드로 인식시키는 경우 성능 측면에서 좋지 않음
- 짧은 script 블럭으로 인한 불필요한 작업 반복 지양
    - `<script>` 블락의 파싱과 자바스크립트 엔진의 컴파일, parsing stream에 전달 ⇒ 처리 후 다시 HTML 파싱 수행하는 과정 반복되기 때문