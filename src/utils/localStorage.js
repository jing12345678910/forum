//將token存到本地儲存庫
export const setToken = (token) => {
  localStorage.setItem("My-TOKEN", JSON.stringify(token));
};
//從本地儲存庫讀取token
export const getToken = () => {
  return JSON.parse(localStorage.getItem("My-TOKEN")) || "";
};
//從本地儲存庫移除token;
export const removeToken = () => {
  localStorage.getItem("My-TOKEN");
};
//將帳號存到本地儲存庫
export const setAccount = (account) => {
  localStorage.setItem("My-Account", JSON.stringify(account));
};
//從本地儲存庫讀取帳號
export const getAccount = () => {
  return JSON.parse(localStorage.getItem("My-Account"));
};
//從本地儲存庫移除帳號;
export const removeAccount = () => {
  localStorage.getItem("My-Account");
};
// 設定主題至本地儲存庫
export const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
};
// 從本地儲存庫取得主題
export const getTheme = () => {
  return localStorage.getItem("theme") || "light";
};
//將貼文資料存到本地儲存庫
export const setPost = (data) => {
  localStorage.setItem("posts", JSON.stringify(data));
};
//從本地儲存庫讀取貼文資料
export const getPost = () => {
  return JSON.parse(localStorage.getItem("posts")) || [];
};
//從本地儲存庫移除貼文資料;
export const removePost = () => {
  localStorage.removeItem("posts");
};
//將收藏資料存到本地儲存庫
export const setCollection = (data) => {
  localStorage.setItem("collection", JSON.stringify(data));
};
//從本地儲存庫讀取收藏資料
export const getCollection = () => {
  return JSON.parse(localStorage.getItem("collection"));
};
//從本地儲存庫移除收藏資料;
export const removeCollection = () => {
  localStorage.removeItem("collection");
};
