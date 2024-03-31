export const setToken = (token) => {
  localStorage.setItem("My-TOKEN", JSON.stringify(token));
};
export const getToken = () => {
  return JSON.parse(localStorage.getItem("My-TOKEN")) || '';
};
export const removeToken = () => {
  localStorage.getItem("My-TOKEN");
};
export const setAccount = (account) => {
  localStorage.setItem("My-Account", JSON.stringify(account));
};
export const getAccount = () => {
  return JSON.parse(localStorage.getItem("My-Account"));
};
export const removeAccount = () => {
  localStorage.getItem("My-Account");
};

export const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
};
export const getTheme = () => {
  return localStorage.getItem("theme") || "light";
};

//將資料存到本地儲存庫
export const setPost = (data) => {
  localStorage.setItem("posts", JSON.stringify(data));
};
//從本地儲存庫讀取資料
export const getPost = () => {
  return JSON.parse(localStorage.getItem("posts"));
};
//從本地儲存庫移除資料;
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
