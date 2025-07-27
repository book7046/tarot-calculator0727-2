
let numerologyData = {};
let yearlyThemeData = {};

function initNumerology() {
  // 放入原本初始化邏輯
  // 匯出匯入按鈕事件
  document.getElementById('exportContentBtn')?.addEventListener('click', exportContent);
  document.getElementById('importContentBtn')?.addEventListener('click', () => document.getElementById('importFileInput')?.click());
  document.getElementById('importFileInput')?.addEventListener('change', importContent);

  document.getElementById('convertBtn')?.addEventListener('click', convertSolarToLunar);

  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      setTimeout(() => {
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab)?.classList.add('active');
      }, 50);
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // 修正 iOS 輸入問題
  window.addEventListener('touchstart', function() {}, {passive: true});
  setTimeout(() => {
    const dummyInput = document.createElement('input');
    dummyInput.style.position = 'absolute';
    dummyInput.style.opacity = 0;
    dummyInput.style.pointerEvents = 'none';
    document.body.appendChild(dummyInput);
    dummyInput.focus();
    setTimeout(() => document.body.removeChild(dummyInput), 100);
  }, 500);

  // 載入 JSON 並初始化
  Promise.all([
    fetch('../data/numerologyData.json').then(r => r.json()),
    fetch('../data/yearlyThemeData.json').then(r => r.json())
  ]).then(([numData, themeData]) => {
    numerologyData = numData;
    yearlyThemeData = themeData;
    // expose functions to global scope
    window.convertSolarToLunar = convertSolarToLunar;
    window.exportContent = exportContent;
    window.importContent = importContent;
    initNumerology();
  });
});
