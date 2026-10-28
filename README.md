# NANSHAN LifeLab Demo（Codex Ready）

純靜態、無資料庫、手機優先。

## 執行
直接雙擊 `index.html`，或：
```bash
python3 -m http.server 8000
```
再開 `http://localhost:8000`

## 最常改
- `data.js`：事件、金額、商品範例、官方連結
- `styles.css`：介面
- `app.js`：流程與計算
- `AGENTS.md`：給 Codex 的專案規則
- `CODEX_PROMPTS.md`：可直接貼給 Codex 的修改指令
- `DEPLOY_GITHUB_PAGES.md`：固定網址上架教學

所有金額都是教育情境假設，不是實際保費、保額或理賠試算。


## 遊戲壓力與保障升級
- 每十年一關，先選本階段保障種類及基本／加重／高額等級，再揭曉隨機事件；揭曉後不能回溯加保。
- 一般風險抽選率隨年齡為65%～88%，完全未配置持續保障為82%～96%；這是遊戲難度，不是真實事故率。
- 人身保費依年齡係數、等級與年增2%的遊戲假設計算；事件費用依情境、年齡與隨機嚴重程度計算。
- 模擬給付有種類及上限限制，不對應實際南山保單報價或理賠；官方資訊入口仍保留。

驗證方式（需要 Node.js）：
```bash
node tests/challenge.test.cjs
```
