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

### 1.5v

1.사진 조건 필터링 기능 추가

#### 문제 및 해결과정

필터링 기능을 추가했을 때 무한스크롤을 구현하기 위해선 필터 조건도 쿠키에 추가해야 했습니다.
객체는 저장하지 못하는 쿠키의 특성으로 JSON으로 문자열화 했습니다. 그리고 쿠키관련 메소드를
유틸파일로 따로 분리하여 관리하여 api모듈을 정리하였습니다.

```javascript
//api.js
setPage(query,filter){
    this.page = 0
    const strFilter = JSON.stringify(filter)
    setCookie("query",query,{'max-age':3600})
    setCookie("filter",strFilter,{'max-age':3600})
}

//util/cookie.js
function setCookie(name,value,options={}){
    if(options.expires instanceof Date){
        options.expires = options.expires.toUTCString()
    }
    let updatedCookie = encodeURIComponent(name)+"="+encodeURIComponent(value)

    for(let optionKey in options){
        updatedCookie += ";"+optionKey;
        let optionValue = options[optionKey]
        if(optionValue !== true){
            updatedCookie += "=" + optionValue
        }
    }

    document.cookie = updatedCookie;
}

function getCookie(name){
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export {setCookie,getCookie}


```

### 1.6v

1.firebase와 연동하여 로그인 기능 추가(자신이 좋아하는 사진을 보관할 수 있는 기능을 추가하기 위해서 구현하였습니다)
2.유저 정보 확인 버튼 추가 
3.스타일 수정 
4.쿠키에 저장했던 검색 기록이 만료됐을 때 불러올 데이터를 찾지 못해서 생기는 오류 개선

```javascript
getMoreData() {
    if (getCookie("query")) {
        SearchModel.fetchMoreData().then(({ data }) => {
        if (data) {
            this.fetchMoreData(data.results);
            this.loadingView.loading(true);
        } else {
            return;
        }
        });
    }
}
```
