(() => {
  const D = window.APP_DATA, E = D.economy, app = document.querySelector('#app');
  const allTimeline = [...D.timeline];
  const startStage = () => state.profile.startStage || 0;
  const state = { screen: 'home', index: 0, run: [], decisions: [],
    profile: { income: 50000, savings: 100000, expenses: 25000, startStage: 0 },
    plans: Object.fromEntries(D.plans.map((p, i) => [p.id, i < 5])) };
  const fmt = n => new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', maximumFractionDigits: 0 }).format(n);
  const money = n => n === 0 ? '收支平衡' : fmt(n);
  const initialPlanPremium = p => Math.round(p.monthlyPremium * E.premiumAgeFactors[startStage()]);
  const premium = () => D.plans.reduce((sum, p) => sum + (state.plans[p.id] ? initialPlanPremium(p) : 0), 0);
  const row = (label, value, balance = false) => Math.round(value) === 0 ? '' : `<div class="breakdown-row"><span>${label}</span><b class="${value < 0 ? 'deficit' : 'surplus'}">${fmt(value)}</b></div>`;
  const topbar = () => `<header class="topbar"><div class="brand-mini"><div class="brand-mark">N</div><div><strong>NANSHAN LifeLab</strong><small>人生風險與收支實驗室</small></div></div><button class="icon-btn" data-action="home">首頁</button></header>`;
  const legal = () => `<div class="notice compact-notice">教育模擬：金額、保費與給付均為遊戲概估，不是市場平均、正式報價或實際理賠。官方商品供進一步了解，與遊戲方案不直接對應；實際投保、續保、保障期限、等待期間及給付依正式條款與審核。遊戲假設人身與房車保障持續有效並扣費，不代表真實商品可終身續保。</div>`;
  const button = (action, text) => `<button class="btn btn-dark btn-block" data-action="${action}">${text}</button>`;
function photoFor(e){const key=e.id==='peaceful'?(e.age<35?'peace-young':e.age<60?'peace-family':'peace-senior'):(D.eventPhotoMap[e.id]||'hospital');return {...D.eventPhotos[key],key};}
function art(e){const p=photoFor(e);return `<figure class="event-photo photo-${p.tone}" data-photo="${p.key}"><img src="${p.src}" alt="${p.alt}" width="1672" height="941" decoding="async" fetchpriority="high" style="object-position:${p.position}"><figcaption><span class="photo-kicker">${p.label}</span><span class="photo-ai">AI情境示意</span></figcaption></figure>`;}

  function incomeAt(year) {
    const startYear = allTimeline[startStage()].start, elapsed = Math.max(0, year - startYear);
    if (allTimeline[startStage()].age >= E.retirementAge) return state.profile.income;
    return 20 + year < E.retirementAge ? Math.round(state.profile.income * (1 + E.salaryGrowth) ** elapsed) : Math.round(state.profile.income * (1 + E.salaryGrowth) ** Math.max(0, E.retirementAge - 21 - startYear) * E.pensionRatio);
  }
  function expenseAt(year) { return Math.round(state.profile.expenses * (1 + E.expenseGrowth) ** Math.max(0, year - allTimeline[startStage()].start)); }
  function coverageFor(i){return state.decisions[i]?.coverage||state.plans;}
  function tierFor(i){return E.coverageTiers.find(t=>t.id===state.decisions[i]?.tier)||E.coverageTiers[0];}
  function planPremiumAt(p,year,i=Math.max(0,Math.min(D.timeline.length-1,Math.floor(year/10)-startStage()))){return coverageFor(i)[p.id]?Math.round(p.monthlyPremium*E.premiumAgeFactors[i+startStage()]*tierFor(i).fee):0;}
  function premiumAt(year,i=Math.max(0,Math.min(D.timeline.length-1,Math.floor(year/10)-startStage()))){return D.plans.reduce((sum,p)=>sum+planPremiumAt(p,year,i),0);}
  function selected(plans, id) { return plans.find(p => p.id === id) || plans[0]; }
  function personalPayouts(e,index=state.index){return calculatePersonalPayouts(e,coverageFor(index),tierFor(index));}
  function assetPayout(cost,plan){return Math.floor(cost*(plan.share||0));}
  function mortgageRate(){let low=0,high=.02;for(let i=0;i<80;i++){const rate=(low+high)/2,payment=E.house.loanPrincipal*rate/(1-(1+rate)**(-E.house.mortgageYears*12));if(payment>E.house.mortgageMonthly)high=rate;else low=rate;}return (low+high)/2;}
  const loanRate=mortgageRate();
  function loanBalance(months){if(months>=E.house.mortgageYears*12)return 0;const growth=(1+loanRate)**Math.max(0,months);return Math.max(0,Math.round(E.house.loanPrincipal*growth-E.house.mortgageMonthly*(growth-1)/loanRate));}
  function hasActiveCoverage(prior){return D.plans.some(p=>coverageFor(state.index)[p.id])||!!(prior?.hasCar&&selected(E.car.plans,prior.carPlan).monthly>0)||!!(prior?.hasHouse&&selected(E.house.plans,prior.housePlan).monthly>0);}
  function eventRiskRate(prior){return (hasActiveCoverage(prior)?E.stageRiskRates:E.uninsuredRiskRates)[state.index+startStage()];}
  function difficultyNote(){return '<b>風險壓力挑戰</b><p>一般模式的風險事件抽選率隨年齡由47%提高至70%；完全沒有持續保障時為64%～78%。事故費用依事件、年齡及隨機嚴重程度計算。這是遊戲難度設定，不代表真實事故率或醫療費行情。</p>';}
  function drawEvent(i){const t=D.timeline[i],age=t.age,base={age,stage:age+'歲',baseCost:0,coverages:{},years:t.years};const prior=ledger()[i-1];
    if(i>0&&!state.run.some(e=>e?.id==='trip')&&Math.random()<.08)return {...base,id:'trip',emoji:'✈️',title:age+'多歲，收到一次旅行邀請',story:'旅遊任務最多出現一次。先決定是否出國，再同頁揭曉結果。房車選擇仍在本頁。'};
    const roll=Math.random();if(roll<.01){if(!state.run.some(e=>e?.id==='lottery'))return {...D.events.find(e=>e.id==='lottery'),...base};return {...D.events.find(e=>e.id==='peaceful'),age,stage:age+'歲',years:t.years};}
    if(roll>=.01+eventRiskRate(prior))return {...D.events.find(e=>e.id==='peaceful'),age,stage:age+'歲',years:t.years};
    const stage=D.stages[Math.min(5,Math.floor((age-20)/10))];const pool=age>=50?[...stage.pool,...stage.pool,'fall','fracture','scooter','major_trauma']:[...stage.pool,'fall','sports','burn','bike','hiking','glass','fracture','scooter','eye','dislocation'];if(prior?.hasCar)pool.push('car_collision','car_damage','car_rear');if(prior?.hasHouse)pool.push('house_fire','house_smoke');const recent=state.run.slice(-5).map(e=>e.id),fresh=pool.filter(id=>!recent.includes(id)),choices=fresh.length?fresh:pool;const chosenId=choices[Math.floor(Math.random()*choices.length)],source=D.events.find(e=>e.id===chosenId),severity=E.severityLevels[Math.floor(Math.random()*E.severityLevels.length)],ageFactor=source.coverages.car||source.coverages.house?1:E.medicalAgeFactors[i+startStage()];return {...source,baseCost:Math.round(source.baseCost*severity.factor*ageFactor/1000)*1000,severity:severity.name,age,stage:age+'歲',years:t.years};
  }
  function ledger(){let cash=state.profile.savings,carYear=-1,houseYear=-1,carPlan='none',housePlan='none';const rows=[];
    for(let i=0;i<state.run.length;i++){const e=state.run[i],d=state.decisions[i];if(!e||!d)break;const t=D.timeline[i],before=cash,priorHasCar=carYear>=0,priorHasHouse=houseYear>=0;let income=0,expenses=0,personalPremium=0,personalPremiumByPlan={},assetPremium=0,carRunning=0,carLoan=0,mortgage=0,houseRunning=0;
      for(let y=t.start;y<t.start+t.years;y++){income+=incomeAt(y)*12;let living=expenseAt(y)*12;for(const p of D.plans){const amount=planPremiumAt(p,y,i)*12;personalPremiumByPlan[p.id]=(personalPremiumByPlan[p.id]||0)+amount;personalPremium+=amount;}if(carYear>=0&&y>=carYear){carRunning+=E.car.monthlyRunning*12;if(y-carYear<E.car.loanYears)carLoan+=E.car.loanMonthly*12;assetPremium+=selected(E.car.plans,carPlan).monthly*12;}if(houseYear>=0&&y>=houseYear){if(y-houseYear<E.house.mortgageYears)mortgage+=E.house.mortgageMonthly*12;houseRunning+=E.house.monthlyMaintenance*12;assetPremium+=selected(E.house.plans,housePlan).monthly*12;living-=Math.min(living,Math.min(state.profile.expenses,E.house.rentReduction)*12);}expenses+=living;}
      cash+=income-expenses-personalPremium-assetPremium-carRunning-carLoan-mortgage-houseRunning;const available=cash;
      const tripCost=e.id==='trip'&&d.travel?E.tripCost:0,tripPremium=tripCost?selected(E.travelPlans,d.tripPlan).premium:0,cost=e.id==='trip'?(d.resolved&&d.travelAccident?E.travelMedicalCost:0):e.baseCost;let used=personalPayouts(e,i);
      // Accident precedes year-end transactions: a newly bought policy cannot cover it retroactively.
      if(e.coverages.car)used=[{id:'car',name:selected(E.car.plans,carPlan).name,amount:priorHasCar?assetPayout(cost,selected(E.car.plans,carPlan)):0}];if(e.coverages.house)used=[{id:'house',name:selected(E.house.plans,housePlan).name,amount:priorHasHouse?assetPayout(cost,selected(E.house.plans,housePlan)):0}];if(e.id==='trip')used=[{id:'travel',name:selected(E.travelPlans,d.tripPlan).name,amount:cost?assetPayout(cost,selected(E.travelPlans,d.tripPlan)):0}];
      const benefit=used.reduce((sum,p)=>sum+p.amount,0),bonus=e.bonus||0;cash+=bonus+benefit-cost-tripCost-tripPremium;const afterIncident=cash;let purchase=0,saleGross=0,saleFees=0,loanPayoff=0;
      if(t.age>=30){if(d.buyCar&&!priorHasCar){carYear=t.start+t.years;carPlan=d.carPlan;purchase+=E.car.downPayment;}if(d.sellHouse&&priorHasHouse){saleGross=E.salePrice;saleFees=Math.round(saleGross*E.saleFeeRate);loanPayoff=loanBalance((t.start+t.years-houseYear)*12);cash+=saleGross-saleFees-loanPayoff;houseYear=-1;housePlan='none';}else if(d.buyHouse&&!priorHasHouse){houseYear=t.start+t.years;housePlan=d.housePlan;purchase+=E.house.downPayment;}}
      cash-=purchase;const y=t.start+t.years-1,monthlyIncome=incomeAt(y),monthlyLiving=Math.max(0,expenseAt(y)-(houseYear>=0?Math.min(state.profile.expenses,E.house.rentReduction):0)),recurring=premiumAt(y,i)+(carYear>=0?E.car.monthlyRunning+selected(E.car.plans,carPlan).monthly+(t.start+t.years-carYear<E.car.loanYears?E.car.loanMonthly:0):0)+(houseYear>=0?E.house.monthlyMaintenance+selected(E.house.plans,housePlan).monthly+(t.start+t.years-houseYear<E.house.mortgageYears?E.house.mortgageMonthly:0):0);
      rows.push({e,d,before,available,afterIncident,income,expenses,personalPremium,personalPremiumByPlan,assetPremium,carRunning,carLoan,mortgage,houseRunning,purchase,saleGross,saleFees,loanPayoff,saleNet:saleGross-saleFees-loanPayoff,tripCost,tripPremium,cost,used,benefit,bonus,balance:cash,priorHasCar,priorHasHouse,hasCar:carYear>=0,hasHouse:houseYear>=0,carYear,houseYear,carPlan,housePlan,monthlyIncome,monthlyAvailable:monthlyIncome-monthlyLiving-recurring,totalPremium:personalPremium+assetPremium+tripPremium,otherCost:carRunning+carLoan+mortgage+houseRunning+purchase+tripCost+saleFees+loanPayoff});}
    return rows;
  }
  function policyCard(p, status = '') {
    return `<details class="policy-details"><summary><span>${p.name}</span>${status ? `<small>${status}</small>` : ''}</summary><div class="policy-body"><b>${p.example}</b><ul>${(p.details || [p.description]).map(t => `<li>${t}</li>`).join('')}</ul>${p.note ? `<p>${p.note}</p>` : ''}<a href="${p.url}" target="_blank" rel="noopener">南山官方商品詳細內容／條款 ↗</a><small>資料查閱：2026-10-27。實際銷售狀態、核保、保費與給付請以最新官方資訊為準。</small></div></details>`;
  }
  function related(r) {
    let ids = [...new Set([...Object.keys(r.e.coverages), ...(r.d.buyCar ? ['car','liability'] : []), ...(r.d.buyHouse || r.d.sellHouse ? ['house'] : [])])];
    if (r.e.id === 'buy_car') ids = ['car', 'liability'];
    if (r.e.id === 'buy_house') ids = ['house'];
    if (r.e.id === 'trip') ids = ['travel'];
    if (ids.includes('car') && !ids.includes('liability')) ids.push('liability');
    if (ids.includes('accident') && !ids.includes('hospital')) ids.push('hospital');
    const cards = ids.map(id => {
      const p = D.plans.find(p => p.id === id) || D.catalog[id]; if (!p) return '';
      const applied = r.used.find(x => x.id === id && x.amount > 0);
      const status = applied ? '本事件已使用 · ' + fmt(applied.amount) : (id === 'hospital' && !r.e.coverages.hospital ? '延伸了解住院風險 · 未計入本事件給付' : '其他可進一步了解的保障');
      return policyCard(p, status);
    }).join('');
    return cards ? `<div class="section-title"><div><h3>用了什麼保障？還能了解什麼？</h3><p>展開看保障內容與官方連結；不會在事故後補買並追溯給付。</p></div></div>${cards}` : '';
  }
  function funds(r){return `<div class="funds-strip"><div><span>目前月收入</span><b class="surplus">${fmt(r.monthlyIncome)}</b></div><div><span>選擇後每月可用金額</span><b class="${r.monthlyAvailable<0?'deficit':'surplus'}">${money(r.monthlyAvailable)}</b></div></div><div class="balance-panel live-balance"><span>事件與房車選擇後的可用現金</span><strong class="${r.balance<0?'deficit':'surplus'}">${money(r.balance)}</strong><small>事件前 ${money(r.available)} · ${r.e.age+'～'+(r.e.age+9)+'歲120個月'}生活收支已自動累計</small></div>`;}
  function annualChoices(r){if(r.e.age<30)return '';return `<details class="annual-options" ${r.d.buyCar||r.d.buyHouse||r.d.sellHouse?'open':''}><summary>📅 ${r.e.age}歲這十年的房車選擇 · 可維持現況</summary><div class="annual-options-body">${r.priorHasCar?'<p>🚗 已持有汽車，養車費與原保障持續扣除；車貸只在前5年扣款，繳完即停止，不必重選。</p>':`<label class="purchase-toggle"><input type="checkbox" data-annual-buy-car ${r.d.buyCar?'checked':''}>這十年買車，總價100萬元、頭期款60萬元</label>${r.d.buyCar?`<label for="car-plan">首次購車的保障配置</label><select id="car-plan" data-car-plan class="select">${E.car.plans.map(p=>`<option value="${p.id}" ${p.id===r.d.carPlan?'selected':''}>${p.name}${p.monthly?' · 約'+fmt(p.monthly)+'/月':''}</option>`).join('')}</select><p>車價100萬元，先扣頭期款60萬元；剩餘車貸40萬元，以遊戲假設每月7,500元、共5年計入（分期合計45萬元，含模擬融資成本5萬元）。之後養車約5,000元/月，另加所選保障；貸款從購車後開始扣款，繳完即停止。</p>`:''}`}<hr>${r.priorHasHouse?`<label class="purchase-toggle"><input type="checkbox" data-sell-house ${r.d.sellHouse?'checked':''}>這十年賣房</label><p>遊戲固定售價1,000萬元，費用2%；先清償未償房貸本金，再將差額入帳。售出後下月停止房貸、維護與住宅保費，原生活費恢復含租金。</p>${r.d.sellHouse?`<div class="card breakdown">${row('售屋價金',r.saleGross)}${row('售屋費用',-r.saleFees)}${row('清償房貸本金',-r.loanPayoff)}${row('售屋淨入帳',r.saleNet,true)}</div>`:''}`:`<label class="purchase-toggle"><input type="checkbox" data-annual-buy-house ${r.d.buyHouse?'checked':''}>這十年買房，總價1,000萬元、頭期款200萬元</label>${r.d.buyHouse?`<label for="house-plan">首次購屋的住宅保障</label><select id="house-plan" data-house-plan class="select">${E.house.plans.map(p=>`<option value="${p.id}" ${p.id===r.d.housePlan?'selected':''}>${p.name}${p.monthly?' · 約'+fmt(p.monthly)+'/月':''}</option>`).join('')}</select><p>房價1,000萬元，先扣頭期款200萬元、貸款800萬元；遊戲假設月付34,000元共30年，維護約2,000元/月。持屋後原生活費至多8,000元/月租金予以扣除。</p>`:''}`}<p>勾選後即時更新餘額，不買也可以直接前進下一個十年。房車交易在本關事故之後，不能用當年新買的保障追溯給付。</p></div></details>`;}
  function tripChoices(r) {
    if (r.d.resolved) return `<div class="trip-resolved">${r.d.travel ? (r.cost ? '💔 旅途中突發疾病，需要支付醫療費。' : '☀️ 平安歸來，這次沒有額外醫療支出。') : '你選擇不出國，保留了旅遊預算。'}</div>`;
    return `<div class="card purchase-card"><label class="purchase-toggle"><input type="checkbox" data-trip-choice ${r.d.travel ? 'checked' : ''}><span>這次出國旅行，旅費約3萬元</span></label>${r.d.travel ? `<label for="trip-plan">這趟旅程的海外保障</label><select id="trip-plan" data-trip-plan class="select">${E.travelPlans.map(p => `<option value="${p.id}" ${r.d.tripPlan === p.id ? 'selected' : ''}>${p.name}${p.premium ? ' · 約' + fmt(p.premium) + '/次' : ''}</option>`).join('')}</select><p>只收這趟旅程的保費；不會加入日後每月固定費用。遊戲基本／加強方案分擔符合情境醫療費的70%／90%，不是正式保單給付規則。遊戲以35%機率出現海外醫療事件，情境醫療費約36萬元。</p>` : '<p>不參加就不收旅費及海外保費。</p>'}${button('resolve-trip', '確認選擇，同頁揭曉 →')}</div>`;
  }
  function impact(r) {
    if (!r.cost && !r.bonus) return '';
    if (r.bonus) return `<div class="impact-panel lucky"><span>🍀 幸運入帳</span><strong>+${fmt(r.bonus)}</strong></div>`;
    const protectedEvent = r.benefit > 0;
    return `<div class="impact-panel ${protectedEvent ? 'protected' : 'heartbreak'}"><span class="impact-symbol">${protectedEvent ? '🛡️' : '💔'}</span><h3>${protectedEvent ? '這次，有保障幫忙分擔。' : '這筆支出，只能自己扛。'}</h3><div class="bill-amount">-${fmt(r.cost)}</div>${protectedEvent ? `<p>假設保險給付 <b>+${fmt(r.benefit)}</b></p><div class="used-insurance">${r.used.filter(p => p.amount > 0).map(p => `<div><span>✓ ${p.name}</span><b>${fmt(p.amount)}</b></div>`).join('')}</div>` : '<p>本次沒有已配置且對應的保障給付。</p>'}<div class="out-of-pocket">這次自己付 <strong>${fmt(r.cost - r.benefit)}</strong></div><p class="impact-footnote">對照：相同事件若沒有對應保障，自付 ${fmt(r.cost)}。這只比較本次事故，歷年保費已另外扣除，不代表保險一定比較省。</p></div>`;
  }
  function progressLevels(){return `<div class="level-track" aria-label="人生關卡進度">${D.timeline.map((t,i)=>`<span class="level-step ${i<state.index?'complete':i===state.index?'active':''}">${i<state.index?'✓ ':''}${t.age}+</span>`).join('')}</div>`;}
  function peaceCelebration(e){if(e.id!=='peaceful')return '';return '<div class="peace-clear" role="status"><span class="peace-medal">🏅</span><div><b>平安過關 · 十年成就解鎖</b><p>這十年無大額意外開銷</p><small>平安也是值得慶祝的收穫！自選房車或旅費另計。</small></div><span class="celebrate-spark spark-a" aria-hidden="true">✦</span><span class="celebrate-spark spark-b" aria-hidden="true">✧</span><span class="celebrate-spark spark-c" aria-hidden="true">✦</span></div>';}
  function eventPage(){state.screen='event';const r=ledger()[state.index],e=r.e,tripPending=e.id==='trip'&&!r.d.resolved,theme=r.cost?(r.benefit?'event-protected':'event-heartbreak'):(r.bonus?'event-lucky':e.id==='peaceful'?'event-peaceful':'');app.innerHTML=`${topbar()}<section class="screen compact-event ${theme}"><div class="progress-head"><span>${e.age}～${e.age+9}歲 · 第${state.index+1}關 / ${D.timeline.length}</span><span>十年一關 · 隨機人生</span></div>${progressLevels()}<div class="event-hero">${art(e)}<h2>${e.title}</h2><p>${e.story}</p></div>${peaceCelebration(e)}${funds(r)}<div class="coverage-status">本關：${tierFor(state.index).name} · 人身保費合計 ${fmt(r.personalPremium)}／十年${e.severity?' · '+e.severity:''}</div>${annualChoices(r)}${e.id==='trip'?tripChoices(r):''}${!tripPending?impact(r)+eventAdvice(r,state.index):''}${r.purchase||r.tripCost||r.tripPremium||r.bonus?`<div class="card breakdown">${row('本關房車頭期款',-r.purchase)}${row('旅費',-r.tripCost)}${row('單次海外保費',-r.tripPremium)}${row('獎金入帳',r.bonus)}</div>`:''}${related(r)}${legal()}${futureProtection()}<div class="nextbar">${!tripPending?button('next',state.index===D.timeline.length-1?'人生旅程完成，查看總整理 →':(e.id==='peaceful'?'平安過關！':'完成本關，')+'前往'+(e.age+10)+'多歲 →'):''}</div></section>`;}
  function nextProtection(i=state.index){const d=state.decisions[i];return d.nextProtection||={tier:d.tier,coverage:{...d.coverage}};}
  function quotedPremium(year,i,choice){const tier=E.coverageTiers.find(t=>t.id===choice.tier)||E.coverageTiers[0];return D.plans.reduce((sum,p)=>sum+(choice.coverage[p.id]?Math.round(p.monthlyPremium*E.premiumAgeFactors[i+startStage()]*tier.fee):0),0);}
  function futurePremiumQuote(i,choice){const t=D.timeline[i+1],startFee=quotedPremium(t.start,i+1,choice),endFee=quotedPremium(t.start+9,i+1,choice);let decadeFee=0;for(let y=t.start;y<t.start+10;y++)decadeFee+=quotedPremium(y,i+1,choice)*12;return row('下個十年起始每月保費約',-startFee)+(endFee!==startFee?row('下個十年末每月保費約',-endFee):'')+row('下個十年保費合計約',-decadeFee);}
  function futureProtection(){const i=state.index;if(i>=D.timeline.length-1)return '';const t=D.timeline[i+1],choice=nextProtection(i);return `<section class="future-protection" aria-labelledby="future-protection-heading"><div class="section-title"><div><h3 id="future-protection-heading">未來十年，要不要調整保險？</h3><p>${t.age}～${t.age+9}歲生效 · 本關事件與餘額不受影響</p></div></div><div class="tier-options">${E.coverageTiers.map(tier=>`<label class="card tier-option"><input type="radio" name="next-coverage-tier" data-next-coverage-tier value="${tier.id}" ${choice.tier===tier.id?'checked':''}><b>${tier.name}</b><small>費用係數 ${tier.fee} 倍 · 對應保障全配時最多分擔 ${Math.round(tier.share*100)}%</small></label>`).join('')}</div><div class="card breakdown" id="next-coverage-quote" aria-live="polite">${futurePremiumQuote(i,choice)}</div><details class="annual-options"><summary>調整未來十年的保障種類</summary><div class="annual-options-body">${D.plans.map(p=>`<label class="purchase-toggle"><input type="checkbox" data-next-stage-plan="${p.id}" ${choice.coverage[p.id]?'checked':''}>${p.name}</label>`).join('')}</div></details><p class="future-protection-note">不調整就沿用目前設定。按下前往下一關後生效，不能回溯給付已發生的事件；上方估算尚未從本關扣款。保費只依年齡段與保障等級計算，同一十年不再逐年漲價。比例為對應保障全配的遊戲上限，未選的類型不給付，並非實際保單條件。</p></section>`;}
  function prepareStage(){const prior=state.decisions[state.index-1],choice=prior?.nextProtection||prior;state.decisions[state.index]||={buyCar:false,buyHouse:false,sellHouse:false,carPlan:'basic',housePlan:'basic',travel:false,tripPlan:'basic',resolved:false,travelAccident:false,tier:choice?.tier||'base',coverage:{...(choice?.coverage||state.plans)}};if(!state.run[state.index])state.run[state.index]=drawEvent(state.index);eventPage();}
  function enterStage(){prepareStage();}
  function calculatePersonalPayouts(e, coverage, tier) {
    const relevant = D.plans.filter(p => e.coverages[p.id] > 0);
    const weight = relevant.reduce((sum, p) => sum + e.coverages[p.id], 0);
    if (!weight) return [];
    const limit = Math.floor(e.baseCost * tier.share);
    let remaining = limit;
    return relevant.map(p => {
      const amount = coverage[p.id] ? Math.min(remaining, Math.floor(limit * e.coverages[p.id] / weight)) : 0;
      remaining -= amount;
      return { id: p.id, name: p.name, amount };
    });
  }
  function coverageReport(rows) {
    const report = D.plans.map(p => ({ id: p.id, name: p.name, info: p,
      premium: rows.reduce((s, r) => s + (r.personalPremiumByPlan[p.id] || 0), 0),
      benefit: rows.reduce((s, r) => s + r.used.filter(x => x.id === p.id).reduce((v, x) => v + x.amount, 0), 0),
      events: rows.filter(r => r.used.some(x => x.id === p.id && x.amount > 0)).length,
      chosen: rows.some((r, i) => coverageFor(i)[p.id]) }));
    for (const kind of ['car', 'house']) {
      const runningKey = kind === 'car' ? 'carRunning' : 'houseRunning';
      const monthlyRunning = kind === 'car' ? E.car.monthlyRunning : E.house.monthlyMaintenance;
      const premium = rows.reduce((sum, r, i) => sum + (r[runningKey] / monthlyRunning) * selected(E[kind].plans, rows[i - 1]?.[kind + 'Plan'] || 'none').monthly, 0);
      report.push({ id: kind, name: D.catalog[kind].name, info: D.catalog[kind], premium,
        benefit: rows.reduce((sum, r) => sum + r.used.filter(x => x.id === kind).reduce((v, x) => v + x.amount, 0), 0),
        events: rows.filter(r => r.used.some(x => x.id === kind && x.amount > 0)).length,
        chosen: rows.some(r => selected(E[kind].plans, r[kind + 'Plan']).monthly > 0) });
    }
    report.push({ id: 'travel', name: '單次海外保障', info: D.catalog.travel,
      premium: rows.reduce((sum, r) => sum + r.tripPremium, 0),
      benefit: rows.reduce((sum, r) => sum + r.used.filter(x => x.id === 'travel').reduce((v, x) => v + x.amount, 0), 0),
      events: rows.filter(r => r.used.some(x => x.id === 'travel' && x.amount > 0)).length,
      chosen: rows.some(r => r.tripPremium > 0) });
    return report.filter(p => p.chosen || p.premium || p.benefit).map(p => ({ ...p, difference: p.benefit - p.premium }));
  }
  function compareProtection(rows, scenario) {
    let extraPremium = 0, extraBenefit = 0;
    rows.forEach((r, i) => {
      if (scenario.kind === 'personal') {
        const coverage = { ...coverageFor(i) };
        if (scenario.addPlan) coverage[scenario.addPlan] = true;
        const tier = scenario.tier ? E.coverageTiers.find(t => t.id === scenario.tier) : tierFor(i);
        const choice = { coverage, tier: tier.id };
        const paid = D.timeline[i].years * 12 * quotedPremium(D.timeline[i].start, i, choice);
        extraPremium += paid - r.personalPremium;
        const benefit = calculatePersonalPayouts(r.e, coverage, tier).reduce((sum, p) => sum + p.amount, 0);
        extraBenefit += benefit - r.used.filter(p => D.plans.some(x => x.id === p.id)).reduce((sum, p) => sum + p.amount, 0);
      } else if (scenario.kind === 'travel') {
        if (!r.d.travel) return;
        const high = selected(E.travelPlans, 'plus');
        extraPremium += high.premium - r.tripPremium;
        if (r.e.id === 'trip') extraBenefit += assetPayout(r.cost, high) - r.benefit;
      } else {
        const kind = scenario.kind, cfg = E[kind];
        const months = kind === 'car' ? r.carRunning / cfg.monthlyRunning : r.houseRunning / cfg.monthlyMaintenance;
        if (!months) return;
        const old = selected(cfg.plans, rows[i - 1]?.[kind + 'Plan'] || 'none'), high = selected(cfg.plans, 'plus');
        extraPremium += months * (high.monthly - old.monthly);
        if (r.e.coverages[kind]) extraBenefit += assetPayout(r.cost, high) - r.benefit;
      }
    });
    return { ...scenario, extraPremium, extraBenefit, netChange: extraBenefit - extraPremium,
      endingCash: rows[rows.length - 1].balance + extraBenefit - extraPremium };
  }
  function eventOpportunity(r, i) {
    if (!r.cost) return null;
    if (r.e.id === 'trip') {
      const plus = selected(E.travelPlans, 'plus');
      return { name: '這趟旅程事前選海外加強方案', extraBenefit: assetPayout(r.cost, plus) - r.benefit,
        extraPremium: plus.premium - r.tripPremium };
    }
    for (const kind of ['car', 'house']) if (r.e.coverages[kind]) {
      const cfg = E[kind], prior = ledger()[i - 1], current = selected(cfg.plans, prior?.[kind + 'Plan'] || 'none'), high = selected(cfg.plans, 'plus');
      const months = kind === 'car' ? r.carRunning / cfg.monthlyRunning : r.houseRunning / cfg.monthlyMaintenance;
      return { name: kind === 'car' ? '本階段開始前配置車體加強保障' : '本階段開始前配置住宅加強保障',
        extraBenefit: assetPayout(r.cost, high) - r.benefit, extraPremium: months * (high.monthly - current.monthly) };
    }
    const coverage = { ...coverageFor(i) };
    const missing = D.plans.filter(p => r.e.coverages[p.id] && !coverage[p.id]);
    missing.forEach(p => { coverage[p.id] = true; });
    const tier = E.coverageTiers.find(t => t.id === 'max');
    const benefit = calculatePersonalPayouts(r.e, coverage, tier).reduce((s, p) => s + p.amount, 0);
    return { name: '本階段事前改為高額保障' + (missing.length ? '，並補上' + missing.map(p => p.name).join('、') : ''),
      extraBenefit: benefit - r.benefit,
      extraPremium: quotedPremium(D.timeline[i].start, i, { coverage, tier: 'max' }) * D.timeline[i].years * 12 - r.personalPremium };
  }
  function netSavings(benefit, premium) {
    const net = benefit - premium;
    return `<div class="breakdown-row net-result ${net < 0 ? 'deficit' : 'surplus'}"><span>${net > 0 ? '扣除新增保費後，省下' : net < 0 ? '扣除新增保費後，多花' : '扣除新增保費後，收支相同'}</span><b>${fmt(net)}</b></div>`;
  }
  function eventAdvice(r, i) {
    if(!r.cost)return '';
    const offer=eventOpportunity(r,i);if(!offer||offer.extraBenefit<=0)return '';
    return `<details class="event-review"><summary><span>如果當時補強保障，還能少付多少？</span><b class="surplus">${fmt(offer.extraBenefit)}</b></summary><div class="review-body"><p class="coverage-recommendation">${offer.name}</p>${row('這次事故還能少自付',offer.extraBenefit)}${row('本階段／旅程要多付保費',-offer.extraPremium)}${netSavings(offer.extraBenefit,offer.extraPremium)}<p class="review-explainer">僅為事前配置的遊戲比較，不能事後補買；這是當下事件試算，完整旅程比較請看最後總整理。</p></div></details>`;
  }
  function eventReview(r, i) {
    if (!r.cost) return `<div class="card review-peace"><b>${r.e.age}～${r.e.age + 9}歲｜${r.e.title}</b><p>本關沒有事故支出與給付；平時的保費仍照常計入。</p></div>`;
    const offer = eventOpportunity(r, i), used = r.used.filter(p => p.amount > 0);
    return `<details class="event-review"><summary><span>${r.e.emoji} ${r.e.age}～${r.e.age + 9}歲｜${r.e.title}</span><b class="${r.benefit ? 'surplus' : 'deficit'}">${r.benefit ? '保障分擔 ' + fmt(r.benefit) : '本次全部自付'}</b></summary><div class="review-body"><div class="compare-grid"><div class="compare bad"><span>同一事故，沒有對應保障</span><b class="deficit">${fmt(r.cost)}</b><small>事故費用全額自行負擔</small></div><div class="compare good"><span>你實際選擇的保障</span><b class="deficit">自付 ${fmt(r.cost - r.benefit)}</b><small>少自行負擔 ${fmt(r.benefit)}，尚未扣除保費</small></div></div><div class="card breakdown">${used.map(p => row('✓ 用到 ' + p.name, p.amount)).join('') || '<p>本事件沒有符合已配置保障的給付。</p>'}</div>${offer && offer.extraBenefit > 0 ? `<div class="opportunity-box"><b>如果當時多準備一點？</b><p class="coverage-recommendation">${offer.name}</p>${row('本次事故還能少自付', offer.extraBenefit)}${row('該階段／旅程需多付保費', -offer.extraPremium)}${netSavings(offer.extraBenefit,offer.extraPremium)}<small>這是單一事件的事前假設；不能事故後補買。不同事件的方案可能重疊，不可把這裡的數字直接相加。</small></div>` : '<p class="review-explainer">本次已達目前遊戲對應保障的分擔上限，或沒有可提高給付的對應方案。</p>'}${related(r)}</div></details>`;
  }
  function relevantProtection(rows) {
    const incidents = rows.filter(r => r.cost > 0);
    const coverage = Object.fromEntries(D.plans.map(p => [p.id, incidents.some(r => r.e.coverages[p.id] > 0)]));
    const personal = D.plans.filter(p => coverage[p.id]);
    const tier = E.coverageTiers.find(t => t.id === 'base');
    const infos = [...personal];
    let premium = rows.reduce((sum, r, i) => sum + quotedPremium(D.timeline[i].start, i, { coverage, tier: tier.id }) * D.timeline[i].years * 12, 0);
    let benefit = incidents.reduce((sum, r) => sum + calculatePersonalPayouts(r.e, coverage, tier).reduce((v, p) => v + p.amount, 0), 0);
    for (const kind of ['car', 'house']) {
      if (!incidents.some(r => r.e.coverages[kind] && r[kind === 'car' ? 'priorHasCar' : 'priorHasHouse'])) continue;
      infos.push(D.catalog[kind]);
      const cfg = E[kind], plan = selected(cfg.plans, 'basic');
      for (const r of rows) {
        const months = kind === 'car' ? r.carRunning / cfg.monthlyRunning : r.houseRunning / cfg.monthlyMaintenance;
        premium += months * plan.monthly;
        if (months && r.e.coverages[kind]) benefit += assetPayout(r.cost, plan);
      }
    }
    const trips = incidents.filter(r => r.e.id === 'trip' && r.d.travel);
    if (trips.length) {
      infos.push(D.catalog.travel);
      const plan = selected(E.travelPlans, 'basic');
      premium += trips.length * plan.premium;
      benefit += trips.reduce((sum, r) => sum + assetPayout(r.cost, plan), 0);
    }
    return { names: infos.map(p => p.name), infos, coverage, premium, benefit, net: benefit - premium };
  }
  function summary() {
    state.screen = 'summary';
    const rows = ledger(), sum = k => rows.reduce((s, r) => s + r[k], 0), end = rows[rows.length - 1].balance;
    const totalCost = sum('cost'), totalBenefit = sum('benefit'), totalPremium = sum('totalPremium');
    const noInsuranceCash = end + totalPremium - totalBenefit, netDifference = totalBenefit - totalPremium;
    const report = coverageReport(rows);
    const hindsight = relevantProtection(rows);
    app.innerHTML = `${topbar()}<section class="screen summary-report"><div class="summary-hero"><small>你的保障回顧｜同一趟人生的收支比較</small><h2>${totalBenefit ? '這趟人生，保障替你分擔了' : '這趟人生，沒有產生保障給付'}</h2>${totalBenefit ? `<div class="final-balance surplus">${fmt(totalBenefit)}</div><p>這是事故發生時少自行負擔的金額；保費已另列，並不等於實際賺到或淨省下的錢。</p>` : '<p>可能是平安度過，或沒有配置對應保障。保障也有持續付費、最後沒有用到的可能。</p>'}</div><div class="insurance-metrics"><div class="card"><span>事故費用合計</span><b class="deficit">${fmt(totalCost)}</b></div><div class="card"><span>保障幫忙分擔</span><b class="surplus">${fmt(totalBenefit)}</b></div><div class="card"><span>事故仍須自付</span><b class="deficit">${fmt(totalCost - totalBenefit)}</b></div></div><div class="card breakdown">${row('一路付出的保費', -totalPremium)}${row('給付減保費：本趟現金差額', netDifference, true)}<p class="review-explainer">保險的作用是分攤不確定的大額支出。這局若保費高於給付，會如實顯示；一次模擬不能代表未來投保一定划算。</p></div><div class="section-title"><div><h3>每個意外，保險怎麼幫你？</h3><p>展開看用到的保障、自付額，以及當時補強的差異。</p></div></div>${rows.map((r, i) => eventReview(r, i)).join('')}<details class="event-review"><summary>查看實際購買的保障與給付明細</summary><div class="review-body"><div class="insurance-report-list">${report.map(p => `<article class="card insurance-report-card"><div class="coverage-head"><b>${p.name}</b><span class="status-pill">${p.events ? p.events + '次事件給付' : '本趟未給付'}</span></div>${row('累計保費', -p.premium)}${row('累計分擔事故費用', p.benefit)}${row('給付減保費', p.difference, true)}${!p.premium && p.chosen ? '<small>已選擇此保障，但本趟尚未開始扣費。</small>' : ''}${policyCard(p.info, '官方保障內容與條款入口')}</article>`).join('') || '<div class="notice">這趟未配置任何付費保障，事件費用均需自行負擔。</div>'}</div></div></details><div class="section-title"><div><h3>如果當初買齊這趟用得到的保障？</h3><p>把這趟事故相關的保障合成一份總計，以基本保障試算。</p></div></div><article class="card relevant-protection"><p><b>${hindsight.names.join('、') || '本趟沒有事故需要對應保障'}</b></p>${row('這組保障總共要付的保費', -hindsight.premium)}${row('事故可少自行負擔的金額', hindsight.benefit)}${row(hindsight.net >= 0 ? '扣掉保費後，合計省下' : '扣掉保費後，反而多支出', hindsight.net, true)}${row('事故仍需自己付', -(totalCost - hindsight.benefit))}<p class="review-explainer">人身保障從${D.timeline[0].age}歲起持續付費到旅程結束；車險與住宅險只計實際持有月份，海外險只計發生事故的該次旅行。即使平安的年份也計保費，同一保障不重複加總。這是替代原配置的一組總額，不是另外加買的差額。</p><details class="policy-details"><summary>查看這組保障內容與南山官方連結</summary><div class="policy-body">${hindsight.infos.map(p => policyCard(p, '可進一步了解／現行商品範例')).join('') || '<p>本趟沒有事故相關保障。</p>'}</div></details></article><div class="notice">這是旅程結束後，依已發生事故整理的遊戲回顧；當時無法預知哪些保障會用到，也不能事故後補買或追溯給付。省下金額以「完全不買保險、遇到相同事故」為比較基準，並非未知未來的投保建議。</div><div class="section-title"><div><h3>最後剩多少？一起看保費的影響</h3></div></div><div class="compare-grid"><div class="compare"><span>你這次的最終現金</span><b class="${end < 0 ? 'deficit' : 'surplus'}">${money(end)}</b><small>已扣全部保費與自付支出</small></div><div class="compare"><span>相同劇情，完全不買保險</span><b class="${noInsuranceCash < 0 ? 'deficit' : 'surplus'}">${money(noInsuranceCash)}</b><small>移除保費與給付；事故仍照原劇情發生</small></div></div><details class="event-review"><summary>展開完整人生收支帳本</summary><div class="review-body">${row('起始存款', state.profile.savings)}${row('薪資與退休收入', sum('income'))}${row('基本生活開銷', -sum('expenses'))}${row('所有保費', -totalPremium)}${row('房車頭期款、貸款、持有費、旅費及售屋清償', -sum('otherCost'))}${row('售屋價金', sum('saleGross'))}${row('事故費用', -totalCost)}${row('保障假設給付', totalBenefit)}${row('幸運獎金', sum('bonus'))}${row('最終現金餘額', end, true)}</div></details><div class="notice">本報告只計現金，不含尚持有房車市值或未償債務；房貸、售屋、薪資及生活費沿用遊戲設定。正數為入帳／現金增加，紅字為扣款／缺口；給付不等於扣除保費後的淨節省。</div>${legal()}${button('setup', '換個保障配置，再模擬一次')}</section>`;
  }

  function advice() { const budget = Math.max(0, Math.min(state.profile.income * .1, (state.profile.income - state.profile.expenses) * .5)); return `<b>先看每月生活餘額</b><p>扣除生活費後可安排 ${fmt(Math.max(0, state.profile.income - state.profile.expenses))}。本站以薪資10%與生活結餘50%較低者作為參考上限 ${fmt(budget)}；這是預算提示，不是南山投保標準或個別保單適合度判定。</p>`; }
  function setup() {
    state.screen = 'setup'; const available = state.profile.income - state.profile.expenses - premium();
    app.innerHTML = `${topbar()}<section class="screen"><div class="section-title"><div><h3>先決定起點與保障</h3><p>先選初始保障；之後在每關事件頁下方調整下一個十年的保障。</p></div></div><div class="form-card"><div class="field"><label for="start-stage">從哪個階段開始？</label><select class="select" id="start-stage" data-start-stage>${allTimeline.map((t,i)=>`<option value="${i}" ${startStage()===i?'selected':''}>${t.age}～${t.age+9}歲</option>`).join('')}</select><small>只計入選定階段到70～79歲的收支與事件；起始時沒有房車，30歲後可自行選購。</small></div>${[['income','起始每月收入（薪資／退休收入）'],['savings','起始存款'],['expenses','起始每月基本開銷（不含保險）']].map(([id,label]) => `<div class="field"><label for="${id}">${label}</label><input class="input" id="${id}" type="number" min="0" max="1000000000" step="1000" value="${state.profile[id]}"></div>`).join('')}</div><div class="notice" id="setup-advice">${advice()}</div><div class="section-title"><div><h3>選擇人身保障</h3><p>固定遊戲概估，海外與房車保障只在相關事件出現。</p></div></div><div class="plan-list">${D.plans.map(p => `<article class="card plan-card"><input aria-label="配置${p.name}" type="checkbox" data-plan="${p.id}" ${state.plans[p.id] ? 'checked' : ''}><div class="plan-details"><b>${p.emoji} ${p.name}</b><p>起始每月約 ${fmt(initialPlanPremium(p))}（遊戲概估）</p><small>${p.description}</small>${policyCard(p)}</div></article>`).join('')}</div><div id="setup-difficulty" class="notice">${difficultyNote()}</div><div id="setup-budget" class="card breakdown">${row('起始每月保費約', -premium())}${row('起始每月可用金額', available, true)}</div><div class="notice">每關十年、每關計入120個月；薪資年增3%、生活費年增2%，人身保費只依年齡段與保障等級調整，60歲起改以退休前月薪40%模擬退休收入；若從60歲以上開始，輸入的收入直接作為每月退休收入。起始收入與生活費以所選年齡為基準，先前年份不補算。都是遊戲假設，不代表真實成長率或保單續保條件。</div>${legal()}<div class="nextbar">${button('start', '配置完成，開始人生旅程 →')}</div></section>`;
  }
  function saveProfile() { for (const id of ['income','savings','expenses']) { const input = document.getElementById(id); if (!input.checkValidity()) return false; state.profile[id] = Number(input.value); } const stage = Number(document.getElementById('start-stage')?.value ?? startStage()); state.profile.startStage = Number.isInteger(stage) && stage >= 0 && stage < allTimeline.length ? stage : 0; return true; }
  function home() { state.screen = 'home'; app.innerHTML = `${topbar()}<section class="screen"><div class="hero"><div class="eyebrow">十年一關，隨機人生</div>${art({id:'home',age:40})}<h1>NANSHAN <span>LifeLab</span></h1><h2>每一次選擇，都看見錢的去向。</h2><p>買車、買房，勾選就看見現金變化。遇到事故，看看自己要付多少、哪些保障真的幫上忙。從20多歲就可能遇見意外，也可能平安過關。每十年揭曉一次人生事件，房車計畫可在30多歲以後的各關調整。</p><div class="cta-row"><button class="btn btn-primary" data-action="setup">開始我的人生旅程 →</button><button class="btn btn-secondary" data-action="about">關於這個模擬</button></div></div><div class="notice">可選20～29歲到70～79歲的任一階段作為起點，最長六關；每關隨機揭曉平安、意外或少數幸運事件。平安過關不代表每個人都會遇到相同劇情。30多歲後可選買車、買房或賣房，保障持續扣費，每關事件下方可調整下一個十年的保障；旅遊邀請最多一次。</div>${legal()}</section>`; }
  function about() { state.screen = 'about'; app.innerHTML = `${topbar()}<section class="screen"><div class="section-title"><div><h3>關於這段旅程</h3></div></div><div class="card about-block"><p>人身保障內容參考南山人壽官方資訊；汽車、住宅與部分旅遊內容連至南山產物。兩者是不同公司與保險商品，遊戲方案不等同實際保單。</p></div>${D.sources.map(s => `<a class="source-link" href="${s.url}" target="_blank" rel="noopener"><b>${s.title} ↗</b></a>`).join('')}${legal()}<div class="notice">法遵提示：若作為南山官方工具對外發布，商品、保費與理賠內容、品牌使用、個資及招攬流程均應交由相關單位審核。</div></section>`; }
  app.addEventListener('input', ev => {
    const el = ev.target;
    if (state.screen === 'setup') {
      if (el.matches('[data-plan]')) state.plans[el.dataset.plan] = el.checked;
      saveProfile(); if (el.matches('[data-start-stage]')) { setup(); return; } document.getElementById('setup-advice').innerHTML = advice(); document.getElementById('setup-difficulty').innerHTML = difficultyNote(); document.getElementById('setup-budget').innerHTML = row('起始每月保費約', -premium()) + row('起始每月可用金額', state.profile.income - state.profile.expenses - premium(), true); return;
    }
    if (state.screen !== 'event') return;
    const d = state.decisions[state.index];
    if (d.committed) return;
    if(el.matches('[data-next-coverage-tier]')&&state.index<D.timeline.length-1)nextProtection().tier=el.value;
    else if(el.matches('[data-next-stage-plan]')&&state.index<D.timeline.length-1)nextProtection().coverage[el.dataset.nextStagePlan]=el.checked;
    else if (el.matches('[data-annual-buy-car]')) d.buyCar = el.checked;
    else if (el.matches('[data-annual-buy-house]')) d.buyHouse = el.checked;
    else if (el.matches('[data-sell-house]')) d.sellHouse = el.checked;
    else if (el.matches('[data-car-plan]')) d.carPlan = el.value;
    else if (el.matches('[data-house-plan]')) d.housePlan = el.value;
    else if (el.matches('[data-trip-choice]') && !d.resolved) d.travel = el.checked;
    else if (el.matches('[data-trip-plan]') && !d.resolved) d.tripPlan = el.value;
    else return;
    if(el.matches('[data-next-coverage-tier]')||el.matches('[data-next-stage-plan]')){
      // Preserve the native controls, expanded details, focus and scroll position.
      const quote=document.getElementById('next-coverage-quote');
      if(quote)quote.innerHTML=futurePremiumQuote(state.index,nextProtection());
      return;
    }
    eventPage();
  });
  app.addEventListener('click', ev => {
    const el = ev.target.closest('[data-action]'); if (!el) return;
    switch (el.dataset.action) {
      case 'home': home(); break;
      case 'setup': setup(); break;
      case 'about': about(); break;
      case 'start': if (!saveProfile()) { app.querySelector('input:invalid')?.reportValidity(); return; } D.timeline = allTimeline.slice(startStage()); state.index = 0; state.run = []; state.decisions = []; enterStage(); break;
      case 'resolve-trip': { const d = state.decisions[state.index]; if (!d.resolved) { d.travelAccident = d.travel && Math.random() < E.travelAccidentChance; d.resolved = true; } eventPage(); break; }
      case 'next': { const d = state.decisions[state.index]; if (state.run[state.index].id === 'trip' && !d.resolved) return; d.committed = true; if (state.index < D.timeline.length - 1) { state.index++; enterStage(); } else summary(); break; }
    }
    window.scrollTo(0, 0);
  });
  home();
})();
