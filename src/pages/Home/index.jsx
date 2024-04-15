import "@/mock/mockServer";
import { useState, useEffect } from "react";
import { getCollection, setCollection, setPost, getPost } from "@/utils/localStorage";
import FoLayout from "@/components/FoLayout";
import FoArticles from "@/components/FoArticles";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useAppStore } from "../../store/AppStore";
import { Pagination } from "antd";

const Home = () => {
  const perPage = 10
  const { setPosts, posts } = useAppStore()
  const { t } = useTranslation();
  const [postData, setPostData] = useState(getPost());
  const [searchValue, setSearchValue] = useState(""); // 搜尋關鍵字
  const [filteredPostData, setFilteredPostData] = useState([]);
  const [classifiedPostData, setClassifiedPostData] = useState([]);
  const [collect, setCollect] = useState(getCollection());
  const [pageSize, setPageSize] = useState(getPost().length);
  const [loading, setLoading] = useState(false); // 加載更多資料狀態
  const warning = () => {
    message.warning(t("NoPostsFound"));
  };
  const fetchData = (page) => {
    setLoading(true);
    const data = filteredPostData.length ? filteredPostData : getPost();
    if (data.length) {
      // 根據頁碼和每頁數量計算貼文的起始和結束索引
      const start = (page - 1) * perPage;
      const end = start + perPage;
      // 從貼文資料中獲取指定範圍的貼文資料
      const posts = data.slice(start, end);
      setPageSize(posts.length)
      setPostData(posts)
    }
    setLoading(false);
  };
  const handlePaginationChange = (page) => {
    fetchData(page)
  }

  // 根據頁碼和每頁顯示數量獲取貼文資料
  useEffect(() => {
    if (!postData.length) {
      setPosts()
    }
  }, []);

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
    if (!filterPost.length) {
      setPageSize(getPost().length);
      return;
    }
    setPageSize(filterPost.length);
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
      <Pagination
        defaultCurrent={1}
        pageSize={10}
        onChange={handlePaginationChange}
        total={pageSize}
      />
    </FoLayout>
  );
};
export default Home;
