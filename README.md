# 🎨 Sketchbook V2

https://sketchbook-v2.vercel.app/

**Sketchbook V2**는 개발 실험과 아이디어를 기록하는 **Next.js 기반 모노레포 프로젝트**입니다.  
**pnpm, Turborepo, ShadCN UI**를 활용하여 **효율적인 패키지 관리 및 최신 웹 기술**을 적용했습니다.


## 프로젝트 목표
- 다양한 최신 웹 기술을 실험하고 적용 <br/>
- 모노레포 환경에서 효율적인 패키지 관리 경험 <br/>
- UI 및 상태 관리 라이브러리 최적화

📌 이 프로젝트는 지속적으로 개선되며, 다양한 기능이 추가될 예정입니다! 🚀

---

## 🚀 Sketchbook V2 vs. V1
| Feature           | V1         | V2 (현재 프로젝트)          |
|------------------|------------|---------------------------|
| **프레임워크**   | React      | **Next.js**               |
| **패키지 관리**  | 단일 레포      | **pnpm + Turborepo (모노레포)** |
| **스타일 라이브러리** | Ant Design | **ShadCN UI (Tailwind 기반)** |

---

## 프로젝트 메뉴 구성
### Playground
- **피아노** - Web Audio API를 활용한 가상 피아노
- **투두리스트** - `Redux` & `Zustand` 상태 관리 테스트
- **게시판** - 글 생성, 수정 삭제 서버 연동

### Game
- **테트리스** 
- **지뢰찾기**

### Service
### 🚀 AI 여행지 추천

- **기술 스택**: OpenAI ChatGPT API
- **설명**: 사용자가 추천받고 싶은 여행 관련 키워드를 입력하면 AI가 추천해줍니다.

---

### 📰 Geek News RSS
- **설명**: Geek News에서 제공하는 최신 개발자 뉴스를 가져와 보여줍니다.
---

### 🚇 지하철 혼잡도 시각화

- **기술 스택**: D3.js, 서울시 공공데이터 (JSON)
- **설명**: 호선/역을 선택하여 시간대별 혼잡도 차트로 보여줍니다.
- **특징**:
  - Open API 미제공으로 정적 JSON 파일 기반
  - Next.js route handler 사용
---

## ⚡ 기술 스택
- **Frontend**: Next.js, TypeScript
- **모노레포 관리**: pnpm, Turborepo
- **UI 라이브러리**: ShadCN UI (Tailwind 기반)
- **데이터 시각화**: D3.js
- **서버 연동**: prisma, Next.js API Routes, postgre, supabase
---

## 📌 설치 및 실행
### 1️⃣ 프로젝트 클론
```sh
git clone https://github.com/your-repo/sketchbook-v2.git
cd sketchbook-v2
```