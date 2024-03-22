import Mock from "mockjs";

import members from "./members.json";
import token from "./login.json";
import postData from "./post.json";

Mock.mock("/mock/members", {
  code: 200,
  data: members,
});
Mock.mock("/mock/login", {
  code: 200,
  data: token,
});
Mock.mock("/mock/post", {
  code: 200,
  data: postData,
});
