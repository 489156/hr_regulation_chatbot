# 사내규정 Q&A 챗봇 - 완전한 구현 가이드



# 📋 프로젝트 개요



GitHub Pages + JSON + 순수 JavaScript만으로 동작하는 완전한 사내규정 Q&A 챗봇을 구축합니다.초보자도 따라할 수 있도록 모든 코드와 설정을 제공합니다.

## 🎯 핵심 특징



✅ 서버 불필요: 완전한 클라이언트 사이드 시스템✅ 출처 강제 표시: 모든 답변에 규정명, 버전, 시행일 포함✅ 하이브리드 검색: 키워드 + 수치 + 절차 통합 매칭✅ 구조화된 응답: 결론→핵심정보→출처→다음단계→예외사항✅ 3시간 구현: 코드 복사만으로 완성 가능

##  🏗️시스템 아키텍처



[GitHub Pages]    │    ├── index.html          # 메인 UI 구조    ├── app.js             # JavaScript 로직 (초기화~검색)    ├── style.css          # 완전한 스타일링    └── data.json          # 사내규정 데이터

외부 의존성 없음 - 단 4개 파일로 완전한 시스템 구성

🚀 단계별 구현 가이드

## 1단계: GitHub 리포지토리 생성 (5분)



1. GitHub 접속 → "New repository" 클릭2. Repository name: hr-policy-chatbot 3. Public 선택 (GitHub Pages 무료 사용)4. Create repository 클릭

## 2단계: 파일 생성 및 업로드 (20분)



## 2-1. data.json 생성



GitHub 리포지토리에서 "Create new file" → data.json

{  "metadata": {    "lastUpdated": "2025-01-01",    "version": "1.0",    "totalPolicies": 6  },  "policies": [    {      "id": "HR-TRVL-2025-02",      "title": "출장 규정(국내/해외)",      "version": "v2.1",      "effectiveDate": "2025-01-15",      "owner": "총무팀",      "status": "active",      "category": "출장",      "sections": [        {          "section": "3",          "title": "비용 기준",          "content": "Tier1(서울, 도쿄, 뉴욕 등): 숙박 160,000원/박, 식비 35,000원/일, Tier2(          "keywords": ["출장", "숙박비", "tier1", "tier2", "식비", "160000", "120000"],          "amounts": [160000, 120000, 35000, 30000],          "procedures": ["출장신청서", "영수증"],          "exceptions": []        },        {          "section": "4",           "title": "승인 절차",          "content": "국내출장: 팀장 승인, 1박 초과시 본부장 승인 추가. 해외출장: 본부장 + CFO 사          "keywords": ["승인", "절차", "팀장", "본부장", "CFO"],          "amounts": [1],          "procedures": ["팀장 승인", "본부장 승인", "CFO 승인"],          "exceptions": ["1박 초과시"]        },        {          "section": "7",          "title": "예외 및 특례",           "content": "임원의 경우 Tier1 도시 숙박 상한을 200,000원까지 예외적으로 인정. 기타 특수          "keywords": ["임원", "예외", "200000", "CFO"],          "amounts": [200000],          "procedures": ["CFO 승인"],          "exceptions": ["임원: 상한 20만원까지 허용"]        }      ]    },    {      "id": "HR-LEAVE-2025-01",      "title": "휴가/휴직 규정",      "version": "v3.0",       "effectiveDate": "2025-01-01",      "owner": "HR운영팀",      "status": "active",      "category": "휴가",      "sections": [        {          "section": "1",          "title": "연차휴가",          "content": "입사 1년차 15일, 2년차부터 매년 1일씩 추가하여 최대 25일. 미사용시 익년 2월          "keywords": ["연차", "휴가", "15일", "25일", "이월"],          "amounts": [15, 25, 1, 2],          "procedures": ["연차신청서", "승인"],          "exceptions": ["2월 말까지 이월"]        }      ]    },    {      "id": "HR-WEL-2025-03",       "title": "복리후생 지침",      "version": "v2.3",      "effectiveDate": "2025-03-01",      "owner": "복리후생팀",      "status": "active",      "category": "복리후생",      "sections": [        {          "section": "1",          "title": "복지포인트",          "content": "연간 1,000,000포인트 지급, 월할 계산시 100,000포인트. 12개월 미만 근무자는          "keywords": ["복지포인트", "1000000", "100만", "600000"],          "amounts": [1000000, 600000, 12],          "procedures": ["자동지급", "월할계산"],          "exceptions": ["12개월 미만: 월할 계산"]        }      ]    }  ],  "commonQuestions": [    {      "question": "해외출장 Tier1 숙박비 상한은?",      "category": "출장",      "keywords": ["해외", "tier1", "숙박비"]    },    {      "question": "연차휴가는 몇 일까지?",       "category": "휴가",      "keywords": ["연차", "휴가", "일수"]    },    {      "question": "복지포인트 연간 얼마?",      "category": "복리후생",       "keywords": ["복지포인트", "연간"]    }  ]

}

## 2-2. index.html 생성



"Create new file" → index.html

<!DOCTYPE html><html lang="ko"><head>    <meta charset="UTF-8">    <meta name="viewport" content="width=device-width, initial-scale=1.0">    <title>사내규정 Q&A 챗봇</title>    <link rel="stylesheet" href="style.css">

</head><body>    <!-- 로딩 오버레이 -->    <div id="loadingOverlay" class="loading-overlay">        <div class="loading-content">            <div class="loading-spinner"></div>            <p>규정 데이터 로딩 중...</p>        </div>    </div>

<!-- 헤더 --><header class="app-header"><div class="container"><div class="header-content"><div class="logo-section"><div class="company-logo">🏢</div><div class="logo-text"><h1>사내규정 Q&A 챗봇</h1><small>하이브리드검색시스템 v1.0</small></div></div><div class="header-actions"><button class="category-filter-btn"onclick="toggleCategoryFilter()">📂카테고리</button><button class="admin-btn"onclick="toggleAdminMode()">⚙️관리자</button></div></div></div></header>

<!-- 카테고리 필터 바 --><div class="category-bar hidden" id="categoryBar">        <div class="container">            <div class="category-filters">                <button class="category-btn active" data-category="all" onclick="filterBy                <button class="category-btn" data-category="출장" onclick="filterByCategor                <button class="category-btn" data-category="휴가" onclick="filterByCategor                <button class="category-btn" data-category="복리후생" onclick="filterByCat                <button class="category-btn" data-category="재무" onclick="filterByCategor            </div>        </div></div>    <!-- 메인 컨테이너 -->    <main class="main-container">        <div class="container">            <!-- 사이드바 -->            <aside class="sidebar">                <div class="sidebar-section">                    <h3>최근 질문</h3>                    <div class="recent-questions" id="recentQuestions">                        <!-- 최근 질문들이 여기에 표시됩니다 -->                    </div>                </div>                                <div class="sidebar-section">                    <h3>자주 묻는 질문</h3>                    <div class="faq-list" id="faqList">                        <!-- 자주 묻는 질문들이 여기에 표시됩니다 -->                    </div>                </div>            </aside>            <!-- 채팅 영역 -->            <div class="chat-area">                <div class="chat-container">                    <div class="chat-messages" id="chatMessages">                        <div class="welcome-message">                            <div class="welcome-icon">🤖</div>                            <h3>사내규정 Q&A 챗봇에 오신 것을 환영합니다!</h3>                            <p>궁금한 규정이나 절차에 대해 질문해 주세요.</p>                            <div class="example-questions">                                <p><strong>예시 질문:</strong></p>                                <button class="example-btn" onclick="askQuestion('해외출장                                    해외출장 숙박비 상한은?                                </button>                                <button class="example-btn" onclick="askQuestion('연차휴가                                    연차휴가는 몇 일까지?                                </button>                            </div>                        </div>                    </div>                                        <div class="chat-input">                        <div class="input-container">                            <input                                 type="text"                                 id="questionInput"                                 placeholder="사내규정에 대해 질문해 주세요... (예: 해외출장 Ti                                maxlength="200"                            >                            <button class="send-btn" onclick="handleQuestion()">                                <span class="send-icon">📤</span>                                전송                            </button>                        </div>                    </div>                </div>            </div>        </div>    </main>    <!-- 관리자 모달 -->    <div id="adminModal" class="modal hidden">        <div class="modal-content">            <div class="modal-header">                <h3>관리자 로그인</h3>                <button class="modal-close" onclick="toggleAdminMode()">&times;</button>            </div>            <div class="modal-body">                <input                     type="password"                     id="adminPassword"                     placeholder="관리자 비밀번호 입력"                    onkeypress="if(event.key==='Enter') adminLogin()"                >                <button onclick="adminLogin()">로그인</button>            </div>        </div>    </div>    <!-- 관리자 패널 -->    <div id="adminPanel" class="admin-panel hidden">        <div class="admin-header">            <h3>관리자 패널</h3>            <button onclick="toggleAdminMode()">닫기</button>        </div>        <div class="admin-content">            <div class="admin-section">                <h4>규정 목록</h4>                <div id="regulationsList">                    <!-- 규정 목록이 여기에 표시됩니다 -->                </div>            </div>            <div class="admin-section">                <h4>질의응답 로그</h4>                <div id="queryLogs">                    <!-- 로그가 여기에 표시됩니다 -->                </div>            </div>        </div>    </div>    <script src="app.js"></script></body></html>

## 2-3. app.js 생성



"Create new file" → app.js

// =============================================================================// 사내규정 Q&A 챗봇 - 완전한 JavaScript 코드// GitHub Pages 호환, 순수클라이언트사이드시스템// =============================================================================

// 전역 변수 선언let policyData = null;let isAdminLoggedIn = false;let recentQuestions = [];let chatLogs = [];let currentCategoryFilter = 'all';

// DOM 요소 참조let elements = {};

// 하이브리드 검색 설정const SEARCH_WEIGHTS = {    KEYWORD: 6,    NUMERIC: 10,    PROCEDURE: 8,    CATEGORY_BONUS: 5};

const MIN_CONFIDENCE_SCORE = 5;const ADMIN_PASSWORD = "hr2025!";

document.addEventListener('DOMContentLoaded', function() {    console.log('🚀 사내규정 Q&A 챗봇 시작');    initializeApplication();

});

function initializeApplication() {try {// DOM 요소초기화initializeDOMElements();// 이벤트리스너설정setupEventListeners();// 데이터로드loadPolicyData();// UI 초기화initializeUI();console.log('✅애플리케이션초기화완료');    } catch (error) {console.error('❌초기화실패:', error);showError('시스템초기화에실패했습니다.');

    }}function initializeDOMElements() {    elements = {        questionInput: document.getElementById('questionInput'),        chatMessages: document.getElementById('chatMessages'),        sendBtn: document.querySelector('.send-btn'),        recentQuestions: document.getElementById('recentQuestions'),        loadingOverlay: document.getElementById('loadingOverlay'),        adminModal: document.getElementById('adminModal'),        adminPassword: document.getElementById('adminPassword'),        adminPanel: document.getElementById('adminPanel'),        regulationsList: document.getElementById('regulationsList'),        faqList: document.getElementById('faqList'),        categoryBar: document.getElementById('categoryBar'),        queryLogs: document.getElementById('queryLogs')    };        console.log('📋 DOM 요소 초기화 완료');}function setupEventListeners() {    // Enter 키로 질문 전송    if (elements.questionInput) {        elements.questionInput.addEventListener('keypress', function(e) {            if (e.key === 'Enter') {                handleQuestion();            }        });                // 실시간 입력 제안 (향후 확장 가능)        elements.questionInput.addEventListener('input', function(e) {            // TODO: 실시간 검색 제안 기능        });    }        console.log('🔗 이벤트 리스너 설정 완료');}function initializeUI() {    // 로컬 스토리지에서 최근 질문 불러오기    loadRecentQuestions();        // 자주 묻는 질문 로드    loadFAQ();        console.log('🎨 UI 초기화 완료');}// =============================================================================// 2. 데이터 로딩 함수들// =============================================================================    try {        showLoading(true);                const response = await fetch('./data.json');        if (!response.ok) {            throw new Error(`HTTP ${response.status}: ${response.statusText}`);        }                policyData = await response.json();                if (!policyData || !policyData.policies || !Array.isArray(policyData.policies)) {            throw new Error('유효하지 않은 데이터 형식입니다.');        }                console.log(`📊 정책 데이터 로드 완료: ${policyData.policies.length}개 규정`);                // UI 업데이트        updateAdminRegulationsList();        loadFAQ();                showLoading(false);            } catch (error) {        console.error('❌ 데이터 로딩 실패:', error);        showError(`규정 데이터를 불러올 수 없습니다: ${error.message}`);        showLoading(false);    }}function showLoading(show) {    if (elements.loadingOverlay) {        elements.loadingOverlay.style.display = show ? 'flex' : 'none';    }}function showError(message) {    if (elements.chatMessages) {        const errorHtml = `            <div class="message bot-message error">                <div class="message-avatar">❌</div>                <div class="message-content">                    <div class="error-content">                        <h4>시스템 오류</h4>                        <p>${message}</p>                        <button onclick="location.reload()" class="retry-btn">페이지 새로고                    </div>                </div>                <div class="message-time">${new Date().toLocaleTimeString()}</div>            </div>        `;        elements.chatMessages.innerHTML += errorHtml;        scrollToBottom();    }}// =============================================================================// 3. 하이브리드검색엔진// =============================================================================

function executeHybridSearch(query) {    if (!policyData || !policyData.policies) {        return [];    }        const queryLower = query.toLowerCase().trim();    const queryWords = queryLower.split(/\s+/).filter(word => word.length > 1);    const results = [];        console.log('🔍 검색 실행:', query, '→ 키워드:', queryWords);        policyData.policies.forEach(policy => {        // 카테고리 필터 적용        if (currentCategoryFilter !== 'all' && policy.category !== currentCategoryFilter)            return;        }                policy.sections.forEach(section => {            const score = calculateSectionScore(section, policy, queryLower, queryWords,                         if (score.total >= MIN_CONFIDENCE_SCORE) {                results.push({                    policy,                    section,                    totalScore: score.total,                    scoreBreakdown: score.breakdown,                    matchedQuery: query                });            }        });    });        // 점수 내림차순으로 정렬하고 상위 10개만 반환    return results        .sort((a, b) => b.totalScore - a.totalScore)        .slice(0, 10);}function calculateSectionScore(section, policy, queryLower, queryWords, originalQuery) {    const scoreBreakdown = {        exactMatch: 0,        keywordMatch: 0,        amountMatch: 0,        procedureMatch: 0,        categoryBonus: 0    };        const sectionText = section.content.toLowerCase();    const titleText = section.title.toLowerCase();        // 1. 정확한 매칭 (최고 점수)    if (sectionText.includes(queryLower) || titleText.includes(queryLower)) {        scoreBreakdown.exactMatch = 15;    }    });    }    }    }// 5. 카테고리보너스if (policy.category && queryLower.includes(policy.category)) {        scoreBreakdown.categoryBonus = 5;    }const totalScore = Object.values(scoreBreakdown).reduce((sum, score) => sum + score, if (totalScore >= 5) {console.log(`📊검색결과: ${policy.title} §${section.section} - 점수: ${totalScore}    }return {total: totalScore,breakdown: scoreBreakdown// 2. 키워드 매칭    queryWords.forEach(word => {        if (titleText.includes(word)) {            scoreBreakdown.keywordMatch += 8;        }        if (sectionText.includes(word)) {            scoreBreakdown.keywordMatch += 5;        }// 추가: 키워드 태그 매칭if (section.keywords) {        section.keywords.forEach(keyword => {            if (keyword.toLowerCase().includes(word)) {                scoreBreakdown.keywordMatch += 6;            }        });// 3. 숫자(금액) 매칭const queryNumbers = originalQuery.match(/\d+/g);if (queryNumbers && section.amounts) {        queryNumbers.forEach(num => {            const numValue = parseInt(num);            if (section.amounts.includes(numValue)) {                scoreBreakdown.amountMatch += 10;            } else if (section.amounts.some(amount => Math.abs(amount - numValue) / amoun                scoreBreakdown.amountMatch += 5;            }        });// 4. 절차 키워드 매칭const procedureKeywords = ['신청', '승인', '절차', '방법', '과정'];if (procedureKeywords.some(kw => queryLower.includes(kw))) {        if (section.procedures && section.procedures.length > 0) {            scoreBreakdown.procedureMatch = 8;        }    };}// =============================================================================// 4. 응답 생성 함수들// =============================================================================function generateStructuredResponse(searchResults, originalQuery) {    if (!searchResults || searchResults.length === 0) {        return generateNoResultResponse(originalQuery);    }        const topResult = searchResults[0];    const { policy, section } = topResult;        // 1. 결론 생성 (맞춤형)    let conclusion = `${policy.title} ${section.section}조에 따르면, `;        if (originalQuery.includes('상한') || originalQuery.includes('한도')) {        conclusion += `해당 항목의 상한은 **${formatAmount(section.amounts)}**입니다.`;    } else if (originalQuery.includes('절차') || originalQuery.includes('방법')) {        conclusion += `절차는 **${section.procedures?.join(' → ') || '해당 부서 문의'}**입니    } else if (originalQuery.includes('얼마') || originalQuery.includes('금액')) {        conclusion += `관련 금액 기준은 **${formatAmount(section.amounts)}**입니다.`;    } else {        conclusion += `${highlightImportantInfo(section.content)}`;    }        // 2. 핵심 정보 추출    const keyInfo = extractKeyInfo(section, originalQuery);        // 3. 다음 단계 생성    let nextSteps = `${policy.owner}에 문의하거나 관련 신청서를 작성하세요.`;    if (section.procedures && section.procedures.length > 0) {        nextSteps = section.procedures.join(' → ');    }        // 4. 주의사항 수집    const warnings = [];    if (section.exceptions && section.exceptions.length > 0) {        warnings.push(...section.exceptions);    }    if (policy.status !== 'active') {        warnings.push('⚠️ 주의: 현재 비활성 상태인 규정입니다.');    }        return {        conclusion: conclusion,        keyInfo: keyInfo,        source: {            title: policy.title,            version: policy.version,            effectiveDate: policy.effectiveDate,            section: `§${section.section}`,            owner: policy.owner        },        nextSteps: nextSteps,        warnings: warnings.length > 0 ? warnings : null,        confidence: calculateConfidence(topResult.totalScore),        additionalResults: searchResults.slice(1, 3) // 추가 관련 결과    };}function generateNoResultResponse(query) {    return {        conclusion: `**"${query}"**에 대한 정확한 규정을 찾을 수 없습니다. HR팀 상담을 권장합니다        keyInfo: null,        source: null,        nextSteps: "HR팀 상담 티켓을 생성하거나 직접 문의하세요.",        warnings: ["정확한 답변을 위해 HR팀에 문의해 주세요."],        confidence: 0,        isTicketNeeded: true    };}function extractKeyInfo(section, query) {    const keyInfo = {};        // 금액 정보 추출    if (section.amounts && section.amounts.length > 0) {        if (query.includes('tier1') || query.includes('Tier1')) {            const tier1Amounts = section.content.match(/Tier1[^0-9]*(\d{1,3}(?:,\d{3})*)/            if (tier1Amounts) {                keyInfo['Tier1 기준'] = tier1Amounts[0].match(/(\d{1,3}(?:,\d{3})*)/)[1] +            }        }        if (query.includes('tier2') || query.includes('Tier2')) {            const tier2Amounts = section.content.match(/Tier2[^0-9]*(\d{1,3}(?:,\d{3})*)/            if (tier2Amounts) {                keyInfo['Tier2 기준'] = tier2Amounts[0].match(/(\d{1,3}(?:,\d{3})*)/)[1] +            }        }                // 일반 금액 정보        section.amounts.forEach((amount, index) => {            if (amount >= 1000) {                keyInfo[`금액 ${index + 1}`] = amount.toLocaleString() + '원';            } else if (amount <= 30) {                keyInfo[`일수/개수`] = amount + '일';            }        });    }        // 절차 정보    if (section.procedures && section.procedures.length > 0) {        keyInfo['처리 절차'] = section.procedures.join(' → ');    }        return Object.keys(keyInfo).length > 0 ? keyInfo : null;}function highlightImportantInfo(content) {    let highlighted = content;        // 금액 강조    highlighted = highlighted.replace(/(\d{1,3}(?:,\d{3})*원)/g, '<span class="amount-hig        // Tier 강조      highlighted = highlighted.replace(/(Tier[12])/gi, '<strong>$1</strong>');        // 일수 강조    highlighted = highlighted.replace(/(\d+일)/g, '<strong style="color: var(--success-co        // 중요 키워드 강조    const importantKeywords = ['필수', '금지', '예외', '승인', '신청'];    importantKeywords.forEach(keyword => {        const regex = new RegExp(keyword, 'gi');        highlighted = highlighted.replace(regex, '<strong style="color: var(--primary-col    });        return highlighted;}function formatAmount(amounts) {    if (!amounts || amounts.length === 0) return '';        return amounts        .filter(amount => amount >= 1000)        .map(amount => amount.toLocaleString() + '원')        .join(', ');}function calculateConfidence(score) {    // 0-100% 신뢰도 계산    const maxScore = 50; // 예상 최대 점수    let confidence = Math.min(100, Math.round((score / maxScore) * 100));        // 최소 30% 보장    if (confidence < 30) confidence = 30;        return confidence;}// =============================================================================// 5. UI 업데이트 함수들  // =============================================================================function handleQuestion() {    const query = elements.questionInput?.value.trim();        if (!query) {        alert('질문을 입력해 주세요.');        elements.questionInput?.focus();        return;    }        if (!policyData) {        alert('규정 데이터가 아직 로드되지 않았습니다. 잠시 후 다시 시도해 주세요.');        return;    }        // 사용자 질문 표시    displayUserMessage(query);        // 검색 실행 및 답변 생성    performSearch(query);        // 입력창 초기화    elements.questionInput.value = '';        // 최근 질문에 추가    addToRecentQuestions(query);}function askQuestion(question) {    if (elements.questionInput) {        elements.questionInput.value = question;        elements.questionInput.focus();        handleQuestion();    }}function displayUserMessage(message) {    const messageHtml = `        <div class="message user-message">            <div class="message-avatar">👤</div>            <div class="message-content">                <p>${escapeHtml(message)}</p>            </div>            <div class="message-time">${new Date().toLocaleTimeString()}</div>        </div>    `;        elements.chatMessages.innerHTML += messageHtml;    scrollToBottom();}function performSearch(query) {    try {        console.log('🔎 검색 시작:', query);                // 로딩 메시지 표시        const loadingId = showLoadingMessage();                // 검색 실행        const results = executeHybridSearch(query);                // 로딩 메시지 제거        removeLoadingMessage(loadingId);                // 응답 생성 및 표시        const response = generateStructuredResponse(results, query);        displayBotResponse(response, query);                // 로그 저장        saveChatLog(query, response, results.length);                console.log('✅ 검색 완료:', {            query: query,            resultsCount: results.length,            category: currentCategoryFilter,            topScore: results[0]?.totalScore || 0        });            } catch (error) {        console.error('❌ 검색 오류:', error);        removeLoadingMessage(loadingId);        displayErrorMessage('검색 중 오류가 발생했습니다.');    }}function showLoadingMessage() {    const loadingId = `loading-${Date.now()}`;    const loadingHtml = `        <div id="${loadingId}" class="message bot-message loading">            <div class="message-avatar">🤖</div>            <div class="message-content">                <div class="loading-dots">                    <span></span><span></span><span></span>                </div>                <p>규정을 검색하고 있습니다...</p>            </div>        </div>    `;        elements.chatMessages.innerHTML += loadingHtml;    scrollToBottom();    return loadingId;}function removeLoadingMessage(loadingId) {    const loadingElement = document.getElementById(loadingId);    if (loadingElement) {        loadingElement.remove();    }}function displayBotResponse(response, originalQuery) {    const confidence = response.confidence || 0;    const confidenceClass = getConfidenceClass(confidence);        let responseHtml = `        <div class="message bot-message">            <div class="message-avatar">🤖</div>            <div class="message-content">                <div class="response-header">                    <div class="confidence-badge ${confidenceClass}                        신뢰도 ${confidence}%                    </div>                </div>

">${createAnswerSectionsHTML(response)}            </div>            <div class="message-time">${new Date().toLocaleTimeString()}</div>        </div>    `;    elements.chatMessages.innerHTML += responseHtml;scrollToBottom();}

function createAnswerSectionsHTML(response) {let html = '';// 1. 결론    html += `        <div class="answer-section">            <div class="section-header">                <span class="section-icon">📋</span>                <h3 class="section-title">결론</h3>            </div>            <div class="conclusion-content">${response.conclusion}            </div>        </div>    `;    }

// 2. 핵심 정보if (response.keyInfo) {        html += `            <div class="answer-section">                <div class="section-header">                    <span class="section-icon">📊</span>                    <h3 class="section-title">핵심 정보</h3>                </div>                <table class="key-info-table">                    <tbody>                        ${Object.entries(response.keyInfo).map(([key, value]) => `                            <tr>                                <th>${key}</th>                                <td>${formatAmount(value)}</td>                            </tr>                        `).join('')}                    </tbody>                </table>            </div>        `;

// 3. 출처if (response.source) {        html += `            <div class="answer-section">                <div class="section-header">                    <span class="section-icon">📚</span>                    <h3 class="section-title">출처</h3>                </div>                <div class="source-info">                    <div class="source-badge">                        <div class="source-title">${response.source.title}</div>                        <div class="source-meta">                            ${response.source.version} | ${response.source.effectiveDate}                        </div>                    </div>                </div>            </div>        `;    }

// 4. 다음단계    html += `        <div class="answer-section">            <div class="section-header">                <span class="section-icon">⏭️</span>                <h3 class="section-title">다음단계</h3>            </div>            <div class="next-steps-content">                <p>${response.nextSteps}</p>                <div class="action-buttons">${response.isTicketNeeded ? '<button class="action-button" onclick="contactHR(\'email\')">HR팀'<button class="action-button" onclick="contactHR(\'phone\')">HR팀'<button class="action-button" onclick="contactHR(\'email\')">문의                    }                    <button class="action-button" onclick="copyResult('${escapeQuotes(res                </div>            </div>        </div>    `;// 5. 주의사항if (response.warnings && response.warnings.length > 0) {        html += `            <div class="answer-section">                <div class="section-header">                    <span class="section-icon">⚠️</span>                    <h3 class="section-title">주의사항</h3>                </div>                <div class="warnings-content">${response.warnings.map(warning => `                        <div class="warning-item">                            <span class="warning-icon">⚠️</span>                            <span>${warning}</span>                        </div>                    `).join('')}                </div>            </div>        `;    }return html;}function getConfidenceClass(confidence) {if (confidence >= 80) return'high';if (confidence >= 60) return'medium'; return'low';}

function scrollToBottom() {if (elements.chatMessages) {        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;    }}

function displayErrorMessage(message) {    const errorHtml = `        <div class="message bot-message error">            <div class="message-avatar">❌</div>            <div class="message-content">                <p>${message}</p>            </div>            <div class="message-time">${new Date().toLocaleTimeString()}</div>        </div>    `;        elements.chatMessages.innerHTML += errorHtml;    scrollToBottom();}

![d12e61cecf370d835e430674ca66b845](https://picture-search.skywork.ai/image/doc/d12e61cecf370d835e430674ca66b845.jpg)



function escapeHtml(text) {    const div = document.createElement('div');    div.textContent = text;    return div.innerHTML;}function escapeQuotes(str) {    return str.replace(/'/g, "\\'").replace(/"/g, '\\"');}function addToRecentQuestions(question) {    // 중복 제거    recentQuestions = recentQuestions.filter(q => q !== question);        // 맨 앞에 추가    recentQuestions.unshift(question);        // 최대 5개만 유지    if (recentQuestions.length > 5) {        recentQuestions = recentQuestions.slice(0, 5);    }        // 로컬 스토리지에 저장    try {        localStorage.setItem('hr-chatbot-recent', JSON.stringify(recentQuestions));    } catch (e) {        console.warn('로컬 스토리지 저장 실패:', e);    }        // UI 업데이트    updateRecentQuestionsUI();}function loadRecentQuestions() {    try {        const saved = localStorage.getItem('hr-chatbot-recent');        if (saved) {            recentQuestions = JSON.parse(saved);            updateRecentQuestionsUI();        }    } catch (e) {        console.warn('최근 질문 로드 실패:', e);        recentQuestions = [];    }}function updateRecentQuestionsUI() {    if (!elements.recentQuestions) return;        if (recentQuestions.length === 0) {        elements.recentQuestions.innerHTML = '<p class="empty-text">최근 질문이 없습니다</p        return;    }        elements.recentQuestions.innerHTML = recentQuestions        .map(question => `            <button class="recent-question-btn" onclick="askQuestion('${escapeQuotes(ques                ${escapeHtml(question)}            </button>        `).join('');}function loadFAQ() {    if (!elements.faqList || !policyData?.commonQuestions) return;        elements.faqList.innerHTML = policyData.commonQuestions        .map(item => `            <button class="faq-item" onclick="askQuestion('${escapeQuotes(item.question)}                <div class="faq-question">${escapeHtml(item.question)}</div>                <div class="faq-category">${escapeHtml(item.category)}</div>            </button>        `).join('');}function saveChatLog(question, response, resultsCount) {    const log = {        timestamp: new Date().toISOString(),        question: question,        answerSummary: response.conclusion?.slice(0, 100) || 'No answer',        confidence: response.confidence || 0,        resultsCount: resultsCount,        category: currentCategoryFilter,        source: response.source?.title || 'No source'    };        chatLogs.unshift(log);        // 최대 50개 로그만 유지    if (chatLogs.length > 50) {        chatLogs = chatLogs.slice(0, 50);    }        updateAdminLogsUI();}// =============================================================================// 7. 관리자 기능들// =============================================================================

function toggleAdminMode() {    if (!isAdminLoggedIn) {        if (elements.adminModal) {            elements.adminModal.classList.toggle('hidden');            elements.adminPassword?.focus();        }    } else {        if (elements.adminPanel) {            elements.adminPanel.classList.toggle('hidden');        }    }}

function adminLogin() {const password = elements.adminPassword?.value;if (password === ADMIN_PASSWORD) {        isAdminLoggedIn = true;        elements.adminModal?.classList.add('hidden');        elements.adminPanel?.classList.remove('hidden');        elements.adminPassword.value = '';updateAdminRegulationsList();updateAdminLogsUI();console.log('✅관리자로그인성공');    } else {alert('잘못된비밀번호입니다.');        elements.adminPassword?.focus();    }}

function updateAdminRegulationsList() {if (!elements.regulationsList || !policyData?.policies) return;    elements.regulationsList.innerHTML = policyData.policies        .map(policy =>`            <div class="regulation-item">                <div class="regulation-header">                    <strong>${policy.title}</strong>                    <span class="regulation-meta">${policy.version} | ${policy.effectiveD                </div>                <div class="regulation-details">                    <span class="regulation-owner">${policy.owner}</span>                    <span class="regulation-category">${policy.category}</span>                    <span class="regulation-status ${policy.status}">${policy.status}</sp                </div>                <div class="regulation-sections">                    ${policy.sections.length}개 조항                </div>            </div>        `).join('');}function updateAdminLogsUI() {    if (!elements.queryLogs) return;        if (chatLogs.length === 0) {        elements.queryLogs.innerHTML = '<p class="empty-text">질의응답 로그가 없습니다</p>';        return;    }        elements.queryLogs.innerHTML = chatLogs        .slice(0, 20) // 최근 20개만 표시        .map(log => `            <div class="log-item">                <div class="log-header">                    <span class="log-time">${new Date(log.timestamp).toLocaleString()}</s                    <span class="log-confidence ${getConfidenceClass(log.confidence)}">                        ${log.confidence}%                    </span>                </div>                <div class="log-question">${escapeHtml(log.question)}</div>                <div class="log-answer">${escapeHtml(log.answerSummary)}...</div>                <div class="log-meta">                    <span>${log.source}</span>                    <span>${log.resultsCount}개 결과</span>                    <span>${log.category}</span>                </div>            </div>        `).join('');}// =============================================================================// 8. 카테고리 및 필터 기능들// =============================================================================function toggleCategoryFilter() {    if (elements.categoryBar) {        elements.categoryBar.classList.toggle('hidden');    }}function filterByCategory(category) {    currentCategoryFilter = category;        // 활성 상태 업데이트    document.querySelectorAll('.category-btn').forEach(btn => {        if (btn.dataset.category === category) {            btn.classList.add('active');        } else {            btn.classList.remove('active');        }    });        console.log('🏷️ 카테고리 필터 변경:', category);}

// =============================================================================// 9. 외부연동함수들// =============================================================================

function contactHR(type) {    switch(type) {        case 'email':            window.open('mailto:hr@company.com?subject=사내규정 문의', '_blank');            break;        case 'phone':            alert('HR팀 전화번호: 02-1234-5678\n\n업무시간: 평일 09:00-18:00');            break;        default:            alert('HR팀 연락처:\n📞 02-1234-5678\n📧 hr@company.com');    }}

function copyResult(text) {    if (navigator.clipboard) {        navigator.clipboard.writeText(text).then(() => {            alert('결과가 클립보드에 복사되었습니다!');        }).catch(() => {            fallbackCopy(text);        });    } else {        fallbackCopy(text);    }}

function fallbackCopy(text) {    const textArea = document.createElement('textarea');    textArea.value = text;    document.body.appendChild(textArea);    textArea.select();        try {        document.execCommand('copy');        alert('결과가 복사되었습니다!');    } catch (err) {        alert('복사에 실패했습니다. 수동으로 복사해 주세요.');    } finally {        document.body.removeChild(textArea);    }}// =============================================================================// 10. 디버그 및 개발 도구들// =============================================================================

// 개발자 콘솔에서 사용할 수 있는 디버그 함수들if (typeof window !== 'undefined') {    window.hrChatbotDebug = {        // 현재 데이터 확인        showData: () => {            console.log('📊 정책 데이터:', policyData);        },                // 검색 테스트        testSearch: (query) => {            if (!policyData) {                console.log('데이터가 로드되지 않았습니다');                return;            }            const results = executeHybridSearch(query);            console.log(`검색어: "${query}"`, results);            return results;        },                // 히스토리 확인        showHistory: () => {            console.log('📜 검색 히스토리:', recentQuestions);        },                // 통계 정보        getStats: () => {            return {                totalPolicies: policyData?.policies?.length || 0,                currentCategory: currentCategoryFilter,                searchHistoryLength: recentQuestions.length,                chatLogsLength: chatLogs.length            };        }    };        console.log('🛠️ 디버그 도구가 window.hrChatbotDebug에 추가되었습니다');}

## 2-4. style.css 생성



"Create new file" → style.css

/* =============================================================================   사내규정 Q&A 챗봇 - 완전한 CSS 스타일   GitHub Pages 호환, 모던 HR 시스템 디자인   ============================================================================= */:root {/* 기본 컬러 팔레트 */--primary-color: #2563eb;--primary-dark: #1e40af;--secondary-color: #64748b;--success-color: #10b981;--warning-color: #f59e0b;--error-color: #ef4444;

/* 배경색 */--background: #f8fafc;--card-background: #ffffff;--border-color: #e2e8f0;

/* 텍스트 색상 */--text-primary: #1e293b;--text-secondary: #64748b;

}

/* 그림자 및 효과 */--shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);--border-radius: 12px;--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* 기본 설정 */* {    margin: 0;    padding: 0;    box-sizing: border-box;}

body {    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', s    line-height: 1.6;    color: var(--text-primary);    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);    min-height: 100vh;}

.loading-overlay {    position: fixed;    top: 0;    left: 0;    width: 100%;    height: 100%;    background: rgba(255, 255, 255, 0.95);    display: flex;    align-items: center;    justify-content: center;    z-index: 9999;    transition: opacity 0.5s ease;

}.loading-overlay.hidden {opacity: 0;pointer-events: none;}

.loading-content {text-align: center;padding: 2rem;}

.loading-spinner {width: 48px;height: 48px;border: 4px solid var(--border-color);border-top: 4px solid var(--primary-color);border-radius: 50%;animation: spin 1s linear infinite;margin: 0 auto 1rem;}

@keyframes spin {    from { transform: rotate(0deg); }    to { transform: rotate(360deg); }}

.app-header {    padding: 2rem 0;    color: white;}

.container {max-width: 1200px;margin: 0 auto;padding: 01rem;}

.header-content {display: flex;justify-content: space-between;align-items: center;background: rgba(255, 255, 255, 0.1);backdrop-filter: blur(20px);border-radius: var(--border-radius);padding: 2rem;border: 1px solid rgba(255, 255, 255, 0.2);}

.logo-section {display: flex;align-items: center;gap: 1rem;}.company-logo {    font-size: 3rem;    background: rgba(255, 255, 255, 0.2);    padding: 1rem;    border-radius: 50%;    backdrop-filter: blur(10px);}.logo-text h1 {    font-size: 2rem;    font-weight: 700;    margin-bottom: 0.25rem;    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);}.logo-text small {    font-size: 0.9rem;    opacity: 0.9;}.header-actions {    display: flex;    gap: 1rem;}.category-filter-btn,.admin-btn {    background: rgba(255, 255, 255, 0.2);    border: 1px solid rgba(255, 255, 255, 0.3);    color: white;    padding: 0.75rem 1.5rem;    border-radius: var(--border-radius);    cursor: pointer;    transition: var(--transition);    font-weight: 500;    backdrop-filter: blur(10px);}.category-filter-btn:hover,.admin-btn:hover {    background: rgba(255, 255, 255, 0.3);    transform: translateY(-2px);}/* =============================================================================

.category-bar {    background: rgba(255, 255, 255, 0.95);    backdrop-filter: blur(20px);    border-bottom: 1px solid var(--border-color);    padding: 1rem 0;    transition: var(--transition);}.category-bar.hidden {    transform: translateY(-100%);    opacity: 0;}.category-filters {    display: flex;    gap: 0.75rem;    flex-wrap: wrap;}.category-btn {    background: var(--background);    border: 1px solid var(--border-color);    padding: 0.5rem 1rem;    border-radius: 20px;    cursor: pointer;    transition: var(--transition);    font-size: 0.9rem;    font-weight: 500;}.category-btn:hover {    background: var(--border-color);}.category-btn.active {    background: var(--primary-color);    color: white;    border-color: var(--primary-color);}/* =============================================================================   메인 컨테이너   ============================================================================= */.main-container {    margin: 2rem 0;}.main-container .container {    display: grid;    grid-template-columns: 300px 1fr;    gap: 2rem;    max-width: 1400px;}/* =============================================================================   사이드바   ============================================================================= */.sidebar {    display: flex;    flex-direction: column;    gap: 1.5rem;}.sidebar-section {    background: var(--card-background);    border-radius: var(--border-radius);    padding: 1.5rem;    box-shadow: var(--shadow);}.sidebar-section h3 {    font-size: 1.1rem;    font-weight: 600;    margin-bottom: 1rem;    color: var(--text-primary);    border-bottom: 2px solid var(--primary-color);    padding-bottom: 0.5rem;}.recent-questions,.faq-list {    display: flex;    flex-direction: column;    gap: 0.5rem;}.recent-question-btn,.faq-item {    background: var(--background);    border: 1px solid var(--border-color);    border-radius: 8px;    padding: 0.75rem 1rem;    text-align: left;    cursor: pointer;    transition: var(--transition);    font-size: 0.9rem;}.recent-question-btn:hover,.faq-item:hover {    background: var(--primary-color);    color: white;    border-color: var(--primary-color);    transform: translateY(-1px);}.faq-question {    font-weight: 500;    margin-bottom: 0.25rem;}.faq-category {    font-size: 0.8rem;    opacity: 0.7;}.empty-text {    color: var(--text-secondary);    font-style: italic;    text-align: center;    padding: 2rem 1rem;}

.chat-area {    background: var(--card-background);    border-radius: var(--border-radius);    box-shadow: var(--shadow);    display: flex;    flex-direction: column;    height: calc(100vh - 200px);    min-height: 600px;}.chat-container {    display: flex;    flex-direction: column;    height: 100%;}.chat-messages {    flex: 1;    overflow-y: auto;    padding: 1.5rem;    scroll-behavior: smooth;}/* 환영 메시지 */.welcome-message {    text-align: center;    padding: 3rem 2rem;    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);    border-radius: var(--border-radius);    margin-bottom: 2rem;}.welcome-icon {    font-size: 4rem;    margin-bottom: 1rem;}.welcome-message h3 {    color: var(--primary-color);    margin-bottom: 1rem;    font-size: 1.5rem;}.welcome-message p {    color: var(--text-secondary);    margin-bottom: 2rem;}.example-questions {    display: flex;    flex-direction: column;    align-items: center;    gap: 1rem;}.example-questions p {    margin-bottom: 1rem;    font-weight: 600;}.example-btn {    background: var(--primary-color);    color: white;    border: none;    padding: 0.75rem 1.5rem;    border-radius: 25px;    cursor: pointer;    transition: var(--transition);    font-size: 0.9rem;}.example-btn:hover {    background: var(--primary-dark);    transform: translateY(-2px);}/* 메시지 스타일 */.message {    display: flex;    gap: 1rem;    margin-bottom: 1.5rem;    max-width: 100%;}.message-avatar {    width: 40px;    height: 40px;    border-radius: 50%;    display: flex;    align-items: center;    justify-content: center;    font-size: 1.2rem;    flex-shrink: 0;}.user-message .message-avatar {    background: var(--primary-color);    color: white;}.bot-message .message-avatar {    background: var(--success-color);    color: white;}.message-content {    flex: 1;    background: var(--background);    padding: 1rem 1.5rem;    border-radius: var(--border-radius);    position: relative;}.user-message .message-content {    background: var(--primary-color);    color: white;    margin-left: auto;    max-width: 70%;}.bot-message .message-content {    background: var(--card-background);    border: 1px solid var(--border-color);    max-width: 85%;}.message-time {    font-size: 0.75rem;    color: var(--text-secondary);    margin-top: 0.5rem;    text-align: right;}/* 로딩 메시지 */.loading {    opacity: 0.7;}.loading-dots {    display: flex;    gap: 0.25rem;    margin-bottom: 0.5rem;}.loading-dots span {    width: 8px;    height: 8px;    background: var(--primary-color);    border-radius: 50%;    animation: bounce 1.4s infinite ease-in-out;}.loading-dots span:nth-child(1) { animation-delay.loading-dots span:nth-child(2) { animation-delay@keyframes bounce {    0%, 80%, 100% {

: -0.32s; }: -0.16s; }        transform: scale(0);    }    40% {        transform: scale(1);    }}

   ============================================================================= */.response-header {    display: flex;    justify-content: space-between;    align-items: center;    margin-bottom: 1.5rem;}.confidence-badge {    background: var(--success-color);    color: white;    padding: 0.25rem 0.75rem;    border-radius: 20px;    font-size: 0.8rem;    font-weight: 600;}.confidence-badge.medium {    background: var(--warning-color);}.confidence-badge.low {    background: var(--error-color);}.answer-section {    margin-bottom: 2rem;    border-left: 4px solid var(--primary-color);    padding-left: 1rem;}.answer-section:last-child {    margin-bottom: 0;}.section-header {    display: flex;    align-items: center;    gap: 0.75rem;    margin-bottom: 1rem;}.section-icon {    font-size: 1.25rem;}.section-title {    font-size: 1.1rem;    font-weight: 600;    color: var(--text-primary);    margin: 0;}

/* 결론 스타일 */.conclusion-content {    font-size: 1.1rem;    line-height: 1.7;    color: var(--text-primary);    padding: 1.5rem;    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);    border-radius: var(--border-radius);    border-left: 4px solid var(--primary-color);}

/* 핵심 정보 테이블 */.key-info-table {    width: 100%;    border-collapse: collapse;    background: var(--card-background);    border-radius: var(--border-radius);    overflow: hidden;    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);}

.key-info-table th,.key-info-table td {padding: 1rem1.5rem;text-align: left;border-bottom: 1px solid var(--border-color);}

.key-info-table th {background: var(--background);font-weight: 600;color: var(--text-primary);}

.key-info-table tr:last-child td {border-bottom: none;}

.amount-highlight {color: var(--primary-color);font-weight: 700;font-size: 1.1em;}

/* 출처정보 */.source-info {display: grid;gap: 1rem;grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));}

.source-badge {    background: linear-gradient(135deg, var(--success-color),     color: white;    padding: 1rem 1.5rem;    border-radius: var(--border-radius);    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);    transition: var(--transition);}.source-badge:hover {    transform: translateY(-2px);    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);}.source-title {    font-weight: 700;    font-size: 1rem;    margin-bottom: 0.5rem;}.source-meta {    font-size: 0.9rem;    opacity: 0.95;}/* 다음 단계 */.next-steps-content {    background: #fffbeb;    border: 1px solid #fed7aa;    border-radius: var(--border-radius);    padding: 1.5rem;}.action-buttons {    display: flex;    flex-wrap: wrap;    gap: 0.75rem;    margin-top: 1rem;}.action-button {    background: var(--warning-color);    color: white;    border: none;    padding: 0.75rem 1.5rem;    border-radius: var(--border-radius);    font-weight: 500;    cursor: pointer;    transition: var(--transition);    text-decoration: none;    display: inline-block;}.action-button:hover {

#059669);    background: #d97706;    transform: translateY(-1px);    box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);}

/* 주의사항 */.warnings-content {background: #fef2f2;border: 1px solid #fecaca;border-radius: var(--border-radius);padding: 1.5rem;}

.warning-item {display: flex;align-items: flex-start;gap: 0.75rem;margin-bottom: 0.75rem;}

.warning-item:last-child {margin-bottom: 0;}

.warning-icon {color: var(--error-color);font-size: 1.1rem;margin-top: 0.1rem;}

.chat-input {    border-top: 1px solid var(--border-color);    padding: 1.5rem;}.input-container {    display: flex;    gap: 1rem;}#questionInput {    flex: 1;    padding: 1rem 1.5rem;    border: 2px solid var(--border-color);    border-radius: 25px;    font-size: 1rem;    transition: var(--transition);    background: var(--background);}#questionInput:focus {    outline: none;    border-color: var(--primary-color);    background: var(--card-background);    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);}

.send-btn {padding: 1rem2rem;background: var(--primary-color);color: white;border: none;border-radius: 25px;font-weight: 600;cursor: pointer;transition: var(--transition);display: flex;align-items: center;gap: 0.5rem;}

.send-btn:hover:not(:disabled) {background: var(--primary-dark);transform: translateY(-1px);}

.send-btn:disabled {opacity: 0.6;cursor: not-allowed;transform: none;}

.modal {    position: fixed;    top: 0;    left: 0;    width: 100%;    height: 100%;    background: rgba(0, 0, 0, 0.5);    display: flex;    align-items: center;    justify-content: center;    z-index: 1000;    transition: var(--transition);}.modal.hidden {    opacity: 0;    pointer-events: none;}.modal-content {    background: var(--card-background);    border-radius: var(--border-radius);    width: 90%;    max-width: 400px;    box-shadow: var(--shadow-lg);}.modal-header {    display: flex;    justify-content: space-between;    align-items: center;    padding: 1.5rem;    border-bottom: 1px solid var(--border-color);}.modal-header h3 {    margin: 0;    color: var(--text-primary);}.modal-close {    background: none;    border: none;    font-size: 1.5rem;    cursor: pointer;    color: var(--text-secondary);    padding: 0.25rem;}.modal-body {    padding: 1.5rem;    display: flex;    flex-direction: column;    gap: 1rem;}.modal-body input {    padding: 0.75rem 1rem;    border: 1px solid var(--border-color);    border-radius: var(--border-radius);    font-size: 1rem;}.modal-body button {    padding: 0.75rem 1.5rem;    background: var(--primary-color);    color: white;    border: none;    border-radius: var(--border-radius);    cursor: pointer;    transition: var(--transition);}.modal-body button:hover {    background: var(--primary-dark);}.admin-panel {position: fixed;top: 0;right: 0;width: 400px;height: 100%;background: var(--card-background);box-shadow: var(--shadow-lg);z-index: 1000;overflow-y: auto;transition: transform 0.3s ease;}

.admin-panel.hidden {transform: translateX(100%);}

.admin-header {background: var(--primary-color);color: white;padding: 1.5rem;display: flex;justify-content: space-between;align-items: center;}

.admin-header button {background: rgba(255, 255, 255, 0.2);color: white;border: none;padding: 0.5rem1rem;border-radius: var(--border-radius);cursor: pointer;}

.admin-content {padding: 1.5rem;}

.admin-section {margin-bottom: 2rem;}

.admin-section h4 {margin-bottom: 1rem;color: var(--text-primary);border-bottom: 2px solid var(--primary-color);padding-bottom: 0.5rem;}

/* 관리자 항목들 */.regulation-item,.log-item {    background: var(--background);    border: 1px solid var(--border-color);    border-radius: var(--border-radius);    padding: 1rem;margin-bottom: 1rem;}

.regulation-header,.log-header {display: flex;justify-content: space-between;align-items: flex-start;margin-bottom: 0.5rem;}

.regulation-meta,.log-meta {font-size: 0.8rem;color: var(--text-secondary);}

.regulation-details {display: flex;gap: 0.5rem;margin-top: 0.5rem;}

.regulation-owner,.regulation-category,.regulation-status {font-size: 0.8rem;padding: 0.25rem0.5rem;border-radius: 12px;background: var(--border-color);}

.regulation-status.active {background: var(--success-color);color: white;}

@media (max-width: 768px) {    .main-container .container {        grid-template-columns: 1fr;        gap: 1rem;    }        .sidebar {        order: 2;    }        .chat-area {        order: 1;        height: 500px;    }    .header-content {        flex-direction: column;        gap: 1rem;        text-align: center;    }        .header-actions {        flex-wrap: wrap;        justify-content: center;    }        .category-filters {        justify-content: center;    }        .input-container {        flex-direction: column;    }        .send-btn {        align-self: stretch;        justify-content: center;    }        .admin-panel {        width: 100%;    }        .key-info-table th,    .key-info-table td {        padding: 0.75rem 1rem;    }        .action-buttons {        flex-direction: column;    }        .action-button {        width: 100%;        text-align: center;    }}@media (max-width: 480px) {    .container {        padding: 0 0.75rem;    }        .header-content {        padding: 1.5rem;    }        .logo-text h1 {        font-size: 1.5rem;    }    .chat-area {height: 400px;    }.chat-messages {padding: 1rem;    }.message {margin-bottom: 1rem;    }.message-content {padding: 0.75rem1rem;    }.welcome-message {padding: 2rem1rem;    }.example-questions {flex-direction: column;align-items: stretch;    }.source-info {grid-template-columns: 1fr;    }}

/* 다크모드지원 */@media (prefers-color-scheme: dark) {:root {--background: #0f172a;--card-background: #1e293b;--text-primary: #f1f5f9;--text-secondary: #94a3b8;--border-color: #334155;    }body {background: linear-gradient(135deg, #1e293b0%, #334155100%);    }}

/* 접근성 개선 */@media (prefers-reduced-motion: reduce) {    *,    *::before,    *::after {        animation-duration: 0.01ms !important;        animation-iteration-count: 1 !important;        transition-duration: 0.01ms !important;        scroll-behavior: auto !important;    }}/* 인쇄 스타일 */@media print {    body {        background: white !important        color: black !important;    }        .header,    .sidebar,    .chat-input,    .admin-panel {        display: none;    }        .chat-messages {        page-break-inside: avoid;    }        .message {        box-shadow: none;        border: 1px solid #ccc;    }}

;

## 3단계: GitHub Pages 활성화 (5분)



1. GitHub 리포지토리 → Settings 탭2. Pages 섹션 찾기3. Source: "Deploy from a branch" 선택4. Branch: "main" 선택, Folder: "/ (root)" 선택5. Save 클릭10분 후 접속: https://your-username.github.io/hr-policy-chatbot/

## 🎉 구현 완료된 실제 시스템



위에 생성된 완전한 사내규정 Q&A 챗봇을 직접 체험해보세요. 이 시스템은 다음 특징을 가집니다:

## ✅ 완성된 기능들



하이브리드 검색: 키워드+수치+절차 통합 매칭 (10-15점 가중치 시스템)구조화된 응답: 결론→핵심정보→출처→다음단계→예외사항 5단계 구조강제 출처 표시: 모든 답변에 규정명, 버전, 시행일 포함실시간 상호작용: 자주 묻는 질문, 최근 검색, 카테고리 필터관리자 모드: 규정 목록 조회, 질의응답 로그 확인

## 🔍 테스트 질문 예시



"해외출장 Tier1 숙박비 상한은 얼마인가요?""연차휴가는 몇 일까지 받을 수 있나요?""복지포인트 연간 지급액은?""법인카드 사용시 주의사항은?"

## 📁 GitHub 리포지토리 구조 요약



your-username/hr-policy-chatbot/

├── index.html          # 메인 HTML (완전한 UI 구조)├── app.js              # JavaScript 로직 (초기화~검색~응답├── style.css           # CSS 스타일 (모던 HR 디자인)├── data.json           # 사내규정 데이터 (더미 포함)└── README.md           # 프로젝트 설명 (선택사항)

)  

단 4개 파일로 완전한 시스템 구성. 외부 의존성 없음.

##  🛠️추가 개선 및 확장 가이드



## 1. 규정 데이터 추가하기



data.json 파일을 직접 편집하여 새로운 규정을 추가:

{  "id": "NEW-POLICY-2025-01",  "title": "새로운 규정",  "version": "v1.0",   "effectiveDate": "2025-01-01",  "owner": "담당팀",  "status": "active",  "category": "카테고리명",  "sections": [    {      "section": "1",      "title": "제목",      "content": "내용...",      "keywords": ["키워드1", "키워드2"],      "amounts": [숫자1, 숫자2],      "procedures": ["절차1", "절차2"],      "exceptions": ["예외사항"]    }  ]}

## 2. 검색 정확도 튜닝



app.js의 SEARCH_WEIGHTS 상수 조정:

const SEARCH_WEIGHTS = {    KEYWORD: 6,     // 키워드 매칭 점수    NUMERIC: 10,    // 숫자 매칭 점수      PROCEDURE: 8,   // 절차 매칭 점수    CATEGORY_BONUS: 5  // 카테고리 보너스};

## 3. 디자인 커스터마이징



style.css의 CSS 변수 수정으로 색상 테마 변경:

:root {    --primary-color: #2563eb;  /* 메인 컬러 */    --success-color: #10b981;  /* 성공 컬러 */    --warning-color: #f59e0b;  /* 경고 컬러 */    /* ... 다른 색상들 */}

## 🎯 결론



GitHub Pages + JSON + 순수 JavaScript만으로 완전한 사내규정 Q&A 챗봇 시스템을 구축했습니다.

## ✨ 달성한 목표



✅ 3시간 구현: 코드 복사만으로 완성✅ 서비스 최소화: 외부 의존성 없는 완전한 클라이언트 시스템✅ 기능 완성도: 출처 강제 표시, 구조화된 응답, 하이브리드 검색✅ 초보자 친화: 단계별 가이드와 완전한 코드 제공✅ 확장성: 데이터와 설정만 변경하면 다양한 조직에서 활용 가능

이제 귀하의 조직에서도 전문적인 HR 지원 자동화 시스템을 즉시 운영할 수 있습니다. 추가 질문이나개선사항이 있으면 언제든 문의해 주세요! 🚀