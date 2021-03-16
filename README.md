# Search-Photo-App

원하는 사진을 검색하는 사이트 입니다.

## 기술 스택
1. ES6
2. MVC 디자인 패턴
3. Unsplash API

## 버전별 수정사항

### 1.0 v

1. 이미지 검색 기능
2. 최근 검색어 표시 기능
3. 검색어 삭제 시 검색결과 삭제

### 1.1 v
1. 이미지 클릭시 해당 이미지 정보를 나타내는 모달창 기능 추가

### 1.2 v
1. 이미지 목록을 끝까지 스크롤시 새로운 이미지 데이터를 불러오는 무한 스크롤링 기능 추가

#### 문제 및 해결과정
무한스크롤링 기능을 추가하기 위해선 기존 검색어를 유지한 상태에서 새로운 이미지 데이터를 불러와야 했습니다. 이를 해결하기 위해서 기존 검색어를 쿠키에 저장하고 이와 함께 데이터 페이지 상태를 만들어 unsplash api와 통신하여 새로운 데이터를 계속해서 받아왔습니다.

```javascript
/**
 * html에 렌더링 트리거 요소를 만들고 new IntersctionObserver로 이를 감시하여 
 * 스크롤이 가장 하단에 가면 새로운 데이터를 추가
 * 이 때 this가 IntersctionObserver로 대체되는 것을 방지하기 위해 this를 bind.
*/
infiniteScroll(){
    const renderingTrigger = document.querySelector('#rendering-trigger')
    const observer = new IntersectionObserver(this.getMoreData.bind(this))
    observer.observe(renderingTrigger)
}

getMoreData(){
    SearchModel.fetchMoreData().then(({data}) => {
        this.fetchMoreData(data.results)
    })
}

fetchMoreData(data){
    this.resultView.moreRender(data)
}

```
```javascript

///api
getMoreData(){
    const query = this.getCookie("query")
    this.page+=1
    return this.axios.get("search/photos", {
        params: { 
        client_id: this.ACCESS_KEY,
        query,
        page:this.page
        },
    });

}

getCookie(name){
    const cookieList = document.cookie.split(';')
    const cookie = cookieList
        .map(cookie => cookie.split('='))
        .find(item => item[0] === name)[1]
    return cookie
}
```

### 1.3v
1. 이미지 로딩시 로딩바 표시 기능 추가

### 1.4v
1. 다크모드 기능 추가