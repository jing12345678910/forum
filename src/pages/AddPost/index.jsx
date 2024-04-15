import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FoEditor from "@/components/FoEditor";
import FoLayout from "@/components/FoLayout";
import { Button, Flex, Input, Upload, Form, Select, Space } from "antd";
import { useTranslation } from "react-i18next";
import { setPost, getPost } from "@/utils/localStorage";
import { useAppStore } from "../../store/AppStore";
//處理上傳文件的統一格式
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const AddPost = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const { updatePosts } = useAppStore()
  const [content, setContent] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [formData, setFormData] = useState({
    postID: Math.round(Math.random() * 1000) + 25,
    topic: "",
    title: "",
    overview: "",
    text: content,
    photoPath: imgSrc,
    name: "",
    creatAt: 1711181251,
    likes: {
      thumbs: 0,
      cryingFace: 0,
      heart: 0,
    },
    comments: [],
    articleDiscussionVideo: "",
  });

  //處理整個表單的變化
  //表單有任何變化 就更新所有資料 並且更新FormData的狀態
  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };
  //提交表單時，再存到儲存庫中
  const handleFormSubmit = () => {
    setPost([formData,...getPost()]);
    updatePosts([ formData,...getPost()]);
    navigate('/')
  };
  //主題項目
  const options = [
    {
      value: "1",
      label: "股票板",
    },
    {
      value: "2",
      label: "心情板",
    },
    {
      value: "3",
      label: "美妝板",
    },
    {
      value: "4",
      label: "考試板",
    },
    {
      value: "5",
      label: "動漫板",
    },
    {
      value: "6",
      label: "音樂板",
    },
    {
      value: "7",
      label: "戲劇板",
    },
    {
      value: "8",
      label: "綜藝板",
    },
    {
      value: "9",
      label: "偶像板",
    },
    {
      value: "10",
      label: "寵物板",
    },
    {
      value: "11",
      label: "美食板",
    },
    {
      value: "12",
      label: "旅遊板",
    },
    {
      value: "13",
      label: "穿搭板",
    },
    {
      value: "14",
      label: "體育板",
    },
    {
      value: "15",
      label: "打工板",
    },
  ];
  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
    console.log(value);
    const topic = options.find(option => (option.value) === value)
    console.log(topic);
    //把選中的主題存到formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      topic: topic.label,
    }));
  };
  const handleUploadChange = async (info) => {
    const { file } = info;
    const photoPath = URL.createObjectURL(file.originFileObj);
    setImgSrc(photoPath);
    setFormData({ ...formData, photoPath });
  };
  return (
    <FoLayout>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
          // width: "1000px",
          margin: "0 auto",
        }}
        //設置表單初始值為localStorage中保存的值
        initialValues={formData}
      >
        {/* 主題選單 */}
        <Form.Item label={t("topic")}>
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            <Select
              defaultValue={t("topics")}
              onChange={handleChange}
              style={{
                width: "100%",
              }}
              options={options}
            />
          </Space>
        </Form.Item>
        {/* 輸入標題與概要 */}
        <Form.Item label={t("title")}>
          <Flex vertical gap={12}>
            {/* 將輸入框的值賦給title屬性 */}
            <Input
              placeholder={t("enter a title")}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </Flex>
        </Form.Item>
        <Form.Item label={t("overview")}>
          <Flex vertical gap={12}>
            <Input
              placeholder={t("describe")}
              value={formData.overview}
              onChange={(e) =>
                setFormData({ ...formData, overview: e.target.value })
              }
            />
          </Flex>
        </Form.Item>
        {/* 內文輸入 */}
        <FoEditor
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: 6,
            marginBottom: 30,
          }}
          placeholder={t("enter the content")}
          defaultStat={content}
          onChange={(text) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              text: text,
            }));
          }}
        />

        {/* 上傳圖片 */}
        <Form.Item
          label={t("upload")}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture-card"
            onChange={handleUploadChange}
          >
            <button style={{ border: 0, background: "none" }} type="button">
              <div style={{ marginTop: 8 }}>{t("upload")}</div>
            </button>
          </Upload>
        </Form.Item>
        {/* 送出或重整 */}
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={handleFormSubmit}>
            {t("submit")}
          </Button>
          <Button htmlType="reset"> {t("reset")}</Button>
        </Form.Item>
      </Form>
    </FoLayout>
  );
};

export default AddPost;
