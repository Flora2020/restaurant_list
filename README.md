# 餐廳清單 (restaurant list)

## 環境建置與需求 (prerequisites)
- Node.js 10.15.0
- express 4.17.1
- body-parser 1.19.0
- express-handlebars 5.2.0
- mongoose 5.11.13
- MongoDB Community Server 4.2.12
- Robo 3T 1.4.2 (需建立名為「restaurant-list」的database)

## 安裝與執行 (installation and execution)
1. 選定一個資料夾，用來存放本專案。開啟終端機，移動至該資料夾，下載本專案
```
git clone https://github.com/Flora2020/restaurant_list.git
```
2. 移動至本專案資料夾
```
cd restaurant_list
```
3. 安裝套件
```
npm install
```
4. 啟動伺服器
```
node app.js
```
5. 若終端機出現下列字樣，代表伺服器成功啟動
```
Express is listening on http://localhost:3000
mongodb connected!
```
6. 執行餐廳清單：打開瀏覽器，於網址列輸入
```
http://localhost:3000
```
7. 建立種子資料
```
npm run seed
```

## 功能 (features)
- 瀏覽餐廳列表
- 於餐廳列表中點擊任一間餐廳，即可瀏覽該餐廳之詳細資訊
- 新增餐廳
- 編輯餐廳
- 刪除餐廳
- 使用餐廳名稱及分類，搜尋列表中之餐廳

## 預覽圖 (preview image)
![This is a preview image.](https://github.com/Flora2020/images/blob/main/restaurant-list.jpg?raw=true "This is a preview image.")