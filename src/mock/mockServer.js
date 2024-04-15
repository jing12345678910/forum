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

Mock.mock("/mock/postData", {
  code: 200,
  data: postData,
});

const getQuery = (url, query) => {
  //str為?之後的參數部分字串符
  const str = url.substr(url.indexOf('?') + 1);
  //arr每個元素都是完整的參數健值
  const arr = str.split('&');
  //result為存儲參數健值的集合
  const result = {}
  for (let i = 0; i < arr.length; i++) {
    //item的兩個元素分別為參數名和參數值
    const item = arr[i].split('=')
    result[item[0]] = item[1];
  }
  return result[query]
}

// Mock 分頁獲取貼文資料接口
Mock.mock(/\/mock\/post\?page=\d+&per_page=\d+/, "get", (config) => {
  // 請求參數中的頁碼和每頁數量
  console.log(config);
  // const params = new URLSearchParams(config.url);
  const page = getQuery(config.url,'page')
  const per_page = getQuery(config.url,"per_page")
  // 根據頁碼和每頁數量計算貼文的起始和結束索引
  const start = (page - 1) * Number(per_page);
  const end = start + Number(per_page);
  // 從貼文資料中獲取指定範圍的貼文資料
  const posts = postData.slice(start, end);
  // 返回貼文資料
  return Mock.mock({ code: 200, data: posts });
});
