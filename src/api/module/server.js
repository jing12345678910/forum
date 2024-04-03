import axios from "axios";

//創建一個 Axios 實例（instance）
const instance = axios.create({
  baseURL: "/mock",
  // Axios 在5秒內沒收到伺服器的回應，請求將被視為失敗
  timeout: 5000,
});

//請求攔截器
//ToDo:增加身分認證
instance.interceptors.request.use((config) => {
  return config;
});

//響應攔截器
instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return console.error(err);
  }
);

export default instance;