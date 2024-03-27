export const setToken = (token) => {
  localStorage.setItem("My-TOKEN", JSON.stringify(token));
};
export const getToken = () => {
  return JSON.parse(localStorage.getItem("My-TOKEN"));
};
export const removeToken = () => {
  localStorage.getItem("My-TOKEN");
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
//新增資料
// export const addPost = (newData) => {
//   //1.獲取數據
//   const data = getPost();
//   console.log(data);
//   //2.定義新增數據
//   const post = {
//     postID: Math.round(Math.random() * 100),
//     topic: "exam",
//     title: "必讀章節",
//     overview: "讀書戰士們加油",
//     text: "好想上榜～～～ 讀書戰士們加油",
//     photoPath: "",
//     name: "anna",
//     likes: {
//       thumbs: 0,
//       cryingFace: 0,
//       heart: 0,
//     },
//     creatAt: 1711181251,
//     comments: [],
//   };
//   const newPosts = [...data, post];
//   //3.存進數據庫
//   setPost(newPosts);
//   //4.響應式數據修改
  
// };

//從本地儲存庫移除資料;
export const removePost = () => {
  localStorage.removeItem("posts");
};
