import { useState, useEffect } from "react";
import FoLayout from "@/components/FoLayout";
import {
  Button,
  Dropdown,
  Flex,
  Input,
  Upload,
  Checkbox,
  Form,
} from "antd";
import ImgCrop from "antd-img-crop";
import { useTranslation } from "react-i18next";
import { setPost } from "@/utils/localStorage";
const { TextArea } = Input;
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
  //將表單所有值更新到FormData這個狀態變數中，以便後續操作使用
  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };
  //提交表單時，再存到儲存庫中
  const handleFormSubmit = () => {
    setPost(formData);
  };
  //主題項目
  const items = [
    {
      key: "1",
      label: t("stock"),
    },
    {
      key: "2",
      label: t("mood"),
    },
    {
      key: "3",
      label: t("beauty"),
    },
    {
      key: "4",
      label: t("exam"),
    },
    {
      key: "5",
      label: t("animation"),
    },
    {
      key: "6",
      label: t("music"),
    },
    {
      key: "7",
      label: t("drama"),
    },
    {
      key: "8",
      label: t("variety"),
    },
    {
      key: "9",
      label: t("idol"),
    },
    {
      key: "10",
      label: t("pet"),
    },
    {
      key: "11",
      label: t("gourmet"),
    },
    {
      key: "12",
      label: t("travel"),
    },
    {
      key: "13",
      label: t("outfit"),
    },
    {
      key: "14",
      label: t("sports"),
    },
    {
      key: "15",
      label: t("work"),
    },
  ];

  //上傳圖片start
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "images/avatar.jpg",
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
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
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
              arrow
              // 當選擇某一個主題時，更新表單中的主題值
              onSelect={(value) => setFormData({ ...formData, topic: value })}
            >
              <Button>{t("topics")}</Button>
            </Dropdown>
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
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
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
                  // 獲取上傳的文件列表
                  const { fileList, newFileList } = info;
                  //更新文件列表到狀態變數
                  setFileList(newFileList);
                  //獲取文件列表中的圖片地址，儲存到photoPath字段鍾
                  const photoPath = newFileList.map((file) => file.url);
                  // 將圖片地址儲存到fromData中
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
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleFormSubmit}
            >
              {t("submit")}
            </Button>
            <Button htmlType="reset"> {t("reset")}</Button>
          </Form.Item>
        </Form>
    </FoLayout>
  );
};

export default AddPost;
