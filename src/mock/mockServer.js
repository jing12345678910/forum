import Mock from "mockjs";
import members from "./members.json"; 
import token from "./login.json"; 
import postData from "./post.json"; 

// Mock 成員資料接口
Mock.mock("/mock/members", {
  code: 200,
  data: members,
});

// Mock 登錄接口
Mock.mock("/mock/login", {
  code: 200,
  data: token,
});

// Mock 分頁獲取貼文資料接口
Mock.mock(/\/mock\/post\?page=\d+&per_page=\d+/, "get", (config) => {
  // 請求參數中的頁碼和每頁數量
  const params = new URLSearchParams(config.url);
  const page = parseInt(params.get("page"));
  const per_page = parseInt(params.get("per_page"));

  // 根據頁碼和每頁數量計算貼文的起始和結束索引
  const start = (page - 1) * per_page;
  const end = start + per_page;

  // 從貼文資料中獲取指定範圍的貼文資料
  const posts = postData.slice(start, end);

  // 返回貼文資料
  return Mock.mock({ code: 200, data: posts });
});