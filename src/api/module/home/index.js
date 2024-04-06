import server from "../server";
let loadedPosts = [];

export const homeApi = {
  getMember: async () => {
    const { data } = await server.get("/member");
    return data;
  },
  getPostData: async () => {
    const { data } = await server.get("/post");
    return data;
  },

  // getPostDataBy10: async () => {
  //   try {
  //     //載入10筆
  //     const { data } = await server.get("/post", { params: { limit: 10 } });
  //     //從新資料中過濾已載入的貼文 避免重複
  //     const newLoadPosts = data.filter(
  //       (post) =>
  //         !loadedPosts.some((loadedPosts) => loadedPosts.postID === post.postID)
  //     );

  //     // 將新數據加入到已載入的數據
  //     loadedPosts = [...loadedPosts, ...newLoadPosts];
  //     // 已經載入10筆貼文數據 直接返回已經載入的數據
  //     if (newLoadPosts.length > 0 && newLoadPosts.length <= 10) {
  //       return newLoadPosts;
  //     } else {
  //       console.log("沒有貼文了");
  //       return [];
  //     }
  //   } catch (error) {
  //     console.log("Error fetching data:", error);
  //     return [];
  //   }
  // },
};
