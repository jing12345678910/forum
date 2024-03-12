import Mock from "mockjs";

import member from "./member.json";
import token from "./login.json";

Mock.mock("/mock/member", {
  code: 200,
  data: member,
});
Mock.mock("/mock/login", {
  code: 200,
  data: token,
});
