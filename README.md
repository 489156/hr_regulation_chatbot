# 사내 규정 Q&A 챗봇 (HR Knowledge Management System)

## 📋 프로젝트 개요

이 프로젝트는 사내 직원들을 위한 **규정 질의응답 챗봇**입니다. AI 기반의 하이브리드 검색 기능과 구조화된 응답 시스템을 통해 정확하고 신뢰할 수 있는 규정 정보를 제공합니다.

## ✨ 주요 기능

### 🔍 하이브리드 검색 시스템
- **키워드 검색**: 제목, 키워드, 카테고리 기반 검색
- **내용 검색**: 규정 본문 내 키워드 매칭
- **가중치 기반 점수**: 검색 결과의 정확도 순 정렬
- **유사 규정 추천**: 관련 규정 자동 제안

### 📝 구조화된 응답 형식
1. **결론** (2-3문장 요약)
2. **주요 내용 및 절차** (상세 정보)
3. **출처/버전/시행일** (신뢰성 확보)
4. **다음 단계** (신청서, 결제 버튼 등)
5. **예외사항/주의사항** (노란색 경고 박스)

### 👥 사용자 관리
- **기본 비밀번호 인증**
- **역할 기반 접근 제어** (관리자/일반사용자)
- **관리자 전용 기능** (규정 관리, 사용자 관리)

### 🛠️ 관리자 기능
- **마크다운 에디터**: 실시간 미리보기 지원
- **규정 CRUD**: 생성, 읽기, 수정, 삭제
- **카테고리 관리**: 자동 카테고리 분류
- **키워드 관리**: 검색 최적화를 위한 키워드 설정

## 🚀 설치 및 실행 방법

### 1. 프로젝트 클론
```bash
git clone [repository-url]
cd hr_regulation_chatbot
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 빌드 (배포용)
```bash
npm run build
```

## 🔐 기본 로그인 정보

### 관리자 계정
- **사용자명**: `admin`
- **비밀번호**: `admin123`
- **권한**: 규정 관리, 사용자 관리, 모든 기능 접근

### 일반사용자 계정
- **사용자명**: `user`
- **비밀번호**: `user123`
- **권한**: 규정 검색 및 조회

## 📁 프로젝트 구조

```
hr_regulation_chatbot/
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── LoginForm.tsx    # 로그인 폼
│   │   ├── ChatInterface.tsx # 챗봇 인터페이스
│   │   ├── AdminPanel.tsx   # 관리자 패널
│   │   └── MainLayout.tsx   # 메인 레이아웃
│   ├── services/            # 비즈니스 로직
│   │   ├── authService.ts   # 인증 서비스
│   │   └── regulationService.ts # 규정 관리 서비스
│   ├── data/               # 데이터 파일
│   │   └── regulations.json # 규정 데이터
│   ├── types/              # TypeScript 타입 정의
│   │   └── index.ts
│   └── App.tsx             # 메인 앱 컴포넌트
├── public/                 # 정적 파일
└── package.json           # 프로젝트 설정
```

## 💾 데이터 저장 방식

### 로컬 스토리지 기반
- **규정 데이터**: `localStorage`의 `hr_regulations` 키
- **사용자 데이터**: `localStorage`의 `hr_users` 키
- **현재 사용자**: `localStorage`의 `hr_current_user` 키

### 초기 데이터
- 기본 규정 3개 (연차 휴가, 출장비, 재택근무)
- 기본 사용자 2명 (admin, user)

## 🔧 사용 방법

### 일반 사용자
1. **로그인**: 사용자명과 비밀번호 입력
2. **질문하기**: 챗봇에 자연어로 질문 입력
   - 예: "연차는 몇 일인가요?"
   - 예: "출장비 신청 방법"
   - 예: "재택근무 조건"
3. **결과 확인**: 구조화된 응답과 관련 규정 확인
4. **다음 단계**: 필요시 신청서나 결제 링크 클릭

### 관리자
1. **로그인**: 관리자 계정으로 로그인
2. **규정 관리**:
   - 새 규정 추가 (마크다운 지원)
   - 기존 규정 수정/삭제
   - 실시간 미리보기
3. **사용자 관리**: 사용자 목록 및 권한 확인
4. **시스템 설정**: 통계 및 설정 확인

## 🎯 검색 팁

### 효과적인 질문 방법
- **구체적인 키워드 사용**: "연차", "출장비", "재택근무"
- **자연어 질문**: "연차는 몇 일까요?", "출장비 어떻게 신청하나요?"
- **카테고리별 검색**: "휴가 관련", "경비 관련", "근무 관련"

### 검색 결과 해석
- **매칭도 점수**: 높을수록 관련성 높음
- **매칭 타입**: 제목 > 키워드 > 내용 순으로 정확도 높음
- **관련 규정**: 추가로 참고할 만한 규정 제시

## 🛡️ 보안 고려사항

### 현재 구현
- 기본적인 비밀번호 인증
- 로컬 스토리지 기반 세션 관리
- 역할 기반 접근 제어

### 운영 환경 권장사항
- HTTPS 사용 필수
- 강력한 비밀번호 정책
- 세션 타임아웃 설정
- 데이터베이스 연동 (PostgreSQL, MySQL 등)
- JWT 토큰 기반 인증

## 🚀 GitHub Pages 배포

### 1. GitHub 저장소 생성
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin [your-github-repo-url]
git push -u origin main
```

### 2. GitHub Pages 설정
1. GitHub 저장소 → Settings → Pages
2. Source: "GitHub Actions" 선택
3. 자동 배포 워크플로우 생성

### 3. 배포 스크립트 (package.json)
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

## 🔄 확장 가능성

### 단기 개선사항
- **벡터 검색**: 의미 기반 검색 강화
- **다국어 지원**: 영어/중국어 등 추가
- **파일 업로드**: PDF, Word 문서 지원
- **검색 히스토리**: 사용자별 검색 기록

### 장기 개선사항
- **AI 챗봇 연동**: OpenAI, Claude 등 LLM 연동
- **실시간 알림**: 규정 변경 시 알림
- **승인 워크플로우**: 규정 변경 승인 프로세스
- **분석 대시보드**: 검색 패턴 분석

## 🐛 문제 해결

### 자주 발생하는 문제

1. **로그인이 안 될 때**
   - 브라우저 캐시 삭제
   - 로컬 스토리지 초기화: `localStorage.clear()`

2. **검색 결과가 없을 때**
   - 키워드 변경해서 재시도
   - 관리자에게 새 규정 추가 요청

3. **데이터가 사라졌을 때**
   - 브라우저 개발자 도구에서 로컬 스토리지 확인
   - 페이지 새로고침으로 기본 데이터 복원

## 📞 지원 및 문의

### 기술 지원
- **개발팀**: [개발팀 이메일]
- **사용자 가이드**: 이 README 파일 참조
- **버그 리포트**: GitHub Issues 활용

### 사용자 교육
- **관리자 교육**: 규정 관리 방법
- **일반 사용자 교육**: 효과적인 검색 방법
- **정기 업데이트**: 새 기능 안내

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🙏 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**개발 완료 시간**: 약 3시간  
**난이도**: 초급~중급  
**기술 스택**: React, TypeScript, Tailwind CSS, Vite