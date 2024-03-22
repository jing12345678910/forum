import server from "../server";

export const homeApi = {
  getMember: async () => {
    const { data } = await server.get("/member");
    return data;
  },
  getPostData: async () => {
    const { data } = await server.get("/post");
    return data;
  },
};
