import numerologyDataRaw from '../data/numerologyData.json' with { type: 'json' };
import yearlyThemeDataRaw from '../data/yearlyThemeData.json' with { type: 'json' };
const numerologyData = structuredClone(numerologyDataRaw);
const yearlyThemeData = structuredClone(yearlyThemeDataRaw);


        // 塔羅牌名稱
        const tarotCards = [
            "愚人", "魔法師", "女祭司", "女皇", "國王", "教宗", 
            "戀人", "戰車", "力量", "隱士", "命運之輪", "正義", 
            "吊人", "死神", "節制", "惡魔", "高塔", "星星", 
            "月亮", "太陽", "審判", "世界"
        ];
        
        // 靈數解釋資料庫
        
        
        // 流年課題資料庫
        
        
        // 初始化頁面
        document.addEventListener('DOMContentLoaded', function() {
            // 匯出匯入按鈕事件
            document.getElementById('exportContentBtn').addEventListener('click', exportContent);
            document.getElementById('importContentBtn').addEventListener('click', () => document.getElementById('importFileInput').click());
            document.getElementById('importFileInput').addEventListener('change', importContent);

            // 禁止右鍵功能
            document.addEventListener('contextmenu', function(e){ e.preventDefault(); });

            document.getElementById('convertBtn').addEventListener('click', convertSolarToLunar);

            // 頁籤切換
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                    
                    tab.classList.add('active');
                    document.getElementById(tab.dataset.tab).classList.add('active');
                });
            });
            
            // 初始化編輯器選項
            initializeEditorOptions();
            
            // 計算按鈕事件
            document.getElementById('calculateBtn').addEventListener('click', calculateNumerology);
            
            // 編輯器類型切換
            document.getElementById('editType').addEventListener('change', function() {
                const type = this.value;
                if (type === 'numerology') {
                    document.getElementById('numerologyEditor').classList.remove('hidden');
                    document.getElementById('yearlyThemeEditor').classList.add('hidden');
                } else {
                    document.getElementById('numerologyEditor').classList.add('hidden');
                    document.getElementById('yearlyThemeEditor').classList.remove('hidden');
                }
                updateEditorNumbers();
            });
            
            // 編輯器數字選擇
            document.getElementById('editNumber').addEventListener('change', loadContentForEditing);
            
            // 儲存內容按鈕
            document.getElementById('saveContentBtn').addEventListener('click', saveContent);
            
            // 初始化編輯器數字選項
            updateEditorNumbers();
            
            // 民國年輸入事件
            document.getElementById('rocYear').addEventListener('input', updateWesternYear);
            
            // 設置彈窗關閉按鈕
            document.querySelector('.close').addEventListener('click', function() {
                document.getElementById('numerologyModal').style.display = 'none';
            });
            
            // 點擊彈窗外部關閉彈窗
            window.addEventListener('click', function(event) {
                const modal = document.getElementById('numerologyModal');
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
            
            // 為所有靈數值添加點擊事件
            document.addEventListener('click', function(event) {
                if (event.target.classList.contains('numerology-value')) {
                    const number = parseInt(event.target.textContent);
                    if (!isNaN(number)) {
                        const type = event.target.dataset.type;
                        showNumerologyModal(number, type);
                    }
                }
            });
            
            
            ['rocYear', 'solarMonth', 'solarDay'].forEach(id => {
                document.getElementById(id).addEventListener('input', () => {
                    updateSolarDateInfo();
                    convertSolarToLunar();
                });
            });

            // 為日期輸入添加事件
            document.getElementById('rocYear').addEventListener('input', updateSolarDateInfo);
            document.getElementById('solarMonth').addEventListener('input', updateSolarDateInfo);
            document.getElementById('solarDay').addEventListener('input', updateSolarDateInfo);
            
            document.getElementById('lunarYear').addEventListener('input', updateLunarDateInfo);
            document.getElementById('lunarMonth').addEventListener('input', updateLunarDateInfo);
            document.getElementById('lunarDay').addEventListener('input', updateLunarDateInfo);
        });
        
        // 更新國曆日期資訊
        function updateSolarDateInfo() {
            const rocYear = parseInt(document.getElementById('rocYear').value);
            const month = parseInt(document.getElementById('solarMonth').value);
            const day = parseInt(document.getElementById('solarDay').value);
            
            if (!isNaN(rocYear) && !isNaN(month) && !isNaN(day)) {
                const westernYear = rocYear + 1911;
                document.getElementById('solarDateDisplay').textContent = `民國 ${rocYear} 年 ${month} 月 ${day} 日 (西元 ${westernYear} 年)`;
                document.getElementById('solarDateInfo').style.display = 'block';
            }
        }
        
        // 更新農曆日期資訊
        function updateLunarDateInfo() {
            const year = parseInt(document.getElementById('lunarYear').value);
            const month = Math.abs(Math.abs(parseInt(document.getElementById('lunarMonth').value)));
            document.getElementById('lunarMonth').value = month;
            const day = parseInt(document.getElementById('lunarDay').value);
            
            if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
                document.getElementById('lunarDateDisplay').textContent = `西元 ${year} 年 ${Math.abs(month)} 月 ${day} 日`;
                document.getElementById('lunarDateInfo').style.display = 'block';
            }
        }
        
        // 更新西元年顯示

        function convertSolarToLunar() {
            const rocYear = parseInt(document.getElementById('rocYear').value);
            const month = parseInt(document.getElementById('solarMonth').value);
            const day = parseInt(document.getElementById('solarDay').value);

            if (!isNaN(rocYear) && !isNaN(month) && !isNaN(day)) {
                const solarYear = rocYear + 1911;
                console.log("轉換國曆日期：", solarYear, month, day);
                try {
                    const solar = Solar.fromYmd(solarYear, month, day);
                    const lunar = solar.getLunar();

                    document.getElementById('lunarYear').value = lunar.getYear();
                    document.getElementById('lunarMonth').value = Math.abs(lunar.getMonth());
                    document.getElementById('lunarDay').value = lunar.getDay();
                    updateLunarDateInfo();
                    console.log("轉換結果：", lunar.toString());

                    updateLunarDateInfo();
                    // 轉換後立即重新計算流年等
                    calculateNumerology();
} catch (e) {
                    console.error("轉換失敗:", e);
                }
            }
        }

        function updateWesternYear() {
            const rocYear = parseInt(document.getElementById('rocYear').value);
            if (!isNaN(rocYear)) {
                const westernYear = rocYear + 1911;
                document.getElementById('westernYearDisplay').textContent = `西元年: ${westernYear}`;
            } else {
                document.getElementById('westernYearDisplay').textContent = '西元年: -';
            }
        }
        
        // 顯示靈數解釋彈窗
        function showNumerologyModal(number, type) {
            const modal = document.getElementById('numerologyModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalContent = document.getElementById('modalContent');
            
            // 清空內容
            modalContent.innerHTML = '';
            
            if (type === 'numerology') {
                // 顯示靈數解釋
                const data = numerologyData[number] || {
                    positiveTraits: "尚未設定",
                    negativeTraits: "尚未設定",
                    others: "尚未設定",
                    keyPoints: "尚未設定"
                };
                
                modalTitle.textContent = `${number} - ${getTarotCard(number)} 靈數解釋`;
                
                const content = document.createElement('div');
                content.innerHTML = `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 class="font-medium text-gray-700">正面特質</h4>
                            <p class="text-gray-600">${data.positiveTraits}</p>
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-700">負面特質</h4>
                            <p class="text-gray-600">${data.negativeTraits}</p>
                        </div>
                    </div>
                    <div class="mt-3">
                        <h4 class="font-medium text-gray-700">其他</h4>
                        <p class="text-gray-600">${data.others}</p>
                    </div>
                    <div class="mt-3">
                        <h4 class="font-medium text-gray-700">性格重點</h4>
                        <p class="text-gray-600">${data.keyPoints}</p>
                    </div>
                `;
                
                modalContent.appendChild(content);
            } else if (type === 'yearly') {
                // 顯示流年課題
                const theme = yearlyThemeData[number] || "尚未設定";
                
                modalTitle.textContent = `${number} - ${getTarotCard(number)} 流年課題`;
                
                const content = document.createElement('div');
                content.innerHTML = `
                    <p class="text-gray-600">${theme}</p>
                `;
                
                modalContent.appendChild(content);
            }
            
            // 顯示彈窗
            modal.style.display = 'block';
        }
        
        // 初始化編輯器選項
        function initializeEditorOptions() {
            // 初始化編輯器數字選項
            updateEditorNumbers();
        }
        
        // 更新編輯器數字選項
        function updateEditorNumbers() {
            const editType = document.getElementById('editType').value;
            const editNumber = document.getElementById('editNumber');
            editNumber.innerHTML = '';
            
            // 根據編輯類型設置不同範圍
            const maxNum = 22; // 塔羅牌數量
            
            for (let i = 0; i < maxNum; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `${i} - ${tarotCards[i] || ''}`;
                editNumber.appendChild(option);
            }
            
            // 載入第一個選項的內容
            loadContentForEditing();
        }
        
        // 載入要編輯的內容
        function loadContentForEditing() {
            const editType = document.getElementById('editType').value;
            const editNumber = parseInt(document.getElementById('editNumber').value);
            
            if (editType === 'numerology') {
                // 載入靈數解釋
                const data = numerologyData[editNumber] || {
                    positiveTraits: "",
                    negativeTraits: "",
                    others: "",
                    keyPoints: ""
                };
                
                document.getElementById('positiveTraits').value = data.positiveTraits;
                document.getElementById('negativeTraits').value = data.negativeTraits;
                document.getElementById('others').value = data.others;
                document.getElementById('keyPoints').value = data.keyPoints;
            } else {
                // 載入流年課題
                document.getElementById('yearlyTheme').value = yearlyThemeData[editNumber] || "";
            }
        }
        
        // 儲存編輯內容
        function saveContent() {
            const editType = document.getElementById('editType').value;
            const editNumber = parseInt(document.getElementById('editNumber').value);
            
            if (editType === 'numerology') {
                // 儲存靈數解釋
                numerologyData[editNumber] = {
                    positiveTraits: document.getElementById('positiveTraits').value,
                    negativeTraits: document.getElementById('negativeTraits').value,
                    others: document.getElementById('others').value,
                    keyPoints: document.getElementById('keyPoints').value
                };
            } else {
                // 儲存流年課題
                yearlyThemeData[editNumber] = document.getElementById('yearlyTheme').value;
            }
            
            alert('內容已儲存！');
        }
        
        // 計算靈數
        function calculateNumerology() {
            // 獲取輸入值
            const rocYear = parseInt(document.getElementById('rocYear').value);
            const solarMonth = parseInt(document.getElementById('solarMonth').value);
            const solarDay = parseInt(document.getElementById('solarDay').value);
            
            const lunarYear = parseInt(document.getElementById('lunarYear').value);
            const lunarMonth = Math.abs(Math.abs(parseInt(document.getElementById('lunarMonth').value)));
            const lunarDay = parseInt(document.getElementById('lunarDay').value);
            
            // 轉換為西元年
            const solarYear = rocYear + 1911;
            
            // 驗證輸入
            if (isNaN(rocYear) || isNaN(solarMonth) || isNaN(solarDay) ||
                isNaN(lunarYear) || isNaN(lunarMonth) || isNaN(lunarDay)) {
                alert('請輸入完整的出生日期');
                return;
            }
            
            
            // 緩存本次有效輸入，供偏移變更時重算
            window.__LAST_INPUTS__ = { rocYear, solarMonth, solarDay, lunarYear, lunarMonth, lunarDay };
    // 計算國曆靈數
            const solarEssence = calculateEssence(solarYear);
            const solarExternalRaw = solarYear + solarMonth + solarDay;
            const solarExternalBase = sumDigitsOnce(solarExternalRaw); // 先直式相加得 S
            const solarExternal = (solarExternalBase > 21) ? (solarExternalBase - 22) : solarExternalBase; // 外在：S<=21 用 S；>21 用 S-22
            const solarInternal = (solarExternalBase > 21) ? sumDigitsOnce(solarExternalBase) : solarExternalBase; // 內在：若超過21則將 S 兩位相加
            
            // 計算農曆靈數
            const lunarEssence = calculateEssence(lunarYear);
            const lunarExternalRaw = lunarYear + Math.abs(lunarMonth) + lunarDay;
            const lunarExternalBase = sumDigitsOnce(lunarExternalRaw);
            const lunarExternal = (lunarExternalBase > 21) ? (lunarExternalBase - 22) : lunarExternalBase;
            const lunarInternal = (lunarExternalBase > 21) ? sumDigitsOnce(lunarExternalBase) : lunarExternalBase;
            
            // 顯示結果
            document.getElementById('solarEssence').textContent = solarEssence;
            document.getElementById('solarEssenceCard').textContent = getTarotCard(solarEssence);
            document.getElementById('solarExternal').textContent = solarExternal;
            document.getElementById('solarExternalCard').textContent = getTarotCard(solarExternal);
            document.getElementById('solarInternal').textContent = solarInternal;
            document.getElementById('solarInternalCard').textContent = getTarotCard(solarInternal);
            
            document.getElementById('lunarEssence').textContent = lunarEssence;
            document.getElementById('lunarEssenceCard').textContent = getTarotCard(lunarEssence);
            document.getElementById('lunarExternal').textContent = lunarExternal;
            document.getElementById('lunarExternalCard').textContent = getTarotCard(lunarExternal);
            document.getElementById('lunarInternal').textContent = lunarInternal;
            document.getElementById('lunarInternalCard').textContent = getTarotCard(lunarInternal);
            
            // 計算今年流年
                        const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            
            // 判斷生日是否已過
            const birthdayPassed = (currentDate.getMonth() + 1 > solarMonth) || 
                                  (currentDate.getMonth() + 1 === solarMonth && currentDate.getDate() >= solarDay);
            
            // 計算國曆流年
            const yearToUse = birthdayPassed ? currentYear : currentYear - 1;
            const solarYearlyRaw = yearToUse + solarMonth + solarDay;
            const solarYearly = calculateFinalSum(solarYearlyRaw + getSoulOffset());
            
            // 計算農曆流年
            const lunarYearlyRaw = yearToUse + lunarMonth + lunarDay;
            const lunarYearly = calculateFinalSum(lunarYearlyRaw + getSoulOffset());
            
            // 顯示今年流年
            document.getElementById('currentSolarYear').textContent = solarYearly;
            document.getElementById('currentSolarYearCard').textContent = getTarotCard(solarYearly);
            
            document.getElementById('currentLunarYear').textContent = lunarYearly;
            document.getElementById('currentLunarYearCard').textContent = getTarotCard(lunarYearly);
            // ===== 計算本月流月 =====
            const currentMonth = currentDate.getMonth() + 1;
            const baseSolarRaw = solarYear + solarMonth + solarDay;
            const baseLunarRaw = solarYear + Math.abs(lunarMonth) + lunarDay; // 改為國曆出生年 + 農月 + 農日
            const solarMonthlyRaw = baseSolarRaw + currentYear + currentMonth;
            const lunarMonthlyRaw = baseLunarRaw + currentYear + currentMonth;
            const solarMonthly = calculateFinalSum(solarMonthlyRaw + getSoulOffset());
            const lunarMonthly = calculateFinalSum(lunarMonthlyRaw + getSoulOffset());

            // ===== 計算本日流日 =====
            const currentDay = currentDate.getDate();
            const solarDailyRaw = baseSolarRaw + currentYear + currentMonth + currentDay;
            const lunarDailyRaw = baseLunarRaw + currentYear + currentMonth + currentDay;
            const solarDaily = calculateFinalSum(solarDailyRaw + getSoulOffset());
            const lunarDaily = calculateFinalSum(lunarDailyRaw + getSoulOffset());

            // ===== 更新本月流月 / 本日流日顯示 =====
            document.getElementById('currentSolarMonth').textContent = solarMonthly;
            document.getElementById('currentSolarMonthCard').textContent = getTarotCard(solarMonthly);
            document.getElementById('currentLunarMonth').textContent = lunarMonthly;
            document.getElementById('currentLunarMonthCard').textContent = getTarotCard(lunarMonthly);

            document.getElementById('currentSolarDay').textContent = solarDaily;
            document.getElementById('currentSolarDayCard').textContent = getTarotCard(solarDaily);
            document.getElementById('currentLunarDay').textContent = lunarDaily;
            document.getElementById('currentLunarDayCard').textContent = getTarotCard(lunarDaily);

            
            
            
            // 緩存本次計算上下文，供偏移變更時快速刷新
            LAST_CTX = {
                yearToUse,
                solarMonth, solarDay,
                lunarMonth, lunarDay,
                currentYear, currentMonth, currentDay,
                solarYear,
                baseSolarRaw,
                baseLunarRaw
            };
    
            // 生成前後五年流年
            generateTenYearForecast(currentYear, solarMonth, solarDay, lunarMonth, lunarDay);
            
            // 生成0-99歲流年
            generateLifepathTable(solarYear, solarMonth, solarDay, lunarMonth, lunarDay);
        
            // ===== 顯示貴人/小人 =====
            const solarEssenceBenefactor = getBenefactor(solarEssence);
            const solarExternalBenefactor = getBenefactor(solarExternal);
            const solarInternalBenefactor = getBenefactor(solarInternal);
            const lunarEssenceBenefactor = getBenefactor(lunarEssence);
            const lunarExternalBenefactor = getBenefactor(lunarExternal);
            const lunarInternalBenefactor = getBenefactor(lunarInternal);

            document.getElementById('solarEssenceBenefactor').textContent = solarEssenceBenefactor;
            document.getElementById('solarEssenceBenefactorCard').textContent = getTarotCard(solarEssenceBenefactor);
            document.getElementById('solarExternalBenefactor').textContent = solarExternalBenefactor;
            document.getElementById('solarExternalBenefactorCard').textContent = getTarotCard(solarExternalBenefactor);
            document.getElementById('solarInternalBenefactor').textContent = solarInternalBenefactor;
            document.getElementById('solarInternalBenefactorCard').textContent = getTarotCard(solarInternalBenefactor);

            document.getElementById('lunarEssenceBenefactor').textContent = lunarEssenceBenefactor;
            document.getElementById('lunarEssenceBenefactorCard').textContent = getTarotCard(lunarEssenceBenefactor);
            document.getElementById('lunarExternalBenefactor').textContent = lunarExternalBenefactor;
            document.getElementById('lunarExternalBenefactorCard').textContent = getTarotCard(lunarExternalBenefactor);
            document.getElementById('lunarInternalBenefactor').textContent = lunarInternalBenefactor;
            document.getElementById('lunarInternalBenefactorCard').textContent = getTarotCard(lunarInternalBenefactor);
}
        
        // 計算本性數字
        let LAST_CTX = null;
        function getSoulOffset(){ return (typeof window!=='undefined' && typeof window.SOUL_OFFSET!=='undefined') ? Number(window.SOUL_OFFSET) : 0; }
        
        function sumDigitsOnce(n){
            n = Math.abs(n);
            let s=0; while(n>0){ s += n%10; n = Math.floor(n/10); }
            return s;
        }
        
        function calculateEssence(year) {
            const lastTwo = year % 100;
            // 規則：00–21 直接使用；22–99 取兩位相加（例如 81→8+1=9；22→2+2=4）
            if (lastTwo <= 21) return lastTwo;
            return Math.floor(lastTwo / 10) + (lastTwo % 10);
        }
        
        // 計算數字和
        function calculateSum(number) {
            let sum = 0;
            while (number > 0) {
                sum += number % 10;
                number = Math.floor(number / 10);
            }
            // 如果大於21，減去22
            if (sum > 21) {
                sum -= 22;
            }
            return sum;
        }
        
        // 計算最終數字和（用於流年）
        function calculateFinalSum(number) {
            let sum = 0;
            while (number > 0) {
                sum += number % 10;
                number = Math.floor(number / 10);
            }
            
            // 如果大於21，繼續相加直到小於等於21
            while (sum > 21) {
                let tempSum = 0;
                while (sum > 0) {
                    tempSum += sum % 10;
                    sum = Math.floor(sum / 10);
                }
                sum = tempSum;
            }
            
            return sum;
        }
        
        // 獲取塔羅牌名稱
        function getTarotCard(number) {
            return tarotCards[number] || "";
        }
        
        // 生成前後五年流年
        function generateTenYearForecast(currentYear, solarMonth, solarDay, lunarMonth, lunarDay) {
            const tenYearForecast = document.getElementById('tenYearForecast');
            tenYearForecast.innerHTML = '';
            
            // 計算前5年和後5年
            const startYear = currentYear - 5;
            
            for (let i = 0; i < 11; i++) {
                const year = startYear + i;
                const row = document.createElement('tr');
                
                // 年份
                const yearCell = document.createElement('td');
                yearCell.className = 'py-2 px-4 border-b';
                yearCell.textContent = year;
                row.appendChild(yearCell);
                
                // 國曆流年
                const solarYearlyRaw = year + solarMonth + solarDay;
                const solarYearly = calculateFinalSum(solarYearlyRaw + getSoulOffset());
                const solarCell = document.createElement('td');
                solarCell.className = 'py-2 px-4 border-b';
                solarCell.innerHTML = `<span class="font-bold numerology-value" data-type="yearly">${solarYearly}</span> - ${getTarotCard(solarYearly)}`;
                row.appendChild(solarCell);
                
                // 農曆流年
                const lunarYearlyRaw = year + lunarMonth + lunarDay;
                const lunarYearly = calculateFinalSum(lunarYearlyRaw + getSoulOffset());
                const lunarCell = document.createElement('td');
                lunarCell.className = 'py-2 px-4 border-b';
                lunarCell.innerHTML = `<span class="font-bold numerology-value" data-type="yearly">${lunarYearly}</span> - ${getTarotCard(lunarYearly)}`;
                row.appendChild(lunarCell);
                
                // 高亮當前年份
                if (year === currentYear) {
                    row.className = 'bg-indigo-50';
                }
                
                tenYearForecast.appendChild(row);
            }
        }
        
        // 生成0-99歲流年表
        function generateLifepathTable(birthYear, solarMonth, solarDay, lunarMonth, lunarDay) {
            const lifepathTable = document.getElementById('lifepathTable');
            lifepathTable.innerHTML = '';
            
            // 創建表頭
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            headerRow.className = 'bg-gray-50';
            
            // 添加年齡範圍列標題
            const ageRangeHeader = document.createElement('th');
            ageRangeHeader.className = 'py-2 px-4 border-b text-left';
            ageRangeHeader.textContent = '年齡範圍';
            headerRow.appendChild(ageRangeHeader);
            
            // 添加10個年齡列標題
            for (let i = 0; i < 10; i++) {
                const ageHeader = document.createElement('th');
                ageHeader.className = 'py-2 px-4 border-b text-center';
                ageHeader.textContent = i;
                headerRow.appendChild(ageHeader);
            }
            
            thead.appendChild(headerRow);
            lifepathTable.appendChild(thead);
            
            // 創建表格內容
            const tbody = document.createElement('tbody');
            
            // 每10年一行，共10行
            for (let decade = 0; decade < 10; decade++) {
                // 國曆流年行
                const solarRow = document.createElement('tr');
                
                // 年齡範圍
                const ageRangeCell = document.createElement('td');
                ageRangeCell.className = 'py-2 px-4 border-b font-medium';
                ageRangeCell.rowSpan = 2;
                ageRangeCell.textContent = `${decade * 10}-${decade * 10 + 9}歲`;
                solarRow.appendChild(ageRangeCell);
                
                // 添加國曆流年
                for (let i = 0; i < 10; i++) {
                    const age = decade * 10 + i;
                    const year = birthYear + age;
                    const solarYearlyRaw = year + solarMonth + solarDay;
                    const solarYearly = calculateFinalSum(solarYearlyRaw + getSoulOffset());
                    
                    const solarCell = document.createElement('td');
                    solarCell.className = 'py-2 px-4 border-b text-center';
                    solarCell.innerHTML = `<div class="font-bold numerology-value" data-type="yearly">${solarYearly}</div>
                                          <div class="text-sm text-gray-600">${getTarotCard(solarYearly)}</div>
                                          <div class="text-xs text-gray-500">國曆</div>`;
                    solarRow.appendChild(solarCell);
                }
                
                tbody.appendChild(solarRow);
                
                // 農曆流年行
                const lunarRow = document.createElement('tr');
                
                // 添加農曆流年
                for (let i = 0; i < 10; i++) {
                    const age = decade * 10 + i;
                    const year = birthYear + age;
                    const lunarYearlyRaw = year + lunarMonth + lunarDay;
                    const lunarYearly = calculateFinalSum(lunarYearlyRaw + getSoulOffset());
                    
                    const lunarCell = document.createElement('td');
                    lunarCell.className = 'py-2 px-4 border-b text-center';
                    lunarCell.innerHTML = `<div class="font-bold numerology-value" data-type="yearly">${lunarYearly}</div>
                                          <div class="text-sm text-gray-600">${getTarotCard(lunarYearly)}</div>
                                          <div class="text-xs text-gray-500">農曆</div>`;
                    lunarRow.appendChild(lunarCell);
                }
                
                tbody.appendChild(lunarRow);
            }
            
            lifepathTable.appendChild(tbody);
        }
    

        // 匯出內容為 JSON 檔
        function exportContent() {
            const data = {
                numerologyData,
                yearlyThemeData
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'tarot_content.json';
            a.click();
            URL.revokeObjectURL(url);
        }

        // 匯入內容並更新資料庫
        function importContent(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const imported = JSON.parse(e.target.result);
                    if (imported.numerologyData) numerologyData = imported.numerologyData;
                    if (imported.yearlyThemeData) yearlyThemeData = imported.yearlyThemeData;
                    alert('內容已匯入！');
                    // 匯入後可重新載入編輯器內容
                    loadContentForEditing();
                } catch (err) {
                    alert('匯入失敗：檔案格式錯誤');
                }
            };
            reader.readAsText(file);
            // 重設 value 以便連續匯入相同檔案
            event.target.value = '';
        }



        // 計算貴人／小人靈數
        function getBenefactor(num) {
            let res = num + 5;
            if (res > 21) res -= 22;
            return res;
        }
    

// 生命軌跡色帶與高亮
function styleLifePathTable(){
    const table = document.getElementById('lifepathTable');
    if(!table) return;
    const decadeColors = ['bg-red-50','bg-orange-50','bg-yellow-50','bg-green-50','bg-teal-50','bg-blue-50','bg-indigo-50','bg-purple-50','bg-pink-50','bg-gray-50'];
    const highlightNumbers = [11,13,7,16,8];

    const rows = table.querySelectorAll('tbody tr');
    rows.forEach((row, idx) => {
        const decade = Math.floor(idx / 2);
        if (decadeColors[decade]) row.classList.add(decadeColors[decade]);
    });

    table.querySelectorAll('td div.font-bold').forEach(div=>{
        const num = parseInt(div.textContent.trim(),10);
        if (highlightNumbers.includes(num)){
            div.classList.add('text-red-600','font-extrabold','underline');
        }
    });
}

// wrap original generator
if (typeof generateLifepathTable === 'function'){
    const _origGenLife = generateLifepathTable;
    generateLifepathTable = function(...args){
        _origGenLife.apply(this,args);
        styleLifePathTable();
    };
} else {
    // fallback call on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', styleLifePathTable);
}


        // 當靈魂換日線偏移變更時（模組內綁定），重新計算
        
        // 使用上次有效輸入重新計算（不改動使用者當前輸入欄位）
        
        // 依據快取的上下文與目前 SOUL_OFFSET 重刷所有區塊（不讀表單、不中斷）
        function refreshAllWithOffset(){
            if(!LAST_CTX) return;
            const off = getSoulOffset();
            const {
                yearToUse,
                solarMonth, solarDay,
                lunarMonth, lunarDay,
                currentYear, currentMonth, currentDay,
                solarYear,
                baseSolarRaw,
                baseLunarRaw
            } = LAST_CTX;
            
            // ===== 今年流年 =====
            const solarYearly = calculateFinalSum((yearToUse + solarMonth + solarDay) + off);
            const lunarYearly = calculateFinalSum((yearToUse + lunarMonth + lunarDay) + off);
            const elSY = document.getElementById('currentSolarYear');
            const elSYC = document.getElementById('currentSolarYearCard');
            const elLY = document.getElementById('currentLunarYear');
            const elLYC = document.getElementById('currentLunarYearCard');
            if(elSY) elSY.textContent = solarYearly;
            if(elSYC) elSYC.textContent = getTarotCard(solarYearly);
            if(elLY) elLY.textContent = lunarYearly;
            if(elLYC) elLYC.textContent = getTarotCard(lunarYearly);
            
            // ===== 本月流月 =====
            const solarMonthly = calculateFinalSum((baseSolarRaw + currentYear + currentMonth) + off);
            const lunarMonthly = calculateFinalSum((baseLunarRaw + currentYear + currentMonth) + off);
            const elSM = document.getElementById('currentSolarMonth');
            const elSMC = document.getElementById('currentSolarMonthCard');
            const elLM = document.getElementById('currentLunarMonth');
            const elLMC = document.getElementById('currentLunarMonthCard');
            if(elSM) elSM.textContent = solarMonthly;
            if(elSMC) elSMC.textContent = getTarotCard(solarMonthly);
            if(elLM) elLM.textContent = lunarMonthly;
            if(elLMC) elLMC.textContent = getTarotCard(lunarMonthly);
            
            // ===== 本日流日 =====
            const solarDaily = calculateFinalSum((baseSolarRaw + currentYear + currentMonth + currentDay) + off);
            const lunarDaily = calculateFinalSum((baseLunarRaw + currentYear + currentMonth + currentDay) + off);
            const elSD = document.getElementById('currentSolarDay');
            const elSDC = document.getElementById('currentSolarDayCard');
            const elLD = document.getElementById('currentLunarDay');
            const elLDC = document.getElementById('currentLunarDayCard');
            if(elSD) elSD.textContent = solarDaily;
            if(elSDC) elSDC.textContent = getTarotCard(solarDaily);
            if(elLD) elLD.textContent = lunarDaily;
            if(elLDC) elLDC.textContent = getTarotCard(lunarDaily);
            
            // ===== 前後五年流年 =====
            generateTenYearForecast(currentYear, solarMonth, solarDay, lunarMonth, lunarDay);
            
            // ===== 生命軌跡 =====
            generateLifepathTable(solarYear, solarMonth, solarDay, lunarMonth, lunarDay);
        }
    function recalcWithLastInputs(){
            const L = window.__LAST_INPUTS__;
            if(!L) return;
            const ids = ['rocYear','solarMonth','solarDay','lunarYear','lunarMonth','lunarDay'];
            const backup = {};
            ids.forEach(id=>{
                const el = document.getElementById(id);
                if(el){ backup[id] = el.value; }
            });
            try{
                const setVal = (id, v)=>{ const el = document.getElementById(id); if(el && typeof v!=='undefined') el.value = v; };
                setVal('rocYear', L.rocYear);
                setVal('solarMonth', L.solarMonth);
                setVal('solarDay', L.solarDay);
                setVal('lunarYear', L.lunarYear);
                setVal('lunarMonth', L.lunarMonth);
                setVal('lunarDay', L.lunarDay);
                calculateNumerology();
            }finally{
                const setVal = (id, v)=>{ const el = document.getElementById(id); if(el && typeof v!=='undefined') el.value = v; };
                Object.keys(backup).forEach(k=> setVal(k, backup[k]));
            }
        }
function soulOffsetChangeRecalc(){
            const sel = document.getElementById('soulOffset');
            if(sel){
                sel.addEventListener('change', ()=>{
                    try {
                    // 優先用當前欄位；若未填完整，改用上次有效輸入
                    const ry = parseInt(document.getElementById('rocYear')?.value);
                    const sm = parseInt(document.getElementById('solarMonth')?.value);
                    const sd = parseInt(document.getElementById('solarDay')?.value);
                    const ly = parseInt(document.getElementById('lunarYear')?.value);
                    const lm = parseInt(document.getElementById('lunarMonth')?.value);
                    const ld = parseInt(document.getElementById('lunarDay')?.value);
                    if(LAST_CTX){ refreshAllWithOffset(); }
                    else if([ry,sm,sd,ly,lm,ld].some(isNaN)) { recalcWithLastInputs(); }
                    else { calculateNumerology(); }
                    } catch(e){ console.warn('recalc failed', e); }
                });
            }
        }
        document.addEventListener('DOMContentLoaded', soulOffsetChangeRecalc);
    

        // ---- 靈魂換日線：全域事件與監聽，確保任一處變更都能觸發重算 ----
        function __recalcAfterSoulOffsetChanged__(){
            try {
                const ry = parseInt(document.getElementById('rocYear')?.value);
                const sm = parseInt(document.getElementById('solarMonth')?.value);
                const sd = parseInt(document.getElementById('solarDay')?.value);
                const ly = parseInt(document.getElementById('lunarYear')?.value);
                const lm = parseInt(document.getElementById('lunarMonth')?.value);
                const ld = parseInt(document.getElementById('lunarDay')?.value);
                if([ry,sm,sd,ly,lm,ld].some(isNaN)){
                    if(typeof recalcWithLastInputs==='function'){ recalcWithLastInputs(); }
                }else{
                    calculateNumerology();
                }
            } catch(e){
                console.warn('soul offset recalc error:', e);
            }
        }
        // 事件 1：全域自定義事件（由 setter 觸發）
        window.addEventListener('soul:offset', __recalcAfterSoulOffsetChanged__);
        // 事件 2：保險機制 —— 監聽任意 change，若是 soulOffset 也重算（避免載入時序問題）
        document.addEventListener('change', (e)=>{
            if(e && e.target && e.target.id==='soulOffset'){
                if(LAST_CTX){ refreshAllWithOffset(); } else { __recalcAfterSoulOffsetChanged__(); }
            }
        }, true);


        // 將重算動作暴露到全域，供 index.html 直接呼叫
        window.RECALC_ALL = function(){
            try {
                const ry = parseInt(document.getElementById('rocYear')?.value);
                const sm = parseInt(document.getElementById('solarMonth')?.value);
                const sd = parseInt(document.getElementById('solarDay')?.value);
                const ly = parseInt(document.getElementById('lunarYear')?.value);
                const lm = parseInt(document.getElementById('lunarMonth')?.value);
                const ld = parseInt(document.getElementById('lunarDay')?.value);
                if([ry,sm,sd,ly,lm,ld].some(isNaN)){
                    if(typeof recalcWithLastInputs==='function'){ recalcWithLastInputs(); }
                    else { calculateNumerology(); }
                } else {
                    calculateNumerology();
                }
            } catch(e){
                console.warn('window.RECALC_ALL error:', e);
            }
        };
    