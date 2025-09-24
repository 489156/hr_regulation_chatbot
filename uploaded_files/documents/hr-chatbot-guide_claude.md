if (section.keywords.some(keyword =>keyword.toLowerCase().includes(word)){scoreBreakdown.keywordMatch += 6;/3.constqueryNumbers=query.match(Ad+/g);if (queryNumbers&&section.amounts){queryNumbers.forEach(num=>{const numValue = parselnt(num);if (section.amounts.includes(numValue)){scoreBreakdown.amountMatch +=10;（else if (section.amounts.some(amount =>Math.abs(amount-numValue)/amount<0.1)){scoreBreakdown.amountMatch +=5;const procedurekeywords=[]if (procedurekeywords.some(kw=>queryLower.includes(kw){if (section.procedures&&section.procedures.length>0){scoreBreakdown.procedureMatch+= 8;//5.if (policy.category&&queryLower.includes(policy.category)）{scoreBreakdown.categoryBonus+= 5;1totalScore = Object.values(scoreBreakdown).reduce(sum, score)=> sum + score, 0);if (totalScore>=5){results.push({policy: policy.section:section,totalScore: totalScore,scoreBreakdown:scoreBreakdown,matchedQuery: queryreturn results,sort(a, b)=> b.totalScore - a.totalScore)slice(O10)

 并人



functiondisplayySearchResults((results.6,originalQuery){

if (!elements.resultsContainereturn

elements.resultsContainer.style.display='block;if (results.length===0){elements.resultsContainer.innerHTML = createNoResultsHTML(originalQuery);elseelements.resultsContainer.innerHTML = createResultsHTML(results, originalQuery);elements.resultsContainer.scrolllntoView({behavior: 'smoothblock:'start

function createResultsHTML(results,query){const topResult = results[O];const confidence = calculateConfidence(topResult.totalScore);

![9cdef171538813816221fd141d7fc403](https://picture-search.skywork.ai/image/doc/9cdef171538813816221fd141d7fc403.jpg)



// HTML  function createAnswerSectionsHTML(response){ return<!-- 1. --> <divclass="answer-section"> <div class="section-header"> <span class="section-icon"></span> <h3class="section-title"></h3> </div> <div class="conclusion-content"> ${response.conclusion)</div></div>

![189e0cfad52e382e695754d0d775a8b7](https://picture-search.skywork.ai/image/doc/189e0cfad52e382e695754d0d775a8b7.jpg)



function generateStructuredResponse(topResult, additionalResults, query){const policy = topResult.policy;const section = topResult.section;if (query.includes(）//query.includes(）query.includes())（conclusion=?$.i}else if(query.includes(）Iquery.includes()){conclusion=**$policy.title）**)elseif(query.includes()query.includes(|))（conclusion=1conclusion+=<br><br>$(highlightlmportantlnfo(section.content));const keylnfo= extractKeylnfo(section, query);xeoicy.if (section.procedures&&section.procedures.length>O){nextSteps=：${section.procedures.join（→)）const warnings=if (section.exceptions && section.exceptions.length > 0){warnings.push(...section.exceptions);if (policy.status!=='active){return{conclusion: conclusionkeylnfo: keylnfosource:{title:policy.titleversion:policy.versioneffectiveDate:policy.effectiveDatesection:section.sectionowner: policy.ownernextSteps:nextstepswarnings: warnings.length>O？warnings :nullfunction extractKeylnfo(section, query){const keylnfo =;

/早if (section.amounts && section.amounts.length> 0){if (query.includes('tier1') JIquery.includes('Tier1')){const tier1Amounts= section.content.match(/Tier1[^0-9]*(\d{1,3}(?:,?\d(3})*)[^0-9]*/gi);if(tier1Amounts）（keylnfo[Tier1}] =tier1Amounts[0].match(/(d{1,3}(?:,?\d{3))*）/)[1]+;if (query.includes('tier2') query.includes('Tier2')){const tier2Amounts=section.content.match(/Tier2[^0-9]*(\d{1,3}(?:,?\d(3})*)[^0-9]*/gi)if (tier2Amounts)keylnfo[Tier2 }] = tier2Amounts[0].match(/(d{1,3}(?:？\d{3})*))[1]+;section.amounts.forEach((amount,index)=>{if (amount>=1000）{keylnfo[${index+1}]=amount.toLocaleString0+;}else if (amount<=30）{keylnfo[|/]=amount+;/劉劉if (section.procedures && section.procedures.length > 0){keylnfo[大}]=section.procedures.join(→);return Object.keys(keylnfo).length > 0? keylnfo : null;

00百//function highlightlmportantlnfo(content){let highlighted=content;l0l0oo号//ohighlighted=highlighted.replace(/(d{13}(？:\d{3}）*)/g,'<spanclass="amount-highlight>$1</span>);/Tier highlighted =highlighted.replace(/(Tier\d+)/gi,'<strong>$1</strong>);010o//highlighted =highlighted.replace(/(d+)g,'<strong style="color:var(--success-color);">$1</strong>);const importantkeywords=[]importantkeywords.forEach(keyword=>{const regex=new RegExp((${keyword))'gi);highlighted =highlighted.replace(regex,'<strong style="color: var(--primary-color);">$1</strong>);return highlighted

return<span class="amount-highlight">${value}</span>}; } if (typeof value === 'number' && value >=1000)return（<span class="amount-highlight">${value.toLocaleString0}</span>}; } return value; }

function calculateConfidence(score){(0-100%)constmaxScore=50;//Hlet confidence = Math.min(1oo, Math.round((score / maxScore) * 1oo));

//if(confidence<30)confidence =30;returnconfidence

function getConfidenceClass(confidence){if (confidence>= 80)return 'high';if (confidence >= 60) return 'medium';return'low:// HTML  function createNoResultsHTML(query){ return <div class="empty-state"><div class="empty-state-icon"></div><h3>  </h3><p>trogrysrog

|    |
|-|
|    |
|    |
|    |
|    |
| HR |
|    |
|    |
|    |
|    |
|    |
|    |




//} HTML  function createAdditionalResultsHTML(results){return<diclass="additional-results"style="margin-top:1rem;"><m4/>配<ε>${results.map((resultindex)=><div class="related-result" style="background: white; padding: 1rem; margin: 0.5rem 0;border-radius: 8px; border-left: 3px solid var(--secondary-color);"> <strong>${result.policy.title)</strong> ${result.section.section} <p style="margin: 0.5rem 0; font-size: 0.9rem; color: var(--text-secondary);"> ${result.section.content.substring(0, 100)..</p><small>引：${calculateConfidence(result.totalScore)}%</small> </div>Qjoin(</div

function setSearchLoading(loading) {isLoadingg=loading;

|                                                   | |
|---------------------------------------------------|-----------------|
| if (!elements.searchButton）return;              | if (loading）{ |
| elements.searchButton.classList.add('loading');   |                 |
| elements.searchButton.disabled=true;              |                 |
| )else{                                            |                 |
| elements.searchButton.classList.remove(loading'); |                 |
| elements.searchButton.disabled= false;            |                 |


function addToSearchHistory(query){searchHistory.unshift(query);if (searchHistory.length>10){searchHistory = searchHistory.slice(0, 10);

try localStorage.setltem("hrChatbotHistory', JSON.stringify(searchHistory));）catch(e）console.warn(e)

function setActiveCategory(category){currentCategory = category;

/elements.categoryButtons.forEach(btn =>if (btn.dataset.categorycategory){btn.classList.add(active);}else{btn.classList.remove(active);const query = elements.searchlnput?.value.trim();if (query）(performSearch

# /



functionclearSearch(){if (elements.searchlnput){elements.searchlnput.value = ";elements.searchlnput.focus();if (elements.clearButton）{elements.clearButton.style.display= 'none';if (elements.resultsContainer){elements.resultsContainer.style.display='none;hideSuggestions

//function escapeQuotes(str){return str.replace(/"/g,"\"").replace(/"/g,\"*);functionclearAndFocus({clearSearch0;function showSearchTips(){const tips = policiesData?.searchTips lI [1

alert(八n\n'+tips,map(${index +1). $(tip}）.join(\n));

function contactHR(type){ switch(type){ case 'email': window.open(mailto:hr@company.com?subject= ,'_blank'); break; case 'phone': alert(Hdefault:alert(HR(LH1234)hr@company.com.);}}

functioncopyResult(text){if (navigator.clipboard){navigator.clipboard.writeText(text).then(()=>{alert(【}).catch(0）=>{fallbackCopy(text);}else{fallbackCopy(text);

functionfallbackCopy(text){const textArea = document.createElement('textarea');textArea.value=text;document.body.appendChild(textArea);textArea.select(;

try document.execCommand('copy);alert(） catch (err){aerdocument.body.removeChild(textArea);

//异 EH 王人| function showErrorState(message){if (elements.resultsContainer){elements.resultsContainer.innerHTML=<div class="empty-state"><div class="empty-state-icon">X</div><h3>异</h3><p>${message)</p>< diclass="empty-state-actions"><button class="action-button"onclick="location.reload()">到</button></div</div>

elements.resultsContainer.style.display='block; }}

()/if (typeof window!=='undefined'){window.hrChatbotDebug={showData: ()=> console.log( O|El:, policiesData)

![bcbcbae258817cfff473e9082ee46031](https://picture-search.skywork.ai/image/doc/bcbcbae258817cfff473e9082ee46031.jpg)

Commitchang

####6-1.GitHubPages1.GitHub**Settings**2.**Pages**3.**"Source"**O **"Deploy from abranch"**∈4.**"Branch***O**main"**5.**"Folder****"/（root)"**H6.**"Save**

####6-2.至(2-3)- 至URL: https://your-username.github.io/hr-policy-chatbot/

###7：市（10是）

####7-1

中人

1.**部大3.**4.**""

####7-2.异喜#####1.data.json2.i json"id":"NEW-POLICY-2025-01",“title":“，*version":"v1.0","effectiveDate": "2025-01-01",“owner":"”"status":"active"“category："”*sections":[.]

3.Commit→

1.contentkeywordsamounts2.version (1.0→1.1)3.effectiveDate4.Commit→

'procedures":["1”

 居CCH



data.jsonOS·

contentkeywords可procedures

大可

 Phase2（



·(Web Speech API)PDF·

Phase3

·AI(OpenAI API)·Slack/Teams

GitHindex.htmlapp.jsstyle.cssdata.jsonGitHubPagesUR

U

 

:GitHubPages豆2.3.4.**"Commitchanges"**

# JavaScrip



# 5-1.app.js



号

javascript

let policiesData=null;letisLoading=falselet currentCategorylet searchHistory=;letselectedSuggestionlndex=-

 VDOM个至



constelements ={loadingOverlay:null,statuslndicator:null,statusTextnulltotalPolicies:null,lastUpdated:null,searchlnput:null,searchButton:null,clearButton:null,suggestionsContainer:null,commonQuestions:nullcategoryButtons:null,resultsContainer:null

document.addEventListener('DoMContentLoaded',function(){console.log（HR);initializeElements()initializeEventListenersOloadPoliciesData)

 //DOM



functioninitializeElements

elements.loadingOverlay=document.getElementByld('loadingOverlay)elements.statuslndicatordocument.getElementByld('statuslndicator');elements.statusTextelements.statuslndicator?.querySelector(.status-text')elements.totalPoliciesdocument.getElementByld('totalPolicies)elements.lastUpdated：document.getElementByld("lastUpdated');elements.searchlnputdocument.getElementByld('searchlnput')elements.searchButtondocument.getElementByld('searchButtonelements.clearButton= document.getElementByld('clearButton);elements.suggestionsContainer：document.getElementByld('suggestions)elements.commonQuestionsdocument.getElementByld(commonQuestions)elements.resultsContainer = document.getElementByld('resultsContainer);elements.categoryButtons = document.querySelectorAll('.category-btn');

# 大



if (elements.searchlnput）{elements.searchlnput.addEventListener(input',handleSearchlnput);elements.searchlnput.addEventListener(keydown', handleSearchKeydown);elements.searchlnput.addEventListener(focus,showSuggestions);elements.searchlnput.addEventListener('blur,(）=>{setTimeout(hideSuggestions150）;//

if (elements.searchButton）{elements.searchButton.addEventListener('click, performSearch);

if (elements.clearButton）{elements.clearButton.addEventListener(click', clearSearch);

async functionloadPoliciesData(){try {const response = await fetch(./data.json);if(lresponse.ok){

lon//updateMetadata(populateCommonQuestions();updateStatus(ready

hideLoadingOverlay）;

} catch(error){console.erroroerror);updateStatus(error,异：${error.message}));showErrorState(error.message);

function updateStatus(type,message){if (lelements.statuslndicator lI !elements.statusText) return;const dot = elements.statuslndicator.querySelector('.status-dot');if (dot)dot.className =status-dot ${type);elements.statusText.textContent=message;

functionupdateMetadata()if(lpoliciesData）return;if (elements.totalPolicies){elements.totalPolicies.textContent = policiesData.policies.length;if (elements.lastUpdated）{elements.lastUpdated.textContent = policiesData.metadata?.lastUpdated| '2025-01-01';

functionhideLoadingOverlay({if (elements.loadingOverlay){elements.loadingOverlay.classList.add('hidden');setTimeout(）=>{elements.loadingOverlay.style.display = 'none';1，500)

functionhandleSearchlnput(e){const query = e.target.value.trim();functionhandleSearchKeydown(e){if (e.key==='Enter'){e.preventDefault(;if (selectedSuggestionlndex>=0){selectSuggestion(selectedSuggestionlndex);}else{performSearch(;}else if (e.key==='ArrowDown){e.preventDefault();navigateSuggestions(1);}else if (e.key==='ArrowUp){e.preventDefault();navigateSuggestions(-1);}else if (e.key==='Escape){hideSuggestions();1function showRealtimeSuggestions(query){if (lpoliciesData)return;const suggestions = generateSuggestions(query);if (suggestions.length=== O){hideSuggestions();return;if (lelements.suggestionsContainer) return;elements.suggestionsContainer.innerHTML = ";suggestions.forEach((suggestion,index)=>{const item = document.createElement(div');item.className='suggestion-item'item.textContent= suggestion;item.addEventListener('click', ()=>selectSuggestion(index));elements.suggestionsContainer.appendChild(item);elements.suggestionsContainer.style.display = 'block';selectedSuggestionlndex =-1;functiongenerateSuggestions(query)constsuggestions=newSet(const queryLower=query.toLowerCase()

3.if (section.procedures&& section.procedures.length > O){if (procedureKeywords.some(kw => queryLower.includes(kw))) {suggestions.add（${policy.title});

4if (policiesData.commonQuestions){policiesData.commonQuestions.forEach(item =>{if (item.question.toLowerCase().includes(queryLower)）{suggestions.add(item.question);returnArray.from(suggestions).slice(0,5)functionnavigateSuggestions(direction）{const suggestions = elements.suggestionsContainer?.querySelectorAll.suggestion-item);if (lsuggestionssuggestions.length=O)return

if (selectedSuggestionlndex>=O){suggestions[selectedSuggestionlndex].classList.remove('active);

selectedSuggestionlndex+=direction;if (selectedSuggestionlndex<-1)selectedSuggestionlndex = suggestions.length-1;if (selectedSuggestionlndex >= suggestions.length) selectedSuggestionlndex = -1;

if (selectedSuggestionlndex>=0){suggestions[selectedSuggestionlndex].classList.add(active);suggestions[selectedSuggestionlndex].scrolllntoView({block: 'nearest'});

functionselectSuggestion(index){const suggestions = elements.suggestionsContainer?.querySelectorAl.suggestion-itemif (lsuggestions !suggestions[index]) return;

function hideSuggestions({if (elements.suggestionsContainer){elements.suggestionsContainer.style.display = 'none;selectedSuggestionlndex=-1;

function showSuggestions(){const query = elements.searchlnput?.value.trim0;if (query&& query.length>=2){showRealtimeSuggestions(query);asyncfunctionperformSearch(const query = elements.searchlnput?.value.trim();if (lquery){elements.searchlnput?.focus()return;if (lpoliciesData){return;try{console.log(Q:"${query)")setSearchLoading(true);hideSuggestions();addToSearchHistory(query);const results = executeAdvancedSearch(query);console.log（${results.length）H);displaySearchResults(results,query);console.log（query: queryresultsCount:results.length,category: currentCategory,topScore: results[O]?.totalScorel0）catch(error){console.error(O异:error);hrrorssag} finally{setSearchLoading(false);Function executeAdvancedSearch(query){const results=constqueryLower=query.toLowerCase(const queryWords = queryLower.split(/s+/).filter(word => word.length > 1);console.log:[${queryWords.join();policiesData.policies.forEach(policy=>{if (currentCategory!== 'all && policy.category!== currentCategory){return;policy.sections.forEach(section=>{let totalScore=0constscoreBreakdown={exactMatch: 0keywordMatch:0amountMatch:0procedureMatch: 0categoryBonus: 0const sectionText=section.content.toLowerCase();const titleText=section.title.toLowerCaseQ;1.()if (sectionText.includes(queryLower) IltitleText.includes(queryLower){scoreBreakdown.exactMatch=152queryWords.forEach(word =>{if (titleText.includes(word){scoreBreakdown.keywordMatch+=8if (sectionText.includes(wordl)){scoreBreakdown.keywordMatch+=5;#（Supabas） OpeAI API ()- EdgeFunctions()

###

index.html ()app.js ()style.css()data.json ()1.**人²人人号大3

###1GHu(5）

1.GitHub

1.https://giaithub.com

3.Reppositoryname:hr-policy/-chatbot

*omtefile**“title":“（/"version":"v2.1","effectiveDate":"2025-01-15""owner":"旱冒”，"status":"active","category":"查""sections":["section":"§3","title":""000“keywords"：["”，“”，“tier1”，"tier2”，“查|”，“|”，“”，“160000”，"120000”，“35000”，“30000”，““]"amounts":[160000,120000,35000,30000]"procedures":[exceptios:[""]"section":"§4","title":"”今"amounts": [“procedures:[""““"]"exceptions":"section":"§7","title":"",0000“keyords：["”“”"”，“200000”，““，“"]"amounts": [200000],"procedures":[1“i"：“HR-LEAVE-2025-01，“title"：“/”"version":"v3.0","effectiveDate":"2025-01-01""owner":"HR""status":"active","category"："喜”"sections": ["section":"§1""title":"”5“keyords：[“”，“，“15”，“25”，“2”，“1”，“”，“，“”，“1”，“]"amounts": [15,25,2, 1],"exceptions":"section":"s2",“title":"”0"amounts": [5,10,5],“procedures[]"exceptions":1"id": "HR-WEL-2025-03","title":“”"version":"v2.3","effectiveDate":"2025-03-01""owner":"引","status":"active","category":"号|","sections": ["section":"s1","title":"”，o000,0001600,000，“keyords：[”，“”，“1000000”，“100，“”，“600000”，“60”，“12”，““““"amounts":[1000000，60000012]“procedures：["""]i]{"section":"s2”"title":"”“keyords：[“至”，“”，"500000”，"50”，“早”，“查”，“300000”，“30”，“"]"amounts":[500000，500000300000]“procedures[]"exceptions":id":“FIN-CARD-2025-01”title":“"version":"v1.2","effectiveDate":"2025-01-10“owner":“","status":"active","category":"","sections":["section":"s1",“title":"”，“：[““，“““““"amounts":0“procedures[""，"查"]exceptios:["H]}"section":"§3","title":"","amounts": “procedures["""]"exceptions": [1“id":"HR-OT-2025-01"version":"v1.5","effectiveDate":"2025-02-01""owner":"HR旱","status":"active","category":“","sections": ["section":"s1","title":""15"amounts": [52,1.5],“procedures：[“]exceptions":1"id":"HR-REMOTE-2025-01",“title":“"version":"v2.0","effectiveDate":"2025-01-05","owner":"HR""status": "active","category":"早","sections":["section":"§2","title":""0“keywords”：[“”“”，“30000”“3”“”“”，“”“VPN”“”]"amounts": [30000],exceptios[]1"searchTips":[0S00009号]，"commonQuestions": ["category"："查"，“question":"？""category"："弃水",“keywords":[""，“"]“question"："？"“category"："号|”"keywords":["凹”，""]"question：“？”"category"："”[AHH]:spOM

itchanges.

#  



# 3-1.index.html



m：<DOCTYPEhtml><html lang="ko"><head><meta charset="UTF-8"><metaname="viewport" content="width=device-width,initial-scale=1.0"><title>HQ&A</title><linkrel="stylesheet"href="style.css">meta namedescriptioncontenA</head><body>--<div id="loadingOverlay"class="loading-overlay"><div class="loading-content"><divclass="loading-spinner"></div><</div></div><divclass="container"><----><headerclass="header"><divclass="header-content"><h1class="header-title">LHQ&A</h1><---><divclass="status-bar">≤divid="statuslndicator"class="status-indicator"><span class="status-dot loading"></span><spanclass=status-text"></span></div><divclass="stats"><span id="totalPolicies">-</span>7H|<span id="lastUpdated">-</span>o</div></div></div>≤/header>-<main class="main-content"><divclass="search-section"><divclass="search-container">≤divclass="search-input-wrapper"><inputtype="text"id="searchlnput"lacerautocomplete="offmaxlength="200"<buttonid="searchButton"type="button"><span class="button-text"></span><span class="button-loading">Q</span></button><button id="clearButton"type="button"class="clear-button"style="display:none;">X</button></div><div id="suggestions" class="suggestions-container"style="display: none;"></div></div>-<divclass="quick-questions"><h3>/h3><div id="commonQuestions"class="question-chips"></div></div>--><div class="category-filter"><h3>/h<divclass="category-buttons"><buttonclass="category-btn active"data-category="all"></button><buttonclass="category-btn"data-category="查">查</button><buttonclass="category-btn"data-category="弃">弃</button><buttonclass="category-btn"data-category="号|">号|</button><buttonclass="category-btn"data-category=""></button><buttonclass="category-btn"data-category=""></button></div≥</div></div><div id="resultsContainer" class="results-container" style="display: none;"></div>-<divclass="help-section"><detailsclass="help-details"><summarysummary><div class="help-content">b-d1=ss>

![ffc4c4933e5a79e38a8ee0b5abd4000a](https://picture-search.skywork.ai/image/doc/ffc4c4933e5a79e38a8ee0b5abd4000a.jpg)

<scriptsrc="app.js"></script>(/body></html>

Commitchanges"

 4-1.style.css



号

CSSmargin: 0padding: 0box-sizing: border-box

root{--primary-color:#2563eb;--primary-dark:#1e40af;--secondary-color:#64748b;--success-color:#10b981;--warning-color:#f59e0b;--error-color:#ef4444;--background: #f8fafc;--card-background: #ffff;--border-color: #e2e8f0--text-primary: #1e293b;--text-secondary:#64748b;--shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);--border-radius:12px;--transition: all 0.3s cubic-bezier(0.4, 0,0.2,1);

bodyfont-family: -apple-system, BlinkMacSystemFont, 'Segoe Ul', Roboto,'Noto Sans KR', sans-serif;line-height 1.6color: var(--text-primary);background: linear-gradient(135deg#667eea 0%,#764ba2100%);min-height:100vh

**loading-overlayposition: fixed;top: Oleft Owidth:100%height:100%background:rgba(255,255,255,0.95)display: flexalign-items:centerjustify-content: center;z-index:9999transition:opacity0.5sease广.loading-overlay.hidden{opacity: 0pointer-events:none;.loading-content{text-align:center;padding: 2rem;.loading-spinner{width:48pxheight:48pxborder: 4px solid var(--border-color);border-top: 4px solid var(--primary-color);border-radius:50%animation:spin1slinear infinitemargin:0auto1rem;1@keyframesspin{from{transform: rotate(Odeg); }to{transform:rotate(360deg); }/*10F/.container{?max-width:1200px)margin: O auto;padding: 01rem;/**/header{padding: 2rem 0text-align: center;color: white.header-content{background:rgba(255,255,255,0.1);backdrop-filter: blur(20px);border-radius:var(--border-radius);padding:2rem;border: 1px solid rgba(255,255, 255,0.2);.header-title{font-size:2.5rem;font-weight:700margin-bottom:0.5rem;text-shadow:2px2px4pxrgba(0,0,0,0.3).header-subtitle{font-size:1.2rem;opacity:0.9margin-bottom:1.5rem;,status-bar{display: flex;justify-content:space-between;align-items:center;margin-top:1rem;padding-top: 1rem;border-top:1px solid rgba(255,255,255,0.2);.status-indicator{display: flex;align-items:center;gap:0.5rem;.status-dot{width:12pxheight:12pxborder-radius:50%transition:var(--transition);.status-dot.loading{background:var(--warning-color)animation:pulse2sinfinite.status-dot.ready{background:var(--success-color);,status-dot.error{background:var(--error-color)@keyframespulse{0%,100%{opacity:1;}50%{opacity:0.5;}.stats{font-size:0.9rem;opacity:0.8main-content{margin:2rem0.search-section{background: var(--card-background);border-radius:var(--border-radius);padding: 2rem;box-shadow: var(--shadow);margin-bottom:2rem;search-container{position:relative;margin-bottom:2rem;.search-input-wrapper{display:flex;gap:0.5rem;position:relative;#searchlnput{flex: 1;padding:1rem1.5rem;border: 2px solid var(--border-color);border-radius:var(--border-radius);font-size:1rem;transition:var(--transition)background:var(--background);#searchlnput:focus{outline: none;border-color:var(--primary-color);background: var(--card-background);box-shadow: 00 0 3px rgba(37, 99,235,0.1#searchButton{padding:1rem2rem;background: var(--primary-color);color:whiteborder:none;border-radius:var(--border-radius);font-weight:600cursor: pointer;transition:var(--transition);position:relativemin-width:100px)1#searchButton:hover:not(:disabled){background:var(--primary-dark);transform:translateY(-1px);#searchButton:disabled{opacity:0.6cursor:not-allowed;transform:none.button-loadingdisplay: none;#searchButton.loading.button-text{display: none;#searchButton.loading.button-loading{display: inline;animation:bounce 1s infinite;@keyframesbounce{0%,100%{transform:translateY(0); }50%{transform: translateY(-3px); }.clear-button{position: absolute;right:120pxtop:50%transform:translateY(-50%);background: none;border: none;font-size:1.2rem;color: var(--text-secondary)cursor: pointer;padding:0.5rem;border-radius:50%transition:var(--transition);clear-button:hover{background:var(--background);color: var(--text-primary);,suggestions-container{position: absolute;top:100%left: Oright:120pxbackground:var(--card-background)border:1pxsolidvar(--border-color);border-radius:var(--border-radius);box-shadow:var(--shadow);z-index:1000max-height:200px;overflow-y: auto;.suggestion-item{padding:0.75rem1rem;cursor: pointer;border-bottom: 1px solid var(--border-colortransition:var(--transition);.suggestion-item:last-child{border-bottom:nonesuggestion-item:hover,.suggestion-item.active{background: var(--background);

question-chip:hover{background:var(--primary-color);color:whiteborder-color:var(--primary-color);transform: translateY(-1px);.category-filterh3{margin-bottom:1rem;color:var(--text-primary)font-size:1.1rem;.category-buttons{display:flex;flex-wrap:wrap;gap:0.5rem;）.category-btn{background: var(--background);border:1px solidvar(--border-color);border-radius:var(--border-radius);padding:0.75rem1.5rem;cursor: pointer;transition:var(--transition)font-weight:500.category-btn:hover{background: var(--border-color);.category-btn.active{background: var(--primary-color);color:whiteborder-color:var(--primary-color);/0/.results-container{animation:slideUp0.5s ease-out;@keyframesslideUp{from{opacity: 0;transform: translateY(30px);to{opacity:1;transform:translateY(0);）**/.result-card{background: var(--card-background);border-radius:var(--border-radius);padding:2rem;margin-bottom: 1.5rem;box-shadow:var(--shadow);border-left: 4px solid var(--primary-colo,result-header{display:flexjustify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;.confidence-badge{background: var(--success-color);color:whitepadding:0.25rem0.75rem;border-radius: 20px)font-size:0.8rem;font-weight: 600;.confidence-badge.medium{background:var(--warning-color);.confidence-badge.low{background: var(--error-color);.answer-section{margin-bottom:2rem;.answer-section:last-child{margin-bottom:0.section-header{display: flex;align-items:center;

.conclusion-content{font-size:1.1remline-height:1.7color: var(--text-primary);padding:1.5rembackground:linear-gradient(135deg,#fof9ff,#e0f2fe);border-radius:var(--border-radius);border-left:4pxsolid var(--primary-color);key-info-tabletr:last-child td{border-bottom:none;.amount-highlight{color:var(--primary-color);font-weight:700;font-size:1.1em*/.source-info{display:grid;gap: 1rem;grid-template-columns: repeat(auto-fit,minmax(280px,1fr);.source-badge{background:linear-gradient(135deg,var(--success-color),#059669);color:whitepadding:1rem1.5rem;border-radius:var(--border-radius);box-shadow:04px12pxrgba(16,185,129,0.3);transition:var(--transition);.source-badge:hover{transform: translateY(-2px);box-shadow:08px 20px rgba(16,185,129,0.4);,source-title{font-weight:700;font-size: 1rem;margin-bottom: 0.5rem;,source-meta{font-size:0.9remopacity:0.95;/￥*/.next-steps-content{background:#fffbeb;border: 1px solid #fed7aa;border-radius:var(--border-radius);padding:1.5rem;.action-buttons{display: flex;flex-wrap:wrap;gap: 0.75rem;margin-top: 1rem;.action-button{background:var(--warning-color)color:whiteborder: none;padding:0.75rem1.5remborder-radius:var(--border-radius)font-weight:500cursor: pointer;transition:var(--transition);text-decoration:none;display:inline-block;.action-button:hover{background: #d97706;transform: translateY(-1px)box-shadow:04px8pxrgba（245,158,11,0.3).warnings-content{background:#fef2f2;border:1pxsolid#fecacaborder-radius:var(--border-radius)padding:1.5rem;.warning-item{display: flex;align-items:flex-start;gap: 0.75rem;margin-bottom:0.75rem;.warning-item:last-child{margin-bottom:0.warning-icon{color:var(--error-color);font-size:1.1rem;margin-top:0.1rem;.empty-state{text-align: center;padding:3rem2rem;background:var(--card-background);border-radius: var(--border-radius);box-shadow:var(--shadow);.empty-state-icon{font-size: 4rem;margin-bottom:1rem;opacity:0.5;）.empty-stateh3{color:var(--text-primary)margin-bottom:1remfont-size:1.3rem;.empty-state-actions{margin-top:2rem;display: flex;flex-wrap:wrap;gap: 1rem;justify-content: center;.help-section{margin:2rem0.help-details{background:rgba(255,255,255,0.95);border-radius:var(--border-radius);backdrop-filter: blur(10px);border:1pxsolidrgba(255,255,255,0.3).help-details summary{padding:1.5remcursor: pointer;font-weight:600color: var(--text-primary);user-select:none.help-details[open]summary{border-bottom:1pxsolid var(--border-color);.help-content{padding:1.5rem;.tip-grid {display: grid;gap:1.5rem;grid-template-columns:repeat(auto-fit, minmax(30opx, 1fr);tip-card{background:var(--card-background);padding:1.5remborder-radius:var(--border-radius);box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);.tip-card h4{margin-bottom:1rem;color:var(--primary-color);.tip-card ul{list-style: none;.tip-card li {padding:0.5rem0position:relative;padding-left:1.5rem.tip-card li:before{content:""position:absolute;left: 0;color: var(--primary-color);font-weight:bold;.footer{margin-top:3rem;padding: 2rem 0border-top:1px solid rgba(255,255,255,0.2).footer-content{background:rgba（255,255,255,0.1）backdrop-filter:blur(20px);border-radius:var(--border-radius);padding: 2rem;text-align: center;color:white;border: 1px solid rgba(255,255, 255, 0.2);.contact-info{margin-bottom:1rem;.contact-info p{margin: 0.25rem0.footer-meta{opacity:0.8font-size:0.9rem;.footer-metap{margin:0.25rem0@media(max-width:768px){.container{padding:00.75rem;）header-title{font-size:2rem;.search-input-wrapper{flex-direction:column;#searchButton{width:100%.clear-button{right:1rem;top:1rem;transform: none;.suggestions-container{right: O;.category-buttons {justify-content:center;）.source-info{grid-template-columns:1fr;）.action-buttons{flex-direction:column;.action-button{width: 100%text-align: center;.tip-grid{grid-template-columns: 1fr;status-bar{flex-direction: column;gap:0.75rem;text-align: center@media(max-width: 480px){header{padding:1.5rem0.header-contentpadding:1.5rem;.header-title{font-size:1.8rem;search-section{padding:1.5rem;margin-bottom:1.5rem;.result-card{padding:1.5rem;key-info-table th.key-info-table td {padding:0.75rem1rem;@media(prefers-reduced-motion:reduce){*before,*after{animation-duration: 0.01ms!important;animation-iteration-count:1limportant;transition-duration:0.01mslimportant;scroll-behavior:autolimportant*@media (prefers-color-scheme: dark){:root{--background: #0f172a;--card-background:#1e293b--text-primary:#f1f5f9;--text-secondary:#94a3b8--border-color:#334155;body{background: linear-gradient(135deg,#1e293b 0%, #334155100%);@mediaprint{body{background:whitelimportant;color:black!important;header,,search-section,.help-section,.footer{display: none;,result-card{page-break-inside:avoid;box-shadow:none;border: 1px solid #ccc)