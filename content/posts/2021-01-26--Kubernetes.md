---
title: "[Kubernetes] 쿠버네티스 기초"
date: "2021-01-26T22:40:32.169Z"
template: "post"
draft: false
slug: "kubernetes-basics"
category: "Kubernetes"
tags:
  - "Kubernetes"
  - "Backend"
description: "Tech Share - 쿠버네티스의 이해 정리"

socialImage: ""
---

## NCC

Kubernetes based container cluster

## 컨테이너

소프트웨어를 스탠다드한 유닛으로 패키징하는 기술 

- 컨테이너는 어플리케이션의 런타임 인스턴스
- 컨테이너 단위로 OS, 라이브러리, 어플리케이션을 패키징 할 수 있다.
- 배포 단위로 컨테이너 이미지 만들어 사용 가능
    - Immutable 한 배포 ⇒ 쉽게 배포, 롤백
    - CI/CD에 적합

### 컨테이너 기술 요소

#### Linux Namespace

프로세스 별로 격리된 공간 제공 (프로세스의 가상화)

프로세스가 볼 수 있는 리소스의 view를 재정의 (MNT, hostname, PID, IPC, Network, Username...)

커널이 알고있는 실제 데이터와 다르게 정의 ⇒ 프로세스마다 다르게 보게할 수 있다 

#### cgroup

리소스의 사용량을 한정하는 기술

- **리소스 할당 방식**
    - static binding: 특정 리소스만 사용하도록 그룹별 바인딩
    - Priority-based: 어떤 cgroup에게 특정 리소스 사용의 우선순위 부여
    - limit: 얼마 이상 사용할 수 없게 제한

#### unionfs

파일 시스템의 immutability를 보장 ⇒ 컨테이너가 사용할 파일 시스템 격리

### Docker

컨테이너를 이미지 파일로 빌드하고 배포하여 어디서나 실행할 수 있게 해주는 오픈소스 

마치 깃처럼... 빌드 푸시하고 실행하고 

자동으로 immutable하게 실행할 수 있도록 해줌 

서버 - 클라이언트로 나뉨

- 클라이언트 = REST 요청 ⇒ 서버 (build)
- Image: 어떤 어플리케이션을 실행하기 위한 환경
    - 도커에서는 어플리케이션을 실행하기 위한 파일들을 모아놓고 어플리케이션과 함께 이미지로 만들 수 있음 ⇒ 이 이미지를 기반으로 어플리케이션을 바로 배포 가능

## Kubernetes

: Container Orchestration System 

구글의 컨테이너 플랫폼 / 마이크로서비스 플랫폼 / 이식성있는 클라우드 플랫폼

다양한 어플리케이션 타입(Stateless, Stateful, 데이터 처리...)를 컨테이너로 구동할 수 있게 해줌 

*Docker Orchestration*: 클러스터 상에서 콘테이너를 설치, 관리해줌 

- Scheduling : 여러 호스트에 컨테이너 분배, 장애 시 재분배...
- Networking : 분산된 컨테이너 간의 네트워크
- Logging: 컨테이너의 로그 조회
- Monitoring
- Storage

선언적으로 동작하는 시스템 ( REST API와는 달리 )

Kubernetes Object (pod)를 Kubernetes 시스템에 반영하는 방식으로 동작 (object의 생성, 실행, 삭제...)

⇒ 이식성있는 동작 

## Kubernetes Objects

### Pod

Kubernetes에서는 컨테이너를 Pod 단위로 묶어서 배포 

한 Pod내의 컨테이너는 네트워크와 로컬 디스크 볼륨을 공유함 

Pod 단위로 IP 할당 (ncc에서는 실제 외부에서 접근 가능한 ip 할당됨)

Pod 안에 컨테이너는 1개 ~ n개, 로컬디스크도 같이 넣을 수도 있고

### Deployment

여러개의 ReplicaSet을 관리, 배포 담당

Deployment Object 생성 ⇒ 얘네가 ReplicaSet 생성, 관리 

### Service

여러 Pod들의 접근 Endpoint → IP 제공  (사용자가 접근할 수 있도록)

서비스 생성 시 IP 할당 받음 

Pod들의 부하 / 분산 

- ClusterIP (default)
    - e.g. msa에서 컴포넌트끼리 통신할 때 외부 노출할 필요 없이 사용
- LoadBalancer ⇒ 외부에서 접근 가능한 IP를 하나 더 할당받음

### Statefulset

stateful한 어플리케이션을 관리하기 위한 오브젝트

⇒ redis, mysql, kafka...  

(deployment는 stateless한 object)

## 서비스 배포 전략

### Rolling Update

Kubernetes 상에서 이미 동작하고 있는 서비스를 새로운 버전으로 배포하고자 할 때 ⇒ 기존 이미지 pod들을 새로운 pod으로 변경해야 함 

사용자가 Deployment에 설정된 image 변경 (apply)

⇒ 내부적으로 `Deployment controller` 가 자동으로 `replicationset`을 하나 더 추가하여 pod을 교체해줌

### Progressive Deployment

rolling update와 다른 방식, 새로운 버전의 서비스가 잘 동작하는지 점진적으로 확인하면서 반영하고자 하는 경우

기존 버전의 deployment와 별개로 새로운 버전의 image 갖는 deployment 추가

새로운 deployment의 pod label을 지정된 값으로 설정해서 기존 서비스에 포함되어 운영되도록 함

⇒ 새 버전 pod들의 개수를 점진적으로 늘려가면서 기존 pod을 줄이는 방식 

### Blue/Green Deployment

kubernetes의 서비스 설정 변경하면서 두 개의 Deployment 간 부하를 조절하면서 새 버전으로 교체하는 방식

(Progressive 배포는 운영자가 두 deployment의 설정 변경하면서 pod 개수 조절하는 방식)

부하 분산 비율을 설정해서 일정 기간 동안 두 deployment를 동시에 서비스 되도록 ,,, 

selector의 version을 blue/green으로 지정, 부하 분배하는 방식
