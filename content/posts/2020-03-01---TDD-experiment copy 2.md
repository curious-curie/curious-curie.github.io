---
title: TDD with Vue.js 체험 회고
date: "2020-03-11T22:40:32.169Z"
template: "post"
draft: false
slug: "test-driven-development"
category: "Development"
tags:
  - "TDD"
  - "Vue"
  - "Web Development"
description: "하다 만 (…) TDD 후기이자 반성문"
socialImage: ""
---

# Vue.js 컴포넌트 개발 시 사용한 TDD 후기이자 반성문

![tdd-cycle](https://sehun-kim.github.io/sehun/assets/images/TDD_Graphic.jpg)

### Test Driven Development

테스트 케이스 작성 -> 테스트 케이스 통과를 위한 코드 작성 -> 코드 리팩토링의 반복 



### 내 TDD는 왜 (거의) 실패했을까 ?

### 습관 

자꾸만 기존의 버릇으로 회귀하게 된다. 

처음 컴포넌트 그릴 때는 열심히 테스트코드 짰는데, 데이터타입이 바뀌고 그러면서 테스트코드도 바꾸고 하는 과정을 겪다보니 그냥 에라 모르겠다~하고 개발부터 해버림. 

결국 테스트코드(초반) => 개발 => 테스트 성공의 플로우로 가다가 결국엔 [ 개발 => 스토리북을 통한 일차원적인 테스트 => 실제 데이터 꽂아 넣은 후 테스트하며 개발 ]의 기존 습관이 짬뽕된 혼종 방식을 따르게 되었다...

### 시간과 생산성

props나 state 등 데이터의 타입이나 형태가 바뀌면 테스트코드까지 다 수정해야 하는 이중의 고통이 생길 수 있다. 

반복작업 => 앱이 변화함에 따라 테스트 코드도 계속 업데이트되어야 한다는 부담

### 생산성은 결국은 능력 부족과도 연관되는데, 

개인적 소견으로는 테스트 코드 짜기가 너무나 쉽지 않다.

구현을 위한 코드보다도 테스트 코드 짜는게 더 오래걸림 

테스트코드가 불필요한 것은 아님. 나중에 구현되어있는 걸 다 곱씹어가면서 테스트코드 짜는 것이 더욱 힘들고 고통스러울 수 있음. 그러나 타이트한 듀데이트의 프로젝트들이 휘몰아치는 업무환경(…ㅎ)에서는 TDD를 쉽게 적용하긴 어려울 듯



### 그럼에도 불구하고?

- 개발 전에 미리 요구사항, 기능에 대한 명확한 정의와 구상 후 개발 시작 가능 

  - 테스트 코드를 짜면서 어떻게 구성해야 할 지 다시 한번 머릿속에서 정리해 보고 코딩을 시작하게 됨. 

  - 그러나 단순한 base 컴포넌트 개발이라면 스토리북을 이용한 시각적 테스트만으로도 충분할 것 같다는 생각도 들었음

    

- 예외 처리, 안전한 코드

- 리팩토링하기가 편하고, 요구사항의 만족 정도를 시각적으로 확인할 수 있음 

- Solid 한 구현 (테스트 케이스에 맞춰서 개발, 개발자의 관점에서 각 기능들의 역할이 분명해짐)

- (TDD에 대한 이해가 덜 되어서 그런지 아직 조금 뜬구름 잡는 소리처럼 들리기도 함 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ)

- 초반엔 핵심적인 테스트 코드를 미리 써 놓고 그거에 맞춰서 개발하는 방법은 나쁘지 않을 것 같음. 요소 하나하나를 테스트에 맞게 구현하겠다!는 마음으로 TDD를 시작하니 처음부터 부담과 시간 소모가 굉장히 컸음. 



### TDD를 위해 필요한 것 

- 전략 - 어느정도로 테스트할 것인가에 대한 정의 

  TDD를 도입함으로써 오는 시간적 손실이 분명히 존재하기는 할 것이기 때문에, 테스트 정도에 대한 사전 정리와 합의가 중요할 듯. 

  테스트를 아주 작은 단위로 작성하면 검증은 쉽겠지만 코드가 복잡해지거나 유지보수가 어려울 것 같음

- 결국은 테스트의 기회비용을 고려한 전략이 중요할 것 같다

- 그리고 ⭐️⭐️ 많은 연습과 시행착오 ⭐️⭐️가 필요하다!!! 

  - 익숙해질 때까지 많은 삽질과 시간이 필요하다. 그러나 '제대로', '지속적으로' 하는 TDD는 그만큼 가치가 있을 듯.





Curie Yoo (imported original post from travelflan dev-blog)