import Mock from "mockjs";
import membersData from "./member.json";
import { message } from "antd";

Mock.mock("/api/signIn", "post", (options) => {
  const { username, password } = JSON.parse(options.body);
  const user = membersData.find(
    (member) => member.account === username && member.password === password
  );

  if (user) {
    return {
      code: 200,
      data: {
        userId: user["member-id"],
        name: user.name,
        avatar: user.avatar,
      },
      message: "登入成功",
    };
  } else {
    return {
      code: 401,
      message: "帳號或密碼有誤",
    };
  }
});
