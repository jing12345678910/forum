import server from "../server";

export const userApi = {
  login: async ({ account, password }) => {
    const { data } = await server.post("/login", { account, password });
    return data;
  },
  logout: () => {
    localStorage.removeItem("My-TOKEN");
  },
};
