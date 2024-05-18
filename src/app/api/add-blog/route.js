import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

const AddNewBlog = joi.object({
  title: joi.string.requried(),
  description: joi.string.requried(),
});

export async function POST(req) {
  try {
    await connectToDB();

    const extractBlogData = await req.json();
    const { title, description } = extractBlogData;

    const { error } = AddNewBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }
    const newelyCreateBlogItem = await Blog.create(extractBlogData);
    if (newelyCreateBlogItem) {
      return NextResponse.json({
        success: true,
        message: "Blog added sucessfully",
      });
    } else {
      return NextResponse.json({
        sucess: false,
        message: "something went wrong | please try again",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      sucess: false,
      message: "something went wrong | please try again",
    });
  }
}
