const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.resolve(__dirname,'..')+path.sep,h={},app={innerHTML:'',addEventListener:(n,f)=>h[n]=f};
const inputs={income:{value:30000,checkValidity:()=>true},savings:{value:100000,checkValidity:()=>true},expenses:{value:25000,checkValidity:()=>true}};
const c={window:{scrollTo(){}},document:{querySelector:()=>app,getElementById:id=>inputs[id]},Intl,Math};vm.createContext(c);
vm.runInContext(fs.readFileSync(root+'data.js','utf8'),c);
vm.runInContext(fs.readFileSync(root+'app.js','utf8').replace('  home();\n})();','window.t={state,ledger,personalPayouts,premiumAt,planPremiumAt,eventRiskRate,tierFor,quotedPremium,coverageReport,compareProtection,eventOpportunity,relevantProtection,incomeAt,expenseAt,summary};home();\n})();'),c);
const t=c.window.t,D=c.window.APP_DATA;
const click=action=>h.click({target:{closest:()=>({dataset:{action}})}});
const change=(kind,value,id)=>h.input({target:{matches:s=>s===kind,value,checked:value,dataset:{nextStagePlan:id}}});
for(let trial=0;trial<100;trial++){
  click('start');
  for(let i=0;i<6;i++){
    assert.equal(t.state.screen,'event');assert(t.state.run[i]);
    assert(!app.innerHTML.includes('data-action="reveal-stage"'));
    const before=t.ledger()[i],event=JSON.stringify(t.state.run[i]),tier=t.state.decisions[i].tier;
    if(i<5){
      assert(app.innerHTML.includes('未來十年，要不要調整保險？'));
      const nextTier=trial%3===0?'base':trial%3===1?'boost':'max';
      change('[data-next-coverage-tier]',nextTier);
      if(trial%4===0)for(const p of D.plans)change('[data-next-stage-plan]',false,p.id);
      const after=t.ledger()[i];
      assert.equal(after.balance,before.balance);assert.equal(after.personalPremium,before.personalPremium);assert.equal(after.benefit,before.benefit);assert.equal(t.state.decisions[i].tier,tier);assert.equal(JSON.stringify(t.state.run[i]),event);
    }else assert(!app.innerHTML.includes('未來十年，要不要調整保險？'));
    if(t.state.run[i].id==='trip')click('resolve-trip');
    const r=t.ledger()[i];assert(r.benefit<=r.cost);assert.equal(r.personalPremium,Object.values(r.personalPremiumByPlan).reduce((a,b)=>a+b,0));assert(!app.innerHTML.includes('NaN'));
    const pending=t.state.decisions[i].nextProtection;click('next');
    if(i<5&&pending){assert.equal(t.state.decisions[i+1].tier,pending.tier);assert.equal(JSON.stringify(t.state.decisions[i+1].coverage),JSON.stringify(pending.coverage));}
  }
  assert.equal(t.state.screen,'summary');let balance=100000;
  for(const r of t.ledger()){balance+=r.income-r.expenses-r.totalPremium-r.otherCost+r.saleGross-r.cost+r.benefit+r.bonus;assert.equal(r.balance,balance);}
  assert(!app.innerHTML.includes('NaN'));
}
click('start');const current=t.ledger()[0];change('[data-next-coverage-tier]','max');click('next');assert.equal(t.state.decisions[1].tier,'max');assert(t.premiumAt(10,1)>t.premiumAt(0,0));
const trauma=D.events.find(e=>e.id==='major_trauma');t.state.decisions[1].coverage=Object.fromEntries(D.plans.map(p=>[p.id,true]));const covered=t.personalPayouts(trauma,1).reduce((s,p)=>s+p.amount,0);assert(covered<=trauma.baseCost);assert(covered>0);
assert.equal(t.ledger()[0].personalPremium,current.personalPremium);assert.equal(t.ledger()[0].balance,current.balance);
console.log('PASS: 100 single-event-page journeys; future insurance editing changes neither current premium, payout, event nor cash; next-stage tier and types activate correctly; no standalone coverage page; no final-stage phantom premium; capped payouts and all totals reconcile.');
// Regression: premiums must not compound annually on top of age/tier factors.
const initialCoverage=Object.fromEntries(D.plans.map((p,i)=>[p.id,i<5]));
for(let i=0;i<6;i++)t.state.decisions[i]={tier:'base',coverage:{...initialCoverage}};
const monthlyByAge=[5000,5500,6250,7250,8500,10000];
let lifetimeBasic=0;
for(let i=0;i<6;i++){assert.equal(t.premiumAt(i*10,i),monthlyByAge[i]);assert.equal(t.premiumAt(i*10+9,i),monthlyByAge[i]);lifetimeBasic+=t.premiumAt(i*10,i)*120;}
assert.equal(lifetimeBasic,5100000);
for(let i=0;i<6;i++)t.state.decisions[i].tier='max';
assert.equal(Array.from({length:6},(_,i)=>t.premiumAt(i*10,i)*120).reduce((a,b)=>a+b,0),8925600);
// Event severity must not shrink the covered fraction merely because old fixed caps stayed unchanged.
const incident={baseCost:1000000,coverages:{accident:1,hospital:1}};
t.state.decisions[0].coverage={accident:true,hospital:true};
for(const [tier,expected]of [['base',600000],['boost',750000],['max',900000]]){t.state.decisions[0].tier=tier;assert.equal(t.personalPayouts(incident,0).reduce((s,p)=>s+p.amount,0),expected);}
t.state.decisions[0].coverage.hospital=false;assert.equal(t.personalPayouts(incident,0).reduce((s,p)=>s+p.amount,0),450000);
t.state.decisions[0].coverage.accident=false;assert.equal(t.personalPayouts(incident,0).reduce((s,p)=>s+p.amount,0),0);
console.log('PASS: no double premium escalation; basic lifetime 5.1M vs high 8.926M for starting 5K mix; 60/75/90 percent scenario limits; excluded coverage never pays.');

for(let i=0;i<6;i++){const choice={tier:t.state.decisions[i].tier,coverage:t.state.decisions[i].coverage};assert.equal(t.quotedPremium(i*10,i,choice),t.premiumAt(i*10,i));assert.equal(t.quotedPremium(i*10+9,i,choice),t.premiumAt(i*10,i));}
console.log('PASS: future quoted premium matches charged premium, with no hidden annual escalation.');

// Final report: each insurance line must reconcile, and comparisons must match a full fixed-story replay.
const fixtureIds=['burn','peaceful','car_collision','house_fire','trip','stroke'];
t.state.run=fixtureIds.map((id,i)=>id==='trip'?{id,age:20+i*10,baseCost:0,coverages:{},title:'海外旅行',emoji:'✈️'}:{...D.events.find(e=>e.id===id),age:20+i*10});
t.state.decisions=fixtureIds.map((id,i)=>({tier:'base',coverage:{...initialCoverage},buyCar:i===1,buyHouse:i===1,sellHouse:i===3,carPlan:'basic',housePlan:'basic',travel:id==='trip',tripPlan:'basic',resolved:true,travelAccident:id==='trip'}));
t.state.index=5;
const actualRows=t.ledger(),total=(rows,k)=>rows.reduce((sum,r)=>sum+r[k],0),baseline=JSON.stringify(t.state);
const report=t.coverageReport(actualRows);
assert.equal(report.reduce((sum,p)=>sum+p.premium,0),total(actualRows,'totalPremium'));
assert.equal(report.reduce((sum,p)=>sum+p.benefit,0),total(actualRows,'benefit'));
const cases=[{kind:'personal',tier:'max'},{kind:'personal',addPlan:'cancer'},{kind:'car'},{kind:'house'},{kind:'travel'}];
for(const scenario of cases){
  const compared=t.compareProtection(actualRows,scenario);
  assert.equal(JSON.stringify(t.state),baseline);
  const saved=JSON.stringify(t.state.decisions);
  for(const d of t.state.decisions){if(scenario.kind==='personal'){if(scenario.tier)d.tier=scenario.tier;if(scenario.addPlan)d.coverage[scenario.addPlan]=true;}else if(scenario.kind==='travel')d.tripPlan='plus';else d[scenario.kind+'Plan']='plus';}
  const replay=t.ledger();
  assert.equal(compared.extraPremium,total(replay,'totalPremium')-total(actualRows,'totalPremium'));
  assert.equal(compared.extraBenefit,total(replay,'benefit')-total(actualRows,'benefit'));
  assert.equal(compared.endingCash,replay[5].balance);
  t.state.decisions=JSON.parse(saved);
}
assert(t.compareProtection(actualRows,{kind:'car'}).netChange<0);
assert(t.compareProtection(actualRows,{kind:'house'}).netChange>0);
assert(t.compareProtection(actualRows,{kind:'travel'}).netChange>0);
const beforeSummary=JSON.stringify(t.state.decisions);t.summary();
assert.equal(JSON.stringify(t.state.decisions),beforeSummary);
assert(app.innerHTML.includes('每個意外，保險怎麼幫你'));
assert(app.innerHTML.includes('如果當初買齊這趟用得到的保障'));
assert(!app.innerHTML.includes('upgrade-scenario'));
assert(app.innerHTML.includes('扣掉保費後'));
assert(!app.innerHTML.includes('NaN'));
console.log('PASS: policy premium/benefit totals reconcile; personal, car, sold-home and single-trip comparisons match fixed-story ledger replay; negative net upgrades stay honest; reports never mutate play history.');

// One combined relevant-policy scenario must equal a full replay, without altering history.
const combined=t.relevantProtection(actualRows),savedDecisions=JSON.stringify(t.state.decisions);
for(const d of t.state.decisions){d.coverage={...combined.coverage};d.tier='base';d.carPlan='basic';d.housePlan='basic';d.tripPlan='basic';}
const combinedReplay=t.ledger();
assert.equal(combined.premium,total(combinedReplay,'totalPremium'));
assert.equal(combined.benefit,total(combinedReplay,'benefit'));
assert.equal(combined.net,combined.benefit-combined.premium);
assert.equal(new Set(combined.names).size,combined.names.length);
t.state.decisions=JSON.parse(savedDecisions);
const noAccidents=actualRows.map(r=>({...r,cost:0,e:{...r.e,baseCost:0}}));
assert.equal(t.relevantProtection(noAccidents).premium,0);
assert.equal(t.relevantProtection(noAccidents).benefit,0);
assert.equal(t.relevantProtection(noAccidents).names.length,0);
assert.equal(JSON.stringify(t.state.decisions),savedDecisions);
console.log('PASS: combined incident-related basic coverage totals match full replay; no duplicate premiums; peaceful journeys produce no invented savings.');

// Purchase deducts only the down payment; remaining price is financed and stops on schedule.
assert.equal(D.economy.car.price,D.economy.car.downPayment+D.economy.car.loanPrincipal);
assert.equal(D.economy.house.price,D.economy.house.downPayment+D.economy.house.loanPrincipal);
const assetRows=t.ledger();
assert.equal(assetRows[1].purchase,2600000);
assert.equal(assetRows[1].carLoan,0);
assert.equal(assetRows[2].carLoan,7500*60);
assert.equal(assetRows.slice(3).reduce((s,r)=>s+r.carLoan,0),0);
assert.equal(assetRows[2].mortgage,34000*120);
assert.equal(assetRows[3].mortgage,34000*120);
assert.equal(assetRows[4].mortgage,0);
assert.equal(assetRows[3].saleGross,10000000);
assert.equal(assetRows[3].saleFees,200000);
assert(assetRows[3].loanPayoff>0&&assetRows[3].loanPayoff<8000000);
let reconciled=t.state.profile.savings;
for(const r of assetRows){reconciled+=r.income-r.expenses-r.totalPremium-r.otherCost+r.saleGross-r.cost+r.benefit+r.bonus;assert.equal(r.balance,reconciled);}
console.log('PASS: new down payments, five-year car loan, thirty-year mortgage, house sale and final cash reconcile.');

// Each starting decade uses entered finances as the baseline, without replaying earlier years.
const fullTimeline=[...D.timeline];
inputs.income.value=50000;
for(let start=0;start<6;start++){
  inputs['start-stage']={value:String(start)};
  click('start');
  assert.equal(D.timeline.length,6-start);
  assert.equal(t.state.run[0].age,20+start*10);
  assert.equal(t.state.run.length,1);
  assert.equal(t.incomeAt(start*10),50000);
  assert.equal(t.expenseAt(start*10),25000);
  assert.equal(t.premiumAt(start*10,0),Math.round(5000*D.economy.premiumAgeFactors[start]));
  assert.equal(t.state.decisions[0].buyCar,false);
  assert.equal(t.state.decisions[0].buyHouse,false);
  assert.equal(t.ledger()[0].purchase,0);
  for(let i=0;i<6-start;i++){
    t.state.run[i]={...D.events.find(e=>e.id==='peaceful'),age:20+(start+i)*10};
    if(start===0&&i===0)assert(!app.innerHTML.includes('data-annual-buy-house'));
    if(t.state.run[i].id==='trip')click('resolve-trip');
    click('next');
  }
  assert.equal(t.state.screen,'summary');
  assert.equal(t.ledger().length,6-start);
  assert.equal(t.coverageReport(t.ledger()).reduce((s,p)=>s+p.premium,0),total(t.ledger(),'totalPremium'));
  assert(!app.innerHTML.includes('NaN'));
  const expectedIncome=fullTimeline.slice(start).reduce((sum,stage)=>sum+Array.from({length:10},(_,y)=>t.incomeAt(stage.start+y)*12).reduce((a,b)=>a+b,0),0);
  assert.equal(total(t.ledger(),'income'),expectedIncome);
  if(start>=4)assert.equal(expectedIncome,(6-start)*120*50000);
}
console.log('PASS: all six start ages use selected income/expenses, correct age premiums, remaining stages only, and no automatic home/car purchase.');
