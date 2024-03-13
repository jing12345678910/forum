import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  // navigate(`./post/${id}`);

  return <div>Post</div>;
};

export default Post;
