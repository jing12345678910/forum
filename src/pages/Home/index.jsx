import "@/mock/mockServer";
import { useState, useEffect } from "react";
import { homeApi } from "@/api/module/home";
import { getCollection, setCollection, setPost } from "@/utils/localStorage";
import FoLayout from "@/components/FoLayout";
import FoArticles from "@/components/FoArticles";
import { useTranslation } from "react-i18next";
import { message } from "antd";

const Home = () => {
  const { t } = useTranslation();
  const [member, setMember] = useState(null);
  const [postData, setPostData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredPostData, setFilteredPostData] = useState([]);
  const [classifiedPostData, setClassifiedPostData] = useState([]);
  const [collect, setCollect] = useState(getCollection());
  const warning = () => {
    message.warning(t("NoPostsFound"));
  };
  useEffect(() => {
    const getMember = async () => {
      try {
        const data = await homeApi.getMember();
        setMember(data);
      } catch (error) {}
    };
    const getPost = async () => {
      //1.拿API資料
      try {
        const postData = await homeApi.getPostData();
        //2.存取狀態到postData(改變畫面狀態)
        setPostData(postData);
        //3. 將貼文資料儲存到本地儲存庫
        setPost(postData);
      } catch (error) {}
    };

    getMember();
    getPost();
  }, []);
  const handleAddPost = (newData) => {
    //存取狀態到postData(響應式數據修改=>畫面重渲染)
    setPostData([...postData, newData]);
  };

  //刪除
  const deletePost = (id) => {
    //1. 透過id刪除不要的數據
    const newPosts = postData.filter((post) => post.postID !== id);
    //2. 修改數據庫
    setPost(newPosts);
    //3. 存取狀態到postData(響應式數據修改=>畫面重渲染)
    setPostData(newPosts);
  };

  //修改
  const editPost = (id) => {
    const newPosts = postData.map((post) => {
      //1. 先"找到"是哪一篇貼文要被修改
      if (post.postID === id) {
        post.overview = "這是被編輯過後的文章概覽";
        //回傳修改的值
        return post;
      }
      //回傳原資料
      return post;
    });
    //2. 修改數據庫
    setPost(newPosts);
    //3. 存取狀態到postData(響應式數據修改=>畫面重渲染)
    setPostData(newPosts);
  };

  //搜尋
  const SearchPost = (keyword) => {
    //1. 貼文的title是不是有包含關鍵字;
    const filterPost = postData.filter((post) => post.title.includes(keyword));
    //2. 將過濾後的貼文儲存到filteredPostData狀態，更新狀態後，React自動重新渲染，不需要setPostData(filterPost)
    setFilteredPostData(filterPost);
  };

  //依照主題過濾貼文
  const PostsByTopic = (topic) => {
    const classifiedPost = postData.filter((post) => post.topic === topic);
    setClassifiedPostData(classifiedPost);
    if (classifiedPost.length === 0) {
      warning();
    }
  };
  const onTopicSelect = (topic) => {
    PostsByTopic(topic);
  };

  //收藏
  const addToCollection = (id) => {
    //1. 讀取資料庫 獲取收藏資料
    const collection = getCollection() || [];
    //2. 這個id是否被收藏
    const check = collection.every((post) => post.postID !== id);
    //3. 透過id知道哪筆資料要被收藏
    const selectPost = postData.find((post) => post.postID === id);
    if (check) {
      // 新增到收藏的資料庫 ToDo:收藏成功
      setCollection([...collection, selectPost]);
      //更新collect狀態
      setCollect([...collection, selectPost]);
    } else {
      // 從收藏的資料庫刪除 ToDo:移除收藏成功
      const newCollection = collection.filter((post) => post.postID !== id);
      setCollection(newCollection);
      //更新clollect狀態
      setCollect(newCollection);
    }
  };

  return (
    <FoLayout
      SearchPost={SearchPost}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      onTopicSelect={onTopicSelect}
    >
      <FoArticles
        //顯示過濾的貼文
        data={
          filteredPostData.length > 0
            ? filteredPostData
            : classifiedPostData.length > 0
            ? classifiedPostData
            : postData
        }
        onDelete={deletePost}
        onEdit={editPost}
        onCollect={addToCollection}
        collect={collect}
        setCollect={setCollect}
      />
    </FoLayout>
  );
};
export default Home;
