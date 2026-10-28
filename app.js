(() => {
  const D = window.APP_DATA, E = D.economy, app = document.querySelector('#app');
  const state = { screen: 'home', index: 0, run: [], decisions: [],
    profile: { income: 30000, savings: 100000, expenses: 25000 },
    plans: Object.fromEntries(D.plans.map((p, i) => [p.id, i < 5])) };
  const fmt = n => new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', maximumFractionDigits: 0 }).format(n);
  const money = n => n === 0 ? '收支平衡' : fmt(n);
  const premium = () => D.plans.reduce((sum, p) => sum + (state.plans[p.id] ? p.monthlyPremium : 0), 0);
  const row = (label, value, balance = false) => Math.round(value) === 0 ? '' : `<div class="breakdown-row"><span>${label}</span><b class="${value < 0 ? 'deficit' : 'surplus'}">${fmt(value)}</b></div>`;
  const topbar = () => `<header class="topbar"><div class="brand-mini"><div class="brand-mark">N</div><div><strong>NANSHAN LifeLab</strong><small>人生風險與收支實驗室</small></div></div><button class="icon-btn" data-action="home">首頁</button></header>`;
  const legal = () => `<div class="notice compact-notice">教育模擬：金額、保費與給付均為遊戲概估，不是市場平均、正式報價或實際理賠。官方商品供進一步了解，與遊戲方案不直接對應；實際投保、續保、保障期限、等待期間及給付依正式條款與審核。遊戲假設人身與房車保障持續有效並扣費，不代表真實商品可終身續保。</div>`;
  const button = (action, text) => `<button class="btn btn-dark btn-block" data-action="${action}">${text}</button>`;
function photoFor(e){const key=e.id==='peaceful'?(e.age<35?'peace-young':e.age<60?'peace-family':'peace-senior'):(D.eventPhotoMap[e.id]||'hospital');return {...D.eventPhotos[key],key};}
function art(e){const p=photoFor(e);return `<figure class="event-photo photo-${p.tone}" data-photo="${p.key}"><img src="${p.src}" alt="${p.alt}" width="1672" height="941" decoding="async" fetchpriority="high" style="object-position:${p.position}"><figcaption><span class="photo-kicker">${p.label}</span><span class="photo-ai">AI情境示意</span></figcaption></figure>`;}

  function incomeAt(year) { return 20 + year < E.retirementAge ? Math.round(state.profile.income * (1 + E.salaryGrowth) ** year) : Math.round(state.profile.income * (1 + E.salaryGrowth) ** 39 * E.pensionRatio); }
  function expenseAt(year) { return Math.round(state.profile.expenses * (1 + E.expenseGrowth) ** year); }
  function coverageFor(i){return state.decisions[i]?.coverage||state.plans;}
  function tierFor(i){return E.coverageTiers.find(t=>t.id===state.decisions[i]?.tier)||E.coverageTiers[0];}
  function planPremiumAt(p,year,i=Math.min(5,Math.floor(year/10))){return coverageFor(i)[p.id]?Math.round(p.monthlyPremium*(1+E.premiumGrowth)**year*E.premiumAgeFactors[i]*tierFor(i).fee):0;}
  function premiumAt(year,i=Math.min(5,Math.floor(year/10))){return D.plans.reduce((sum,p)=>sum+planPremiumAt(p,year,i),0);}
  function selected(plans, id) { return plans.find(p => p.id === id) || plans[0]; }
  function personalPayouts(e, index=state.index) {
    let remaining = e.baseCost;
    return D.plans.filter(p => e.coverages[p.id]).map(p => {
      const amount = coverageFor(index)[p.id] ? Math.min(remaining, Math.round(e.coverages[p.id]*tierFor(index).benefit)) : 0;
      remaining -= amount; return { id: p.id, name: p.name, amount };
    });
  }
  function mortgageRate(){let low=0,high=.02;for(let i=0;i<80;i++){const rate=(low+high)/2,payment=E.house.loanPrincipal*rate/(1-(1+rate)**(-E.house.mortgageYears*12));if(payment>E.house.mortgageMonthly)high=rate;else low=rate;}return (low+high)/2;}
  const loanRate=mortgageRate();
  function loanBalance(months){if(months>=E.house.mortgageYears*12)return 0;const growth=(1+loanRate)**Math.max(0,months);return Math.max(0,Math.round(E.house.loanPrincipal*growth-E.house.mortgageMonthly*(growth-1)/loanRate));}
  function hasActiveCoverage(prior){return D.plans.some(p=>coverageFor(state.index)[p.id])||!!(prior?.hasCar&&selected(E.car.plans,prior.carPlan).monthly>0)||!!(prior?.hasHouse&&selected(E.house.plans,prior.housePlan).monthly>0);}
  function eventRiskRate(prior){return (hasActiveCoverage(prior)?E.stageRiskRates:E.uninsuredRiskRates)[state.index];}
  function difficultyNote(){return '<b>風險壓力挑戰</b><p>一般模式的風險事件抽選率隨年齡由65%提高至88%；完全沒有持續保障時為82%～96%。事故費用依事件、年齡及隨機嚴重程度計算。這是遊戲難度設定，不代表真實事故率或醫療費行情。</p>';}
  function drawEvent(i){const t=D.timeline[i],age=t.age,base={age,stage:age+'歲',baseCost:0,coverages:{},years:t.years};const prior=ledger()[i-1];
    if(i>0&&!state.run.some(e=>e?.id==='trip')&&Math.random()<.08)return {...base,id:'trip',emoji:'✈️',title:age+'多歲，收到一次旅行邀請',story:'旅遊任務最多出現一次。先決定是否出國，再同頁揭曉結果。房車選擇仍在本頁。'};
    const roll=Math.random();if(roll<.01){if(!state.run.some(e=>e?.id==='lottery'))return {...D.events.find(e=>e.id==='lottery'),...base};return {...D.events.find(e=>e.id==='peaceful'),age,stage:age+'歲',years:t.years};}
    if(roll>=.01+eventRiskRate(prior))return {...D.events.find(e=>e.id==='peaceful'),age,stage:age+'歲',years:t.years};
    const stage=D.stages[Math.min(5,Math.floor((age-20)/10))];const pool=age>=50?[...stage.pool,...stage.pool,'fall','fracture','scooter','major_trauma']:[...stage.pool,'fall','sports','burn','bike','hiking','glass','fracture','scooter','eye','dislocation'];if(prior?.hasCar)pool.push('car_collision','car_damage','car_rear');if(prior?.hasHouse)pool.push('house_fire','house_smoke');const recent=state.run.slice(-5).map(e=>e.id),fresh=pool.filter(id=>!recent.includes(id)),choices=fresh.length?fresh:pool;const chosenId=choices[Math.floor(Math.random()*choices.length)],source=D.events.find(e=>e.id===chosenId),severity=E.severityLevels[Math.floor(Math.random()*E.severityLevels.length)],ageFactor=source.coverages.car||source.coverages.house?1:E.medicalAgeFactors[i];return {...source,baseCost:Math.round(source.baseCost*severity.factor*ageFactor/1000)*1000,severity:severity.name,age,stage:age+'歲',years:t.years};
  }
  function ledger(){let cash=state.profile.savings,carYear=-1,houseYear=-1,carPlan='none',housePlan='none';const rows=[];
    for(let i=0;i<state.run.length;i++){const e=state.run[i],d=state.decisions[i];if(!e||!d)break;const t=D.timeline[i],before=cash,priorHasCar=carYear>=0,priorHasHouse=houseYear>=0;let income=0,expenses=0,personalPremium=0,personalPremiumByPlan={},assetPremium=0,carRunning=0,mortgage=0,houseRunning=0;
      for(let y=t.start;y<t.start+t.years;y++){income+=incomeAt(y)*12;let living=expenseAt(y)*12;for(const p of D.plans){const amount=planPremiumAt(p,y,i)*12;personalPremiumByPlan[p.id]=(personalPremiumByPlan[p.id]||0)+amount;personalPremium+=amount;}if(carYear>=0&&y>=carYear){carRunning+=E.car.monthlyRunning*12;assetPremium+=selected(E.car.plans,carPlan).monthly*12;}if(houseYear>=0&&y>=houseYear){if(y-houseYear<E.house.mortgageYears)mortgage+=E.house.mortgageMonthly*12;houseRunning+=E.house.monthlyMaintenance*12;assetPremium+=selected(E.house.plans,housePlan).monthly*12;living-=Math.min(living,Math.min(state.profile.expenses,E.house.rentReduction)*12);}expenses+=living;}
      cash+=income-expenses-personalPremium-assetPremium-carRunning-mortgage-houseRunning;const available=cash;
      const tripCost=e.id==='trip'&&d.travel?E.tripCost:0,tripPremium=tripCost?selected(E.travelPlans,d.tripPlan).premium:0,cost=e.id==='trip'?(d.resolved&&d.travelAccident?E.travelMedicalCost:0):e.baseCost;let used=personalPayouts(e,i);
      // Accident precedes year-end transactions: a newly bought policy cannot cover it retroactively.
      if(e.coverages.car)used=[{id:'car',name:selected(E.car.plans,carPlan).name,amount:priorHasCar?Math.min(cost,selected(E.car.plans,carPlan).benefit):0}];if(e.coverages.house)used=[{id:'house',name:selected(E.house.plans,housePlan).name,amount:priorHasHouse?Math.min(cost,selected(E.house.plans,housePlan).benefit):0}];if(e.id==='trip')used=[{id:'travel',name:selected(E.travelPlans,d.tripPlan).name,amount:cost?Math.min(cost,selected(E.travelPlans,d.tripPlan).benefit):0}];
      const benefit=used.reduce((sum,p)=>sum+p.amount,0),bonus=e.bonus||0;cash+=bonus+benefit-cost-tripCost-tripPremium;const afterIncident=cash;let purchase=0,saleGross=0,saleFees=0,loanPayoff=0;
      if(t.age>=30){if(d.buyCar&&!priorHasCar){carYear=t.start+t.years;carPlan=d.carPlan;purchase+=E.car.price;}if(d.sellHouse&&priorHasHouse){saleGross=E.salePrice;saleFees=Math.round(saleGross*E.saleFeeRate);loanPayoff=loanBalance((t.start+t.years-houseYear)*12);cash+=saleGross-saleFees-loanPayoff;houseYear=-1;housePlan='none';}else if(d.buyHouse&&!priorHasHouse){houseYear=t.start+t.years;housePlan=d.housePlan;purchase+=E.house.downPayment;}}
      cash-=purchase;const y=t.start+t.years-1,monthlyIncome=incomeAt(y),monthlyLiving=Math.max(0,expenseAt(y)-(houseYear>=0?Math.min(state.profile.expenses,E.house.rentReduction):0)),recurring=premiumAt(y,i)+(carYear>=0?E.car.monthlyRunning+selected(E.car.plans,carPlan).monthly:0)+(houseYear>=0?E.house.monthlyMaintenance+selected(E.house.plans,housePlan).monthly+(t.start+t.years-houseYear<E.house.mortgageYears?E.house.mortgageMonthly:0):0);
      rows.push({e,d,before,available,afterIncident,income,expenses,personalPremium,personalPremiumByPlan,assetPremium,carRunning,mortgage,houseRunning,purchase,saleGross,saleFees,loanPayoff,saleNet:saleGross-saleFees-loanPayoff,tripCost,tripPremium,cost,used,benefit,bonus,balance:cash,priorHasCar,priorHasHouse,hasCar:carYear>=0,hasHouse:houseYear>=0,carYear,houseYear,carPlan,housePlan,monthlyIncome,monthlyAvailable:monthlyIncome-monthlyLiving-recurring,totalPremium:personalPremium+assetPremium+tripPremium,otherCost:carRunning+mortgage+houseRunning+purchase+tripCost+saleFees+loanPayoff});}
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
  function annualChoices(r){if(r.e.age<30)return '';return `<details class="annual-options" ${r.d.buyCar||r.d.buyHouse||r.d.sellHouse?'open':''}><summary>📅 ${r.e.age}歲這十年的房車選擇 · 可維持現況</summary><div class="annual-options-body">${r.priorHasCar?'<p>🚗 已持有汽車，原保障與養車費持續自動扣除，不必重選。</p>':`<label class="purchase-toggle"><input type="checkbox" data-annual-buy-car ${r.d.buyCar?'checked':''}>這十年買車，車款約60萬元</label>${r.d.buyCar?`<label for="car-plan">首次購車的保障配置</label><select id="car-plan" data-car-plan class="select">${E.car.plans.map(p=>`<option value="${p.id}" ${p.id===r.d.carPlan?'selected':''}>${p.name}${p.monthly?' · 約'+fmt(p.monthly)+'/月':''}</option>`).join('')}</select><p>往後養車約5,000元/月，加上所選保障，從下月開始持續扣款。</p>`:''}`}<hr>${r.priorHasHouse?`<label class="purchase-toggle"><input type="checkbox" data-sell-house ${r.d.sellHouse?'checked':''}>這十年賣房</label><p>遊戲固定售價600萬元，費用2%；先清償未償房貸本金，再將差額入帳。售出後下月停止房貸、維護與住宅保費，原生活費恢復含租金。</p>${r.d.sellHouse?`<div class="card breakdown">${row('售屋價金',r.saleGross)}${row('售屋費用',-r.saleFees)}${row('清償房貸本金',-r.loanPayoff)}${row('售屋淨入帳',r.saleNet,true)}</div>`:''}`:`<label class="purchase-toggle"><input type="checkbox" data-annual-buy-house ${r.d.buyHouse?'checked':''}>這十年買房，頭期款約120萬元</label>${r.d.buyHouse?`<label for="house-plan">首次購屋的住宅保障</label><select id="house-plan" data-house-plan class="select">${E.house.plans.map(p=>`<option value="${p.id}" ${p.id===r.d.housePlan?'selected':''}>${p.name}${p.monthly?' · 約'+fmt(p.monthly)+'/月':''}</option>`).join('')}</select><p>房價600萬元、貸款480萬元；月付2萬元共30年，維護約2,000元/月。持屋後原生活費至多8,000元/月租金予以扣除。</p>`:''}`}<p>勾選後即時更新餘額，不買也可以直接前進下一個十年。房車交易在本關事故之後，不能用當年新買的保障追溯給付。</p></div></details>`;}
  function tripChoices(r) {
    if (r.d.resolved) return `<div class="trip-resolved">${r.d.travel ? (r.cost ? '💔 旅途中突發疾病，需要支付醫療費。' : '☀️ 平安歸來，這次沒有額外醫療支出。') : '你選擇不出國，保留了旅遊預算。'}</div>`;
    return `<div class="card purchase-card"><label class="purchase-toggle"><input type="checkbox" data-trip-choice ${r.d.travel ? 'checked' : ''}><span>這次出國旅行，旅費約3萬元</span></label>${r.d.travel ? `<label for="trip-plan">這趟旅程的海外保障</label><select id="trip-plan" data-trip-plan class="select">${E.travelPlans.map(p => `<option value="${p.id}" ${r.d.tripPlan === p.id ? 'selected' : ''}>${p.name}${p.premium ? ' · 約' + fmt(p.premium) + '/次' : ''}</option>`).join('')}</select><p>只收這趟旅程的保費；不會加入日後每月固定費用。遊戲以35%機率出現海外醫療事件，情境醫療費約45萬元。</p>` : '<p>不參加就不收旅費及海外保費。</p>'}${button('resolve-trip', '確認選擇，同頁揭曉 →')}</div>`;
  }
  function impact(r) {
    if (!r.cost && !r.bonus) return '';
    if (r.bonus) return `<div class="impact-panel lucky"><span>🍀 幸運入帳</span><strong>+${fmt(r.bonus)}</strong></div>`;
    const protectedEvent = r.benefit > 0;
    return `<div class="impact-panel ${protectedEvent ? 'protected' : 'heartbreak'}"><span class="impact-symbol">${protectedEvent ? '🛡️' : '💔'}</span><h3>${protectedEvent ? '這次，有保障幫忙分擔。' : '這筆支出，只能自己扛。'}</h3><div class="bill-amount">-${fmt(r.cost)}</div>${protectedEvent ? `<p>假設保險給付 <b>+${fmt(r.benefit)}</b></p><div class="used-insurance">${r.used.filter(p => p.amount > 0).map(p => `<div><span>✓ ${p.name}</span><b>${fmt(p.amount)}</b></div>`).join('')}</div>` : '<p>本次沒有已配置且對應的保障給付。</p>'}<div class="out-of-pocket">這次自己付 <strong>${fmt(r.cost - r.benefit)}</strong></div><p class="impact-footnote">對照：相同事件若沒有對應保障，自付 ${fmt(r.cost)}。這只比較本次事故，歷年保費已另外扣除，不代表保險一定比較省。</p></div>`;
  }
  function progressLevels(){return `<div class="level-track" aria-label="人生關卡進度">${D.timeline.map((t,i)=>`<span class="level-step ${i<state.index?'complete':i===state.index?'active':''}">${i<state.index?'✓ ':''}${t.age}+</span>`).join('')}</div>`;}
  function peaceCelebration(e){if(e.id!=='peaceful')return '';return '<div class="peace-clear" role="status"><span class="peace-medal">🏅</span><div><b>平安過關 · 十年成就解鎖</b><p>這十年無大額意外開銷</p><small>平安也是值得慶祝的收穫！自選房車或旅費另計。</small></div><span class="celebrate-spark spark-a" aria-hidden="true">✦</span><span class="celebrate-spark spark-b" aria-hidden="true">✧</span><span class="celebrate-spark spark-c" aria-hidden="true">✦</span></div>';}
  function eventPage(){state.screen='event';const r=ledger()[state.index],e=r.e,tripPending=e.id==='trip'&&!r.d.resolved,theme=r.cost?(r.benefit?'event-protected':'event-heartbreak'):(r.bonus?'event-lucky':e.id==='peaceful'?'event-peaceful':'');app.innerHTML=`${topbar()}<section class="screen compact-event ${theme}"><div class="progress-head"><span>${e.age}～${e.age+9}歲 · 第${state.index+1}關 / ${D.timeline.length}</span><span>十年一關 · 隨機人生</span></div>${progressLevels()}<div class="event-hero">${art(e)}<h2>${e.title}</h2><p>${e.story}</p></div>${peaceCelebration(e)}${funds(r)}<div class="coverage-status">本關：${tierFor(state.index).name} · 人身保費合計 ${fmt(r.personalPremium)}／十年${e.severity?' · '+e.severity:''}</div>${annualChoices(r)}${e.id==='trip'?tripChoices(r):''}${!tripPending?impact(r):''}${r.purchase||r.tripCost||r.tripPremium||r.bonus?`<div class="card breakdown">${row('本關購買支出',-r.purchase)}${row('旅費',-r.tripCost)}${row('單次海外保費',-r.tripPremium)}${row('獎金入帳',r.bonus)}</div>`:''}${related(r)}${legal()}<div class="nextbar">${!tripPending?button('next',state.index===D.timeline.length-1?'人生旅程完成，查看總整理 →':(e.id==='peaceful'?'平安過關！':'完成本關，')+'前往'+(e.age+10)+'多歲 →'):''}</div></section>`;}
  function prepareStage(){const prior=state.decisions[state.index-1];state.decisions[state.index]||={buyCar:false,buyHouse:false,sellHouse:false,carPlan:'basic',housePlan:'basic',travel:false,tripPlan:'basic',resolved:false,travelAccident:false,tier:prior?.tier||'base',coverage:{...(prior?.coverage||state.plans)}};if(state.run[state.index])eventPage();else protectionPage();}
  function protectionPage(){state.screen='protection';const i=state.index,t=D.timeline[i],d=state.decisions[i],startFee=premiumAt(t.start,i),endFee=premiumAt(t.start+9,i);let decadeFee=0;for(let y=t.start;y<t.start+10;y++)decadeFee+=premiumAt(y,i)*12;app.innerHTML=`${topbar()}<section class="screen"><div class="progress-head"><span>${t.age}～${t.age+9}歲 · 先配置再抽事件</span><span>第${i+1}關 / 6</span></div>${progressLevels()}<div class="summary-hero"><h2>這個階段，要不要加重保障？</h2><p>年齡費率係數 ${E.premiumAgeFactors[i]} 倍；若維持同一保障，年齡越高保費越高。以下皆為遊戲概估。</p></div><div class="tier-options">${E.coverageTiers.map(tier=>`<label class="card tier-option"><input type="radio" name="coverage-tier" data-coverage-tier value="${tier.id}" ${d.tier===tier.id?'checked':''}><b>${tier.name}</b><small>費用係數 ${tier.fee} 倍 · 給付上限係數 ${tier.benefit} 倍</small></label>`).join('')}</div><div class="card breakdown">${row('本階段起始每月保費約',-startFee)}${row('本階段末每月保費約',-endFee)}${row('未來十年保費合計約',-decadeFee)}</div><details class="annual-options"><summary>調整要保障的種類（也可以不買）</summary><div class="annual-options-body">${D.plans.map(p=>`<label class="purchase-toggle"><input type="checkbox" data-stage-plan="${p.id}" ${d.coverage[p.id]?'checked':''}>${p.name}</label>`).join('')}</div></details><div class="notice">本關事件尚未揭曉，確認後本階段保障鎖定。加重只提高你有選購的保障，不會自動涵蓋所有事件；未選種類不給付，給付仍有上限。本遊戲的年齡費率、升級及可投保假設不代表南山實際核保或續保規則。</div>${legal()}<div class="nextbar">${button('reveal-stage','確認保障，揭曉這十年 →')}</div></section>`;}
  function enterStage(){prepareStage();}
  function summary() {
    state.screen = 'summary'; const rows = ledger(), sum = k => rows.reduce((a, r) => a + r[k], 0), end = rows[rows.length - 1].balance;
    const payments=D.plans.map(p=>{const paid=rows.reduce((sum,r)=>sum+(r.personalPremiumByPlan[p.id]||0),0);return row(p.name+(rows.some(r=>r.used.some(x=>x.id===p.id&&x.amount))?' · 曾使用':' · 未使用'),-paid);}).join('');
    app.innerHTML = `${topbar()}<section class="screen"><div class="summary-hero"><small>20～79歲 · 人生總整理</small><h2>${end < 0 ? '最後的資金缺口' : '最後剩餘現金'}</h2><div class="final-balance ${end < 0 ? 'deficit' : 'surplus'}">${end === 0 ? '收支平衡' : fmt(Math.abs(end))}</div></div><div class="card breakdown">${row('起始存款', state.profile.savings)}${row('薪資與退休收入合計', sum('income'))}${row('基本生活開銷合計', -sum('expenses'))}${row('人身、房車及單次海外保費', -sum('totalPremium'))}${row('購車、購屋、持有費、旅費與售屋清償', -sum('otherCost'))}${row('售屋價金合計', sum('saleGross'))}${row('事故支出合計', -sum('cost'))}${row('假設保障給付合計', sum('benefit'))}${row('幸運獎金', sum('bonus'))}${row('最終現金餘額', end, true)}</div><div class="section-title"><div><h3>六個十年，串成你的人生</h3></div></div><div class="life-path">${rows.map(r => `<div class="life-item"><div class="ic">${r.e.emoji}</div><div><b>${r.e.age}～${r.e.age+9}歲｜${r.e.title}</b><small>${r.purchase ? '已購買 · ' : ''}${r.saleGross ? '已售屋 · ' : ''}${r.benefit ? '使用保障 ' + fmt(r.benefit) : '無本次保障給付'} · ${tierFor(rows.indexOf(r)).name}</small></div><div class="amt ${r.balance < 0 ? 'deficit' : 'surplus'}">${money(r.balance)}</div></div>`).join('')}</div><div class="section-title"><div><h3>一路持續支付的保障</h3></div></div><div class="card">${payments || '<p>未配置人身保障。</p>'}${row('汽車與住宅保障保費合計', -sum('assetPremium'))}${row('單次海外保費合計', -sum('tripPremium'))}</div><div class="notice">每關間隔十年，20～29歲起每關累計120個月，從第一關就隨機抽出平安或意外。30多歲起可在每關調整房車計畫。新購房車的持有費與保障從下個月開始。薪資年增3%、生活費年增2%；人身保費依年齡係數、選擇等級及年增2%計算；60歲起用退休前月薪40%模擬退休收入。房貸每月2萬元共30年，已含遊戲概估本息。售屋用固定600萬元、費用2%計算，依遊戲貸款本息攤還先清償本金；不代表市場價格或實際交易稅費。此處是現金，不含尚持有房車市值、未清償債務、所得稅或投資收益。</div>${legal()}${button('setup', '重新配置，再走一次人生')}</section>`;
  }
  function advice() { const budget = Math.max(0, Math.min(state.profile.income * .1, (state.profile.income - state.profile.expenses) * .5)); return `<b>先看每月生活餘額</b><p>扣除生活費後可安排 ${fmt(Math.max(0, state.profile.income - state.profile.expenses))}。本站以薪資10%與生活結餘50%較低者作為參考上限 ${fmt(budget)}；這是預算提示，不是南山投保標準或個別保單適合度判定。</p>`; }
  function setup() {
    state.screen = 'setup'; const available = state.profile.income - state.profile.expenses - premium();
    app.innerHTML = `${topbar()}<section class="screen"><div class="section-title"><div><h3>先決定起點與保障</h3><p>先選初始保障，每個十年可在事件揭曉前調整或加重。</p></div></div><div class="form-card">${[['income','起始每月薪資'],['savings','起始存款'],['expenses','起始每月基本開銷（不含保險）']].map(([id,label]) => `<div class="field"><label for="${id}">${label}</label><input class="input" id="${id}" type="number" min="0" max="1000000000" step="1000" value="${state.profile[id]}"></div>`).join('')}</div><div class="notice" id="setup-advice">${advice()}</div><div class="section-title"><div><h3>選擇人身保障</h3><p>固定遊戲概估，海外與房車保障只在相關事件出現。</p></div></div><div class="plan-list">${D.plans.map(p => `<article class="card plan-card"><input aria-label="配置${p.name}" type="checkbox" data-plan="${p.id}" ${state.plans[p.id] ? 'checked' : ''}><div class="plan-details"><b>${p.emoji} ${p.name}</b><p>起始每月約 ${fmt(p.monthlyPremium)}（遊戲概估）</p><small>${p.description}</small>${policyCard(p)}</div></article>`).join('')}</div><div id="setup-difficulty" class="notice">${difficultyNote()}</div><div id="setup-budget" class="card breakdown">${row('起始每月保費約', -premium())}${row('起始每月可用金額', available, true)}</div><div class="notice">每關十年、每關計入120個月；薪資年增3%、生活費及人身保費年增2%，60歲起改以退休前月薪40%模擬退休收入。都是遊戲假設，不代表真實成長率或保單續保條件。</div>${legal()}<div class="nextbar">${button('start', '配置完成，開始人生旅程 →')}</div></section>`;
  }
  function saveProfile() { for (const id of ['income','savings','expenses']) { const input = document.getElementById(id); if (!input.checkValidity()) return false; state.profile[id] = Number(input.value); } return true; }
  function home() { state.screen = 'home'; app.innerHTML = `${topbar()}<section class="screen"><div class="hero"><div class="eyebrow">十年一關，隨機人生</div>${art({id:'home',age:40})}<h1>NANSHAN <span>LifeLab</span></h1><h2>每一次選擇，都看見錢的去向。</h2><p>買車、買房，勾選就看見現金變化。遇到事故，看看自己要付多少、哪些保障真的幫上忙。從20多歲就可能遇見意外，也可能平安過關。每十年揭曉一次人生事件，房車計畫可在30多歲以後的各關調整。</p><div class="cta-row"><button class="btn btn-primary" data-action="setup">開始我的人生旅程 →</button><button class="btn btn-secondary" data-action="about">關於這個模擬</button></div></div><div class="notice">20、30、40、50、60、70多歲，共六關；每關隨機揭曉平安、意外或少數幸運事件。平安過關不代表每個人都會遇到相同劇情。30多歲後可選買車、買房或賣房，保障持續扣費，每關可在抽事件前加重；旅遊邀請最多一次。</div>${legal()}</section>`; }
  function about() { state.screen = 'about'; app.innerHTML = `${topbar()}<section class="screen"><div class="section-title"><div><h3>關於這段旅程</h3></div></div><div class="card about-block"><p>人身保障內容參考南山人壽官方資訊；汽車、住宅與部分旅遊內容連至南山產物。兩者是不同公司與保險商品，遊戲方案不等同實際保單。</p></div>${D.sources.map(s => `<a class="source-link" href="${s.url}" target="_blank" rel="noopener"><b>${s.title} ↗</b></a>`).join('')}${legal()}<div class="notice">法遵提示：若作為南山官方工具對外發布，商品、保費與理賠內容、品牌使用、個資及招攬流程均應交由相關單位審核。</div></section>`; }
  app.addEventListener('input', ev => {
    const el = ev.target;
    if (state.screen === 'setup') {
      if (el.matches('[data-plan]')) state.plans[el.dataset.plan] = el.checked;
      saveProfile(); document.getElementById('setup-advice').innerHTML = advice(); document.getElementById('setup-difficulty').innerHTML = difficultyNote(); document.getElementById('setup-budget').innerHTML = row('起始每月保費約', -premium()) + row('起始每月可用金額', state.profile.income - state.profile.expenses - premium(), true); return;
    }
    if(state.screen==='protection'){const d=state.decisions[state.index];if(el.matches('[data-coverage-tier]'))d.tier=el.value;else if(el.matches('[data-stage-plan]'))d.coverage[el.dataset.stagePlan]=el.checked;else return;protectionPage();return;}
    if (state.screen !== 'event') return;
    const d = state.decisions[state.index];
    if (d.committed) return;
    if (el.matches('[data-annual-buy-car]')) d.buyCar = el.checked;
    else if (el.matches('[data-annual-buy-house]')) d.buyHouse = el.checked;
    else if (el.matches('[data-sell-house]')) d.sellHouse = el.checked;
    else if (el.matches('[data-car-plan]')) d.carPlan = el.value;
    else if (el.matches('[data-house-plan]')) d.housePlan = el.value;
    else if (el.matches('[data-trip-choice]') && !d.resolved) d.travel = el.checked;
    else if (el.matches('[data-trip-plan]') && !d.resolved) d.tripPlan = el.value;
    else return;
    eventPage();
  });
  app.addEventListener('click', ev => {
    const el = ev.target.closest('[data-action]'); if (!el) return;
    switch (el.dataset.action) {
      case 'home': home(); break;
      case 'setup': setup(); break;
      case 'about': about(); break;
      case 'start': if (!saveProfile()) { app.querySelector('input:invalid')?.reportValidity(); return; } state.index = 0; state.run = []; state.decisions = []; enterStage(); break;
      case 'reveal-stage': if(!state.run[state.index])state.run[state.index]=drawEvent(state.index);eventPage();break;
      case 'resolve-trip': { const d = state.decisions[state.index]; if (!d.resolved) { d.travelAccident = d.travel && Math.random() < E.travelAccidentChance; d.resolved = true; } eventPage(); break; }
      case 'next': { const d = state.decisions[state.index]; if (state.run[state.index].id === 'trip' && !d.resolved) return; d.committed = true; if (state.index < D.timeline.length - 1) { state.index++; enterStage(); } else summary(); break; }
    }
    window.scrollTo(0, 0);
  });
  home();
})();
