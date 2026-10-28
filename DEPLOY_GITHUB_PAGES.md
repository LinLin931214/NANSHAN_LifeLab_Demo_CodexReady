# GitHub Pages 固定網址上架教學

## 固定網址
`https://你的GitHub帳號.github.io/nanshan-lifelab/`

只要 GitHub 帳號與 repo 名稱 `nanshan-lifelab` 不變，之後更新內容，網址都不變，QR Code 也不用重做。

## 第一次
1. GitHub → New repository
2. Repo 名稱：`nanshan-lifelab`
3. 上傳本資料夾所有檔案到 repo 根目錄
4. Settings → Pages
5. Source：Deploy from a branch
6. Branch：main
7. Folder：/(root)
8. Save

## 之後更新
用 Codex 修改同一個 repo → commit / push 到 `main`。
GitHub Pages 重新部署，但網址不變。

## QR Code
拿到固定網址後，只需要針對那個網址做一次 QR Code。
之後改內容、增加事件、換 UI，都不用換 QR Code。

## Codex
建議把 repo 交給 Codex 後，先叫它閱讀 `AGENTS.md`，再用 `CODEX_PROMPTS.md` 裡的指令修改。
