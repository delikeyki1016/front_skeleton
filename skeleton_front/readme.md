## github 
토큰생성 -> github 내 new repository -> git clone 리모트url(생성할 폴더 위치에 가서 git bash로 명령) ==> front_skeleton 폴더 생성)

# git bash
- 파일생성 
- git add .
- git commit -m "커밋메시지"
- git push -u origin main (-u는 최초에 한번하면 이후는 생략가능)

# 강제 풀 
- git pull origin main 

# 비교해서 풀받기
- git fetch origin main 
- git diff main origin/main
- git merge origin/main

# 충돌났을때
- pull받아 충돌해결 후, 다시 add, commit, push 


>npm init vite skeleton_front -- --template react
해당 폴더로 이동 후 
>npm install 
부가 모듈 설치
>npm install axios bootstrap react-router react-router-dom styled-component
>부트스트랩 프리템플릿 다운로드 (bootstrapmade > estateagency)

# public 폴더 : 컴포넌트와 상관없이 html에 포함되어 서비스되는 파일들
# src 폴더 : 컴포넌트에서 import되는 파일들 
# vendor 폴더 : 부트스트랩 템플릿을 제공하는 곳에서 만든 무언가를 담자