
// report.js - 個案流年報告
(() => {
  const tarotCards = [
    "愚人","魔法師","女祭司","女皇","國王","教宗",
    "戀人","戰車","力量","隱士","命運之輪","正義",
    "吊人","死神","節制","惡魔","高塔","星星",
    "月亮","太陽","審判","世界"
  ];

  const state = {
    numerologyData: null,
    yearlyThemeData: null
  };

  function getSoulOffset(){ return (typeof window!=='undefined' && typeof window.SOUL_OFFSET!=='undefined') ? Number(window.SOUL_OFFSET) : 0; }
  function getTarotCard(n){ return tarotCards[n] || ""; }
  function sumDigitsOnce(n){ n = Math.abs(n|0); let s=0; while(n>0){ s+= n%10; n=Math.floor(n/10);} return s; }
  function calculateEssence(year){
    const lastTwo = Math.abs(year)%100;
    if(lastTwo <= 21) return lastTwo;
    return Math.floor(lastTwo/10) + (lastTwo%10);
  }
  function calculateFinalSum(number){
    let sum = 0;
    number = Math.abs(number|0);
    while(number>0){ sum += number%10; number = Math.floor(number/10); }
    while(sum>21){
      let t=0; while(sum>0){ t += sum%10; sum = Math.floor(sum/10); }
      sum = t;
    }
    return sum;
  }
  function getBenefactor(num){ let res = num + 5; if(res>21) res -= 22; return res; }

  async function ensureDataLoaded(){
    if(state.numerologyData && state.yearlyThemeData) return;
    const [nRes, yRes] = await Promise.all([
      fetch('./data/numerologyData.json').then(r=>r.json()),
      fetch('./data/yearlyThemeData.json').then(r=>r.json())
    ]);
    state.numerologyData = nRes;
    state.yearlyThemeData = yRes;
  }

  function fmtDob(year, month, day){
    if([year,month,day].some(v=>isNaN(v))) return '-';
    return `西元 ${year} 年 ${month} 月 ${day} 日`;
  }

  function nowString(){
    const d = new Date();
    const pad = n => String(n).padStart(2,'0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function getInputs(){
    const ry = parseInt(document.getElementById('rocYear')?.value);
    const sm = parseInt(document.getElementById('solarMonth')?.value);
    const sd = parseInt(document.getElementById('solarDay')?.value);
    const ly = parseInt(document.getElementById('lunarYear')?.value);
    const lm = Math.abs(parseInt(document.getElementById('lunarMonth')?.value));
    const ld = parseInt(document.getElementById('lunarDay')?.value);
    const solarYear = isNaN(ry) ? NaN : ry + 1911;
    return { ry, solarYear, sm, sd, ly, lm, ld };
  }

  function computeCoreNumbers({solarYear, sm, sd, ly, lm, ld}){
    // 國曆
    const solarEssence = calculateEssence(solarYear);
    const solarExternalBase = sumDigitsOnce(solarYear + sm + sd);
    const solarExternal = (solarExternalBase > 21) ? (solarExternalBase - 22) : solarExternalBase;
    const solarInternal = (solarExternalBase > 21) ? sumDigitsOnce(solarExternalBase) : solarExternalBase;
    // 農曆
    const lunarEssence = calculateEssence(ly);
    const lunarExternalBase = sumDigitsOnce(ly + lm + ld);
    const lunarExternal = (lunarExternalBase > 21) ? (lunarExternalBase - 22) : lunarExternalBase;
    const lunarInternal = (lunarExternalBase > 21) ? sumDigitsOnce(lunarExternalBase) : lunarExternalBase;

    // 貴人
    const ben = n => ({ num: getBenefactor(n), card: getTarotCard(getBenefactor(n)) });

    return {
      solar: {
        essence: { num: solarEssence, card: getTarotCard(solarEssence), ben: ben(solarEssence) },
        external: { num: solarExternal, card: getTarotCard(solarExternal), ben: ben(solarExternal) },
        internal: { num: solarInternal, card: getTarotCard(solarInternal), ben: ben(solarInternal) },
      },
      lunar: {
        essence: { num: lunarEssence, card: getTarotCard(lunarEssence), ben: ben(lunarEssence) },
        external: { num: lunarExternal, card: getTarotCard(lunarExternal), ben: ben(lunarExternal) },
        internal: { num: lunarInternal, card: getTarotCard(lunarInternal), ben: ben(lunarInternal) },
      }
    };
  }

  function computeCurrentYearFlows({solarYear, sm, sd, ly, lm, ld}){
    const off = getSoulOffset();
    const now = new Date();
    const currentYear = now.getFullYear();
    const birthdayPassed = ( (now.getMonth()+1 > sm) || ((now.getMonth()+1 === sm) && (now.getDate() >= sd)) );
    const yearToUse = birthdayPassed ? currentYear : currentYear - 1;
    const solarYearly = calculateFinalSum((yearToUse + sm + sd) + off);
    const lunarYearly = calculateFinalSum((yearToUse + lm + ld) + off);
    return { currentYear, yearToUse, solarYearly, lunarYearly };
  }

  function renderCoreNumbers(core){
    const set = (id, txt) => { const el = document.getElementById(id); if(el) el.textContent = txt; };
    // 國曆
    set('repSolarEssence', `${core.solar.essence.num} - ${core.solar.essence.card}`);
    set('repSolarExternal', `${core.solar.external.num} - ${core.solar.external.card}`);
    set('repSolarInternal', `${core.solar.internal.num} - ${core.solar.internal.card}`);
    set('repSolarEssenceBen', `貴人：${core.solar.essence.ben.num} - ${core.solar.essence.ben.card}`);
    set('repSolarExternalBen', `貴人：${core.solar.external.ben.num} - ${core.solar.external.ben.card}`);
    set('repSolarInternalBen', `貴人：${core.solar.internal.ben.num} - ${core.solar.internal.ben.card}`);
    // 農曆
    set('repLunarEssence', `${core.lunar.essence.num} - ${core.lunar.essence.card}`);
    set('repLunarExternal', `${core.lunar.external.num} - ${core.lunar.external.card}`);
    set('repLunarInternal', `${core.lunar.internal.num} - ${core.lunar.internal.card}`);
    set('repLunarEssenceBen', `貴人：${core.lunar.essence.ben.num} - ${core.lunar.essence.ben.card}`);
    set('repLunarExternalBen', `貴人：${core.lunar.external.ben.num} - ${core.lunar.external.ben.card}`);
    set('repLunarInternalBen', `貴人：${core.lunar.internal.ben.num} - ${core.lunar.internal.ben.card}`);
  }

  function renderNumerologyExplanations(core){
    const uniq = new Set([ core.solar.essence.num, core.solar.external.num, core.solar.internal.num,
                           core.lunar.essence.num, core.lunar.external.num, core.lunar.internal.num ]);
    const container = document.getElementById('repNumerologyExplanations');
    container.innerHTML = '';
    uniq.forEach(num=>{
      const data = state.numerologyData[String(num)];
      if(!data) return;
      const block = document.createElement('div');
      block.className = 'p-4 rounded-lg border';
      block.innerHTML = `
        <div class="text-lg font-semibold mb-1">${num} - ${getTarotCard(num)}</div>
        <div class="text-sm text-gray-700"><span class="font-medium">正面特質：</span>${data.positiveTraits || ''}</div>
        <div class="text-sm text-gray-700"><span class="font-medium">負面特質：</span>${data.negativeTraits || ''}</div>
        <div class="text-sm text-gray-700"><span class="font-medium">其他：</span>${data.others || ''}</div>
        <div class="text-sm text-gray-700"><span class="font-medium">重點：</span>${data.keyPoints || ''}</div>
      `;
      container.appendChild(block);
    });
  }

  function renderYearFlows(flow){
    const set = (id, txt) => { const el = document.getElementById(id); if(el) el.textContent = txt; };
    set('repCurrentSolarYear', flow.solarYearly);
    set('repCurrentSolarYearCard', getTarotCard(flow.solarYearly));
    set('repCurrentLunarYear', flow.lunarYearly);
    set('repCurrentLunarYearCard', getTarotCard(flow.lunarYearly));

    // 解釋（去重）
    const exts = new Set([flow.solarYearly, flow.lunarYearly]);
    const exp = document.getElementById('repYearlyExplanations');
    exp.innerHTML = '';
    exts.forEach(n=>{
      const txt = state.yearlyThemeData[String(n)];
      if(!txt) return;
      const div = document.createElement('div');
      div.className='p-4 rounded-lg border';
      div.innerHTML = `<div class="font-semibold mb-1">${n} - ${getTarotCard(n)}</div><div class="text-sm text-gray-700 whitespace-pre-line">${txt}</div>`;
      exp.appendChild(div);
    });
  }

  function renderTenYearTable({currentYear}, core, inputs){
    const tbody = document.querySelector('#repTenYearTable tbody');
    tbody.innerHTML = '';
    const off = getSoulOffset();
    const startYear = currentYear - 5;
    for(let i=0;i<11;i++){
      const year = startYear + i;
      const solarYearly = calculateFinalSum((year + inputs.sm + inputs.sd) + off);
      const lunarYearly = calculateFinalSum((year + inputs.lm + inputs.ld) + off);
      const tr = document.createElement('tr');
      if(year === currentYear) tr.className = 'bg-indigo-50';
      tr.innerHTML = `
        <td class="py-2 px-4 border-b">${year}</td>
        <td class="py-2 px-4 border-b"><div class="font-bold">${solarYearly}</div><div class="text-sm text-gray-600">${getTarotCard(solarYearly)}</div></td>
        <td class="py-2 px-4 border-b"><div class="font-bold">${lunarYearly}</div><div class="text-sm text-gray-600">${getTarotCard(lunarYearly)}</div></td>
      `;
      tbody.appendChild(tr);
    }
  }

  async function generateReport(){
    await ensureDataLoaded();
    const name = (document.getElementById('caseName')?.value || '').trim() || '未命名個案';
    const inputs = getInputs();
    // basic validation
    const required = [inputs.solarYear, inputs.sm, inputs.sd, inputs.ly, inputs.lm, inputs.ld];
    if(required.some(v=>isNaN(v))){
      alert('請先在「靈數計算」頁面輸入完整的國曆與農曆生日（民國/西元與年月日），再產生報告。');
      return;
    }
    // header
    document.getElementById('caseNameDisplay').textContent = name;
    document.getElementById('caseSolarDob').textContent = fmtDob(inputs.solarYear, inputs.sm, inputs.sd);
    document.getElementById('caseLunarDob').textContent = fmtDob(inputs.ly, inputs.lm, inputs.ld);
    document.getElementById('reportGeneratedAt').textContent = nowString();

    // numbers
    const core = computeCoreNumbers(inputs);
    renderCoreNumbers(core);
    renderNumerologyExplanations(core);

    // flows
    const flows = computeCurrentYearFlows(inputs);
    renderYearFlows(flows);
    renderTenYearTable(flows, core, inputs);
  }

  function exportPdf(){
    const el = document.getElementById('caseReportPrintable');
    if(!el){
      alert('沒有可匯出的內容。');
      return;
    }
    const name = (document.getElementById('caseName')?.value || '個案').trim();
    const opt = {
      margin:       10,
      filename:     `${name || '個案'}_流年報告.pdf`,
      image:        { type: 'jpeg', quality: 0.95 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['css', 'legacy'] }
    };
    window.html2pdf().set(opt).from(el).save();
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    const genBtn = document.getElementById('generateReportBtn');
    const pdfBtn = document.getElementById('exportPdfBtn');
    if(genBtn) genBtn.addEventListener('click', generateReport);
    if(pdfBtn) pdfBtn.addEventListener('click', exportPdf);

    // 當靈魂換日線調整時，自動刷新報告（若已產生）
    const sel = document.getElementById('soulOffset');
    if(sel){
      sel.addEventListener('change', ()=>{
        if(document.getElementById('caseNameDisplay')?.textContent && document.getElementById('caseNameDisplay').textContent !== '-'){
          generateReport();
        }
      });
    }
  });
})();
