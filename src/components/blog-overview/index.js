"use client";
import { useState } from "react";
import AddNewBlog from "../add-new-blog";

const initialBlogFormData = {
  title: " ",
  description: "",
};

function BlogOverview() {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);

  console.log(blogFormData);

  async function handleSaveBlogData() {
    try {
      const apiResponse = await fetch("/api/add-blog", {
        method: "POST",
        body: JSON.stringify(blogFormData),
      });
      const result = await apiResponse.json()
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setBlogFormData(initialBlogFormData);
    }
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-pink-500 to-blue-600 p-6">
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
      />
      <div>Blog List Section</div>
    </div>
  );
}

export default BlogOverview;
