import "@/mock/mockServer";
import { useState, useEffect } from "react";
import { homeApi } from "@/api/module/home";
import { getCollection, setCollection, setPost } from "@/utils/localStorage";
import FoLayout from "@/components/FoLayout";
import FoArticles from "@/components/FoArticles";

const Home = () => {
  const [member, setMember] = useState(null);
  const [postData, setPostData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
        const data = await homeApi.getPostData();
        //2.存取狀態
        setPostData(data); //改變畫面狀態
        setPost(data);
      } catch (error) {}
    };

    getMember();
    getPost();
  }, []);
  const handleAddPost = (newData) => {
    //更新狀態  //4.響應式數據修改=>畫面重渲染
    setPostData([...postData, newData]);
  };

  //刪除
  const deletePost = (id) => {
    //1. 透過id刪除不要的數據
    const newPosts = postData.filter((post) => post.postID !== id);
    //2. 修改數據庫
    setPost(newPosts);
    //3. 畫面渲染
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
    //3. 畫面渲染
    setPostData(newPosts);
  };

  //搜尋
  const SearchPost = (e) => {
    //1. 先獲取關鍵字
    const keyword = e.target.value;
    setSearchValue(keyword);
    //2. 貼文的title是不是有包含關鍵字
    const filterPost = postData.filter((post) => post.title.includes(keyword));
    //3.直接渲染畫面
    setPostData(filterPost);
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
    } else {
      // 從收藏的資料庫刪除 ToDo:移除收藏成功
      const newCollection = collection.filter((post) => post.postID !== id);
      setCollection(newCollection);
    }
  };

  return (
    <FoLayout>
      <FoArticles
        data={postData}
        onDelete={deletePost}
        onEdit={editPost}
        onCollect={addToCollection}
      />
    </FoLayout>
  );
};
export default Home;
