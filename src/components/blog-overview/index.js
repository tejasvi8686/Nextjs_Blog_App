"use client";
import { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/router";

const initialBlogFormData = {
  title: " ",
  description: "",
};

function BlogOverview({ blogList }) {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);


  const router = useRouter();

  useEffect(()=> {
    router.refresh();
  }, [])

  console.log(blogFormData);

  async function handleSaveBlogData() {
    try {
      setLoading(true);
  
      const response = await fetch("/api/add-blog", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogFormData),
      });
  
      const result = await response.json();
      console.log(result);
  
      if (result?.success) {
        setBlogFormData(initialBlogFormData);
        setOpenBlogDialog(false);
        setLoading(false);
      } else {
        // Handle the case where the result is not successful
        console.log('Error:', result.message || 'Unknown error');
      }
  
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
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
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogList && blogList.length > 0 ? (
          blogList.map((blogItem) => (
            <Card className="p-5">
              <CardContent>
                <CardTitle className="mb-5">{blogItem?.title}</CardTitle>
                <CardDescription>{blogItem?.description}</CardDescription>
                <div className="mt-5 flex gap-5  items-center">
                  <Button onClick={() => handleEdit(blogItem)}>Edit</Button>
                  <Button onClick={() => handleDeleteBlogByID(blogItem._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label className="text-3xl font-extrabold">
            No Blog found! Please add one
          </Label>
        )}
      </div>
    </div>
  );
}

export default BlogOverview;
