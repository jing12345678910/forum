import { useState, useEffect } from "react";
import FoLayout from "@/components/FoLayout";
import {
  Button,
  Flex,
  Input,
  Upload,
  Checkbox,
  Form,
  Select,
  Space,
} from "antd";
import ImgCrop from "antd-img-crop";
import { useTranslation } from "react-i18next";
import { setPost } from "@/utils/localStorage";
const { TextArea } = Input;
//處理上傳文件的統一格式
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const AddPost = () => {
  const { t } = useTranslation();
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [formData, setFormData] = useState({
    postID: Math.round(Math.random() * 100),
    topic: "",
    title: "",
    overview: "",
    text: "",
    photoPath: "",
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
    setPost(formData);
  };
  //主題項目
  const options = [
    {
      value: "1",
      label: t("stock"),
    },
    {
      value: "2",
      label: t("mood"),
    },
    {
      value: "3",
      label: t("beauty"),
    },
    {
      value: "4",
      label: t("exam"),
    },
    {
      value: "5",
      label: t("animation"),
    },
    {
      value: "6",
      label: t("music"),
    },
    {
      value: "7",
      label: t("drama"),
    },
    {
      value: "8",
      label: t("variety"),
    },
    {
      value: "9",
      label: t("idol"),
    },
    {
      value: "10",
      label: t("pet"),
    },
    {
      value: "11",
      label: t("gourmet"),
    },
    {
      value: "12",
      label: t("travel"),
    },
    {
      value: "13",
      label: t("outfit"),
    },
    {
      value: "14",
      label: t("sports"),
    },
    {
      value: "15",
      label: t("work"),
    },
  ];
  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
    //把選中的主題存到formData
    setFormData((prevFormData)=>({
      ...prevFormData
      ,topic:value,
    }))
  };

  //上傳圖片start
  const [fileList, setFileList] = useState([
    {
      uid: "-1", //預設圖片的id 與實際上傳圖片的id 做出區別
      name: "image.png",
      status: "done",
      url: "images/avatar.jpg",
    },
  ]);
  //處理文件上傳元件的變化
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  //Antd套件 文件上傳預覽
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <FoLayout>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        ToDo:確認是會員才可以填表格，顯示會員名稱
      </Checkbox>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{
          maxWidth: 600,
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
        <Form.Item label={t("content")}>
          <TextArea
            rows={4}
            placeholder={t("enter the content")}
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          />
        </Form.Item>
        {/* 上傳圖片 */}
        <Form.Item
          label={t("upload")}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <ImgCrop rotationSlider>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onChange={(info) => {
                //獲取上傳的文件列表
                const { fileList, newFileList } = info;
                //更新文件列表到狀態變數
                setFileList(newFileList);
                //獲取文件列表中的圖片地址，儲存到photoPath字段中
                const photoPath = newFileList.map((file) => file.url);
                // 將圖片地址儲存到fromData狀態中
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  photoPath: photoPath,
                }));
              }}
              onPreview={onPreview}
            >
              {fileList.length < 5 && t("upload")}
            </Upload>
          </ImgCrop>
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
