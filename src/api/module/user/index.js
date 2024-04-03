import server from "../server";

export const userApi = {
  // login 方法：向後端伺服器提交登入請求
  // 請求方式：POST
  // 請求目標：/login
  // 請求參數：account, password
  // 返回值：從後端伺服器收到的響應資料
  // 前端不包含身分驗證的功能
  login: async ({ account, password }) => {
    const { data } = await server.post("/login", { account, password });
    return data;
  },
  logout: () => {
    localStorage.removeItem("My-TOKEN");
  },
};