import "@/mock/mockServer";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { homeApi } from "@/api/module/home";
import { getCollection, setCollection, setPost } from "@/utils/localStorage";
import FoLayout from "@/components/FoLayout";
import FoArticles from "@/components/FoArticles";
import { useTranslation } from "react-i18next";
import { message } from "antd";

const Home = () => {
  const [postData, setPostData] = useState([]);
  const location = useLocation(); // 獲取當前路徑
  const [page, setPage] = useState(1);
  const perPage = 10;
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState(""); // 搜尋關鍵字
  const [filteredPostData, setFilteredPostData] = useState([]);
  const [classifiedPostData, setClassifiedPostData] = useState([]);
  const [collect, setCollect] = useState(getCollection());
  const [loading, setLoading] = useState(false); // 加載更多資料狀態
  const warning = () => {
    message.warning(t("NoPostsFound"));
  };

  // 加載更多貼文
  const loadMoreData = async () => {
    setLoading(true); // 設置載入中狀態為true
    try {
      // 模擬 API 請求延遲 10 秒
      await new Promise((resolve) => setTimeout(resolve, 10000));
      // 獲取更多貼文
      const moreData = await homeApi.getPostDataBy10(page + 1, perPage);
      if (moreData && moreData.length > 0) {
        // 將獲取的資料加到先前資料中
        setPostData((prevData) => [...prevData, ...moreData]);
        // 更新頁碼
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // 結束載入，設置為false
    }
  };

  // 初始化時獲取第一頁資料
  useEffect(() => {
    const getInitialData = async () => {
      try {
        const data = await homeApi.getPostDataByPage(1, perPage);
        setPostData(data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    getInitialData();
  }, []);

  // 監聽滾動事件
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight >= documentHeight && !loading) {
        setPage((prevPage) => prevPage + 1);
        loadMoreData();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page]);

  // 獲取貼文資料並存儲到本地
  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await homeApi.getPostDataBy10(1, perPage);
        setPostData(data);
        setPost(data);
      } catch (error) {}
    };
    getPost();
  }, []);

  // 根據頁碼和每頁顯示數量獲取貼文資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await homeApi.getPostDataBy10(page, perPage);
        setPostData(data);
        setPost(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [page]);

  // 根據 URL 查詢參數決定是否獲取第一頁資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const page1 = params.get("page") === "page1";
        const data = await homeApi.getPostDataBy10(page1 ? 1 : page, perPage);
        setPostData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [location.search, page, perPage]);

  // 新增貼文
  const handleAddPost = (newData) => {
    setPostData([...postData, newData]);
  };

  // 刪除貼文
  const deletePost = (id) => {
    const newPosts = postData.filter((post) => post.postID !== id);
    setPost(newPosts);
    setPostData(newPosts);
  };

  // 修改貼文
  const editPost = (id) => {
    const newPosts = postData.map((post) => {
      if (post.postID === id) {
        post.overview = "這是被編輯過後的文章概覽";
        return post;
      }
      return post;
    });
    setPost(newPosts);
    setPostData(newPosts);
  };

  // 搜尋貼文
  const SearchPost = (keyword) => {
    const filterPost = postData.filter((post) => post.title.includes(keyword));
    setFilteredPostData(filterPost);
  };

  // 加載更多貼文
  const morePosts = async () => {
    try {
      const data = await homeApi.getPostDataBy10(page + 1, perPage);
      if (data && data.length > 0) {
        setPostData((prevData) => [...prevData, ...data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  // 依照主題過濾貼文
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

  // 收藏貼文
  const addToCollection = (id) => {
    const collection = getCollection() || [];
    const check = collection.every((post) => post.postID !== id);
    const selectPost = postData.find((post) => post.postID === id);
    if (check) {
      setCollection([...collection, selectPost]);
      setCollect([...collection, selectPost]);
    } else {
      const newCollection = collection.filter((post) => post.postID !== id);
      setCollection(newCollection);
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
      <div className="morePosts">
        <button onClick={morePosts}>更多貼文</button>
      </div>
    </FoLayout>
  );
};
export default Home;
