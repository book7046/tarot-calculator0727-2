
document.addEventListener('DOMContentLoaded', function() {
  
        // 塔羅牌名稱
        const tarotCards = [
            "愚人", "魔法師", "女祭司", "女皇", "國王", "教宗", 
            "戀人", "戰車", "力量", "隱士", "命運之輪", "正義", 
            "吊人", "死神", "節制", "惡魔", "高塔", "星星", 
            "月亮", "太陽", "審判", "世界"
        ];
        
        // 靈數解釋資料庫
        let numerologyData = {
            0: {
                positiveTraits: "創造力、無限可能、自由、開放",
                negativeTraits: "混亂、不確定、缺乏方向",
                others: "代表新的開始和無限可能",
                keyPoints: "創新思維、接受變化、勇於冒險"
            },
            1: {
                positiveTraits: "領導力、獨立、創新、自信",
                negativeTraits: "專制、自我中心、固執",
                others: "代表新的開始和獨立自主",
                keyPoints: "培養獨立性、發揮領導才能、開創新局面"
            },
            2: {
                positiveTraits: "和諧、平衡、直覺、合作",
                negativeTraits: "優柔寡斷、過度敏感、依賴",
                others: "代表二元性和合作關係",
                keyPoints: "培養合作精神、信任直覺、尋求平衡"
            },
            3: {
                positiveTraits: "創意、表達、樂觀、社交",
                negativeTraits: "表面化、分散注意力、過度社交",
                others: "代表創造力和自我表達",
                keyPoints: "發揮創意、享受生活、有效溝通"
            },
            4: {
                positiveTraits: "穩定、組織、實際、可靠",
                negativeTraits: "固執、保守、缺乏彈性",
                others: "代表穩定和結構",
                keyPoints: "建立穩固基礎、注重細節、堅持不懈"
            },
            5: {
                positiveTraits: "冒險、自由、變化、適應力",
                negativeTraits: "衝動、不穩定、缺乏承諾",
                others: "代表變化和自由",
                keyPoints: "擁抱變化、尋求自由、保持彈性"
            },
            6: {
                positiveTraits: "責任、關懷、和諧、平衡",
                negativeTraits: "過度犧牲、干涉、完美主義",
                others: "代表責任和關懷",
                keyPoints: "照顧他人、創造和諧、承擔責任"
            },
            7: {
                positiveTraits: "智慧、分析、內省、靈性",
                negativeTraits: "懷疑、孤立、過度分析",
                others: "代表智慧和靈性探索",
                keyPoints: "深入思考、尋求真相、靈性成長"
            },
            8: {
                positiveTraits: "力量、成就、物質成功、權威",
                negativeTraits: "控制、工作狂、物質主義",
                others: "代表力量和物質世界的掌握",
                keyPoints: "追求成功、發揮領導力、平衡物質與精神"
            },
            9: {
                positiveTraits: "完成、智慧、寬容、慈悲",
                negativeTraits: "放棄、過度理想化、不切實際",
                others: "代表完成和人道主義",
                keyPoints: "服務他人、完成目標、放下執著"
            },
            10: {
                positiveTraits: "新的開始、潛力、機會、創新",
                negativeTraits: "不確定性、缺乏方向、猶豫",
                others: "代表循環的結束和新的開始",
                keyPoints: "把握機會、開始新階段、接受變化"
            },
            11: {
                positiveTraits: "直覺、靈感、精神覺醒、創新",
                negativeTraits: "過度敏感、不切實際、神經質",
                others: "代表高度靈性和直覺",
                keyPoints: "信任直覺、發揮創意、追求靈性成長"
            },
            12: {
                positiveTraits: "智慧、犧牲、洞察、靈性",
                negativeTraits: "猶豫不決、自我犧牲、受害者心態",
                others: "代表犧牲和靈性智慧",
                keyPoints: "放下執著、獲取新視角、接受必要的犧牲"
            },
            13: {
                positiveTraits: "轉變、結束、釋放、重生",
                negativeTraits: "抗拒變化、恐懼、執著過去",
                others: "代表轉變和重生",
                keyPoints: "接受結束、擁抱變化、迎接新開始"
            },
            14: {
                positiveTraits: "平衡、適度、耐心、調和",
                negativeTraits: "極端、缺乏節制、不平衡",
                others: "代表平衡和中庸之道",
                keyPoints: "尋求平衡、保持耐心、適度行事"
            },
            15: {
                positiveTraits: "激情、力量、創造力、解放",
                negativeTraits: "沉迷、執著、自我束縛",
                others: "代表面對內在恐懼和慾望",
                keyPoints: "認識自我限制、釋放束縛、轉化能量"
            },
            16: {
                positiveTraits: "覺醒、解放、突破、啟示",
                negativeTraits: "混亂、破壞、抗拒變化",
                others: "代表突然變化和舊結構的崩塌",
                keyPoints: "接受必要的破壞、從廢墟中重建、擁抱變革"
            },
            17: {
                positiveTraits: "希望、靈感、更新、指引",
                negativeTraits: "不切實際、幻想、缺乏行動",
                others: "代表希望和靈性指引",
                keyPoints: "保持希望、跟隨內在指引、相信未來"
            },
            18: {
                positiveTraits: "直覺、潛意識、夢境、神秘",
                negativeTraits: "幻覺、恐懼、混亂、欺騙",
                others: "代表面對潛意識和隱藏的恐懼",
                keyPoints: "信任直覺、探索潛意識、克服恐懼"
            },
            19: {
                positiveTraits: "活力、喜悅、成功、樂觀",
                negativeTraits: "過度樂觀、表面化、自我中心",
                others: "代表成功和實現",
                keyPoints: "慶祝成就、分享喜悅、保持樂觀"
            },
            20: {
                positiveTraits: "覺醒、更新、評估、轉變",
                negativeTraits: "自我批判、猶豫、恐懼改變",
                others: "代表靈性覺醒和重生",
                keyPoints: "接受生命評估、迎接新階段、靈性成長"
            },
            21: {
                positiveTraits: "完成、整合、成就、圓滿",
                negativeTraits: "停滯、恐懼結束、抗拒新開始",
                others: "代表完成和整合",
                keyPoints: "慶祝成就、整合經驗、準備新旅程"
            }
        };
        
        // 流年課題資料庫
        let yearlyThemeData = {
            0: "新的開始，放下過去，接受未知的挑戰。這是一個充滿可能性的一年，適合開始新計劃、嘗試新事物。保持開放的心態，不要被過去的經驗限制。",
            1: "獨立自主，開創新局，展現領導力。這一年你將有機會展示自己的獨立性和創新能力。勇於表達自己的想法，並採取主動行動實現目標。",
            2: "合作與關係，平衡與和諧。這一年人際關係將成為焦點，需要學習如何與他人合作，尋求平衡。傾聽直覺，培養耐心和外交技巧。",
            3: "創意表達，社交擴展，樂觀積極。這是一個充滿創造力和社交活動的一年，適合表達自己、擴展人脈。保持樂觀態度，享受生活的樂趣。",
            4: "建立基礎，組織規劃，務實穩健。這一年需要腳踏實地，建立穩固的基礎。專注於細節，制定切實可行的計劃，並有紀律地執行。",
            5: "變化與自由，冒險與適應。這一年將充滿變化和新機會，需要保持靈活性和適應能力。擁抱變化，尋求自由，但避免衝動決策。",
            6: "責任與關懷，家庭與和諧。這一年家庭和責任將成為重點，需要平衡個人需求與他人需求。創造和諧的環境，關心他人，同時也要照顧自己。",
            7: "內省與分析，靈性與智慧。這是一個適合深入思考和靈性探索的一年。尋求獨處的時間，深入研究感興趣的主題，傾聽內在的智慧。",
            8: "力量與成就，物質與權威。這一年將聚焦於事業和物質成就，有機會展現領導能力和取得成功。平衡追求成功與維持誠信，避免工作過度。",
            9: "完成與放下，慈悲與服務。這是一個結束和完成的一年，適合放下不再服務於你的事物。尋找服務他人的方式，培養寬容和慈悲心。",
            10: "新循環的開始，機會與潛力。這一年標誌著一個循環的結束和新循環的開始。評估過去的經驗，準備迎接新的機會和挑戰。",
            11: "靈感與直覺，覺醒與創新。這是一個高度靈性和直覺的一年，可能會有重要的靈性覺醒和洞見。信任你的直覺，尋求更高的目標和理想。",
            12: "犧牲與智慧，放下與成長。這一年可能需要做出某些犧牲以獲得更大的智慧和成長。改變視角，接受必要的限制，尋找更深層次的意義。",
            13: "轉變與重生，結束與新生。這是一個重大轉變的一年，舊的結構和模式可能會結束。擁抱變化，相信結束後會有新的開始。",
            14: "平衡與節制，耐心與調和。這一年需要在各個生活領域尋求平衡。避免極端，培養耐心，適度行事，尋找中庸之道。",
            15: "面對內在恐懼，釋放束縛，轉化能量。這一年將有機會認識並面對自己的限制和恐懼。識別不健康的模式和依附，釋放自我束縛。",
            16: "突破與覺醒，解構與重建。這可能是一個充滿挑戰和突然變化的一年。接受必要的破壞，相信這是為了更好的重建和成長。",
            17: "希望與指引，更新與靈感。這一年將充滿希望和新的可能性。跟隨內在的指引，保持樂觀，相信未來的美好。",
            18: "面對潛意識，探索內在，克服幻覺。這一年將深入探索潛意識和隱藏的恐懼。區分真相和幻覺，信任直覺，勇敢面對內在的陰影。",
            19: "成功與喜悅，活力與慶祝。這是一個充滿活力和成就的一年。慶祝你的成功，分享你的喜悅，享受生活的美好。",
            20: "靈性覺醒，生命評估，準備轉變。這一年將是重要的評估和覺醒時期。審視過去的選擇，為未來的轉變做準備。",
            21: "完成與整合，成就與圓滿。這是一個完成和整合的一年。慶祝你的成就，整合你的經驗，準備開始新的旅程。"
        };
        
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
            const month = Math.abs(parseInt(document.getElementById('lunarMonth').value));
            const day = parseInt(document.getElementById('lunarDay').value);
            
            if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
                document.getElementById('lunarDateDisplay').textContent = `西元 ${year} 年 ${month} 月 ${day} 日`;
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
                    document.getElementById('lunarMonth').value = lunar.getMonth();
                    document.getElementById('lunarDay').value = lunar.getDay();
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
            const lunarMonth = Math.abs(parseInt(document.getElementById('lunarMonth').value));
            const lunarDay = parseInt(document.getElementById('lunarDay').value);
            
            // 轉換為西元年
            const solarYear = rocYear + 1911;
            
            // 驗證輸入
            if (isNaN(rocYear) || isNaN(solarMonth) || isNaN(solarDay) ||
                isNaN(lunarYear) || isNaN(lunarMonth) || isNaN(lunarDay)) {
                alert('請輸入完整的出生日期');
                return;
            }
            
            // 計算國曆靈數
            const solarEssence = calculateEssence(solarYear);
            const solarExternalRaw = solarYear + solarMonth + solarDay;
            const solarExternal = calculateSum(solarExternalRaw);
            const solarInternal = solarExternal > 21 ? calculateSum(solarExternal) : solarExternal;
            
            // 計算農曆靈數
            const lunarEssence = calculateEssence(lunarYear);
            const lunarExternalRaw = lunarYear + lunarMonth + lunarDay;
            const lunarExternal = calculateSum(lunarExternalRaw);
            const lunarInternal = lunarExternal > 21 ? calculateSum(lunarExternal) : lunarExternal;
            
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
            const solarYearly = calculateFinalSum(solarYearlyRaw);
            
            // 計算農曆流年
            const lunarYearlyRaw = yearToUse + lunarMonth + lunarDay;
            const lunarYearly = calculateFinalSum(lunarYearlyRaw);
            
            // 顯示今年流年
            document.getElementById('currentSolarYear').textContent = solarYearly;
            document.getElementById('currentSolarYearCard').textContent = getTarotCard(solarYearly);
            
            document.getElementById('currentLunarYear').textContent = lunarYearly;
            document.getElementById('currentLunarYearCard').textContent = getTarotCard(lunarYearly);
            // ===== 計算本月流月 =====
            const currentMonth = currentDate.getMonth() + 1;
            const baseSolarRaw = solarYear + solarMonth + solarDay;
            const baseLunarRaw = lunarYear + lunarMonth + lunarDay;
            const solarMonthlyRaw = baseSolarRaw + currentYear + currentMonth;
            const lunarMonthlyRaw = baseLunarRaw + currentYear + currentMonth;
            const solarMonthly = calculateFinalSum(solarMonthlyRaw);
            const lunarMonthly = calculateFinalSum(lunarMonthlyRaw);

            // ===== 計算本日流日 =====
            const currentDay = currentDate.getDate();
            const solarDailyRaw = baseSolarRaw + currentYear + currentMonth + currentDay;
            const lunarDailyRaw = baseLunarRaw + currentYear + currentMonth + currentDay;
            const solarDaily = calculateFinalSum(solarDailyRaw);
            const lunarDaily = calculateFinalSum(lunarDailyRaw);

            // ===== 更新本月流月 / 本日流日顯示 =====
            document.getElementById('currentSolarMonth').textContent = solarMonthly;
            document.getElementById('currentSolarMonthCard').textContent = getTarotCard(solarMonthly);
            document.getElementById('currentLunarMonth').textContent = lunarMonthly;
            document.getElementById('currentLunarMonthCard').textContent = getTarotCard(lunarMonthly);

            document.getElementById('currentSolarDay').textContent = solarDaily;
            document.getElementById('currentSolarDayCard').textContent = getTarotCard(solarDaily);
            document.getElementById('currentLunarDay').textContent = lunarDaily;
            document.getElementById('currentLunarDayCard').textContent = getTarotCard(lunarDaily);

            
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
        function calculateEssence(year) {
            // 取年份後兩位數
            const lastTwoDigits = year % 100;
            // 將兩位數相加
            let sum = Math.floor(lastTwoDigits / 10) + (lastTwoDigits % 10);
            // 如果大於21，減去22
            if (sum > 21) {
                sum -= 22;
            }
            return sum;
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
                const solarYearly = calculateFinalSum(solarYearlyRaw);
                const solarCell = document.createElement('td');
                solarCell.className = 'py-2 px-4 border-b';
                solarCell.innerHTML = `<span class="font-bold numerology-value" data-type="yearly">${solarYearly}</span> - ${getTarotCard(solarYearly)}`;
                row.appendChild(solarCell);
                
                // 農曆流年
                const lunarYearlyRaw = year + lunarMonth + lunarDay;
                const lunarYearly = calculateFinalSum(lunarYearlyRaw);
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
                    const solarYearly = calculateFinalSum(solarYearlyRaw);
                    
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
                    const lunarYearly = calculateFinalSum(lunarYearlyRaw);
                    
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
    


// ========= 新增：今年流月 / 流日 =========

// 顏色與樣式
const flowRowColors = ['bg-red-50','bg-green-50','bg-yellow-50'];
const highlightCls  = 'text-red-600 font-extrabold underline';
const solarCls      = 'text-blue-700';
const lunarCls      = 'text-emerald-700';
const fmtVal = (num, cls='') => `<span class="${[7,13,16].includes(num)?highlightCls:cls}">${num}</span>`;

// 產生 12 個月流月方塊
function genYearGrid(year, solarBase, lunarBase){
    const grid = document.getElementById('yearFlowGrid');
    if(!grid) return;
    grid.innerHTML = '';
    for(let m=1; m<=12; m++){
        const s = calculateFinalSum(solarBase + year + m);
        const l = calculateFinalSum(lunarBase + year + m);
        grid.insertAdjacentHTML('beforeend', `
            <div data-month="${m}" class="rounded-lg p-3 cursor-pointer hover:ring-2 hover:ring-indigo-400 ${flowRowColors[Math.floor((m-1)/4)]}">
              <div class="font-semibold mb-1">${m} 月</div>
              <div>${fmtVal(s, solarCls)} <span class="text-gray-500 ml-1">國</span></div>
              <div>${fmtVal(l, lunarCls)} <span class="text-gray-500 ml-1">農</span></div>
            </div>`);
    }
}

// 產生流日日曆
function genDayCalendar(year, month, solarBase, lunarBase){
    const wrap = document.getElementById('monthFlowCalendar');
    if(!wrap) return;
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstWeekday = new Date(year, month-1, 1).getDay();
    let html = `
    <table class="w-full text-base table-fixed border border-gray-300 select-none">
    <thead>
        <tr class="text-gray-700 bg-gray-50 border-b border-gray-300">
            <th class="py-1 border border-gray-300">日</th>
            <th class="py-1 border border-gray-300">一</th>
            <th class="py-1 border border-gray-300">二</th>
            <th class="py-1 border border-gray-300">三</th>
            <th class="py-1 border border-gray-300">四</th>
            <th class="py-1 border border-gray-300">五</th>
            <th class="py-1 border border-gray-300">六</th>
        </tr>
    </thead>
    <tbody>`;

    let d = 1;
    for(let r=0; r<6 && d<=daysInMonth; r++){
        html += '<tr>';
        for(let c=0; c<7; c++){
            if(r===0 && c<firstWeekday || d>daysInMonth){
                html += `<td class="border border-gray-300 p-2"></td>`;
            }else{
                const s = calculateFinalSum(solarBase + year + month + d);
                const l = calculateFinalSum(lunarBase + year + month + d);
                html += `<td class="border border-gray-300 p-2 text-center align-top">
                    <div class="text-base font-semibold text-gray-800 mb-1">${d}</div>
                    <div class="text-lg">${fmtVal(s, solarCls)}</div>
                    <div class="text-lg mt-1">${fmtVal(l, lunarCls)}</div>
                </td>`;
                d++;
            }
        }
        html += '</tr>';
    }
    html += '</tbody></table>';
    wrap.innerHTML = html;
    wrap.classList.remove('hidden');
}

// 保存基準值
let FLOW_BASE = { solar:null, lunar:null, year: new Date().getFullYear() };

// 包裝原 calculateNumerology, 每次計算後刷新流月
if(typeof calculateNumerology === 'function'){
    const _oldCalc = calculateNumerology;
    calculateNumerology = function(){
        _oldCalc.apply(this, arguments);
        updateFlowBase();
    };
}

// 從輸入欄取得基準值
function updateFlowBase(){
    const ry = +document.getElementById('rocYear')?.value;
    const sm = +document.getElementById('solarMonth')?.value;
    const sd = +document.getElementById('solarDay')?.value;
    const ly = +document.getElementById('lunarYear')?.value;
    const lm = Math.abs(+document.getElementById('lunarMonth')?.value);
    const ld = +document.getElementById('lunarDay')?.value;
    if([ry,sm,sd,ly,lm,ld].some(isNaN)) return;

    FLOW_BASE.solar = (ry + 1911) + sm + sd;
    FLOW_BASE.lunar = ly + lm + ld;
    genYearGrid(FLOW_BASE.year, FLOW_BASE.solar, FLOW_BASE.lunar);
    document.getElementById('monthFlowCalendar')?.classList.add('hidden');
}

// 點月方塊顯示流日日曆
document.addEventListener('click', e=>{
    const box = e.target.closest('[data-month]');
    if(!box || FLOW_BASE.solar===null) return;
    genDayCalendar(FLOW_BASE.year, +box.dataset.month, FLOW_BASE.solar, FLOW_BASE.lunar);
});

// 補：Tab 切換邏輯（與原有相容）
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab=>{
        tab.addEventListener('click', ()=>{
            const target = tab.dataset.tab || tab.getAttribute('data-target');
            if(!target) return;
            tabs.forEach(t=>t.classList.remove('active'));
            tab.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c=>c.style.display='none');
            const tgtEl = document.getElementById(target);
            if(tgtEl){
                tgtEl.classList.add('active');
                tgtEl.style.display='block';
            }
            if(target==='yearFlow' && FLOW_BASE.solar!==null){
                genYearGrid(FLOW_BASE.year, FLOW_BASE.solar, FLOW_BASE.lunar);
            }
        });
    });
});

});
