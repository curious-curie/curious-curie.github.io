---
title: "[Web] loadedmetadata / loadeddata / canplay"
date: "2021-03-19T22:40:32.169Z"
template: "post"
draft: false
slug: "loaded-meta-data"
category: "web"
tags:
  - "Web Development"
  - "Video"
description: "뷰어 구현에 필수적인 비디오 이벤트들.. 이 기회에 헷갈리는 부분을 정리해보자"
socialImage: ""
---
 

### **loadedmetadata**
> The loadedmetadata event is fired when the metadata has been loaded.

미디어의 메타 데이터가 로드되었을 때를 나타낸다.

메타 데이터는 우리가 유용하게 사용할 수 있는 동영상의 재생시간과 같은 것을 의미한다.

미디어가 로드되기 전에, 먼저 메타 데이터를 뽑아와서 활용할 수 있다.

 

### **loadeddata**
> The loadeddata event is fired when the frame at the current playback position of the media has finished loading; often the first frame.

미디어의 프레임이 로드되었을 때를 나타낸다.

여기서 프레임은 미디어에 대한 전체 프레임이 아닌, 첫 프레임 또는 현재 프레임을 뜻할 수 있다.

즉, 조금이라도 다운로드가 되었을 때이고, 이러한 의미는 재생할 수 있다는 것을 알아차릴 수 있다.

하지만 주의해야할 것은 로드된 데이터가 재생에 있어서, 충분하다고 보장하지않는다.

즉, loadeddata 이벤트가 발생한 시점에서 play() 메소드를 호출하면, 재생이 실패할 수도 있다.



출처: https://mygumi.tistory.com/356 [마이구미의 HelloWorld]

### **canplay**

재생 가능한 정도로 로드된 수준. (버퍼링 없이 재생을 시작할 수 있는 수준)

> canplay usually implies that enough content has been loaded that, assuming network conditions remain constant, the browser will be able to play to the end of the content without buffering. This normally only fires after loadedmetadata as that metadata is what tells the browser the length and other important information about the content.