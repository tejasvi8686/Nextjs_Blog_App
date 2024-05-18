"use client ";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AddNewBlog({
  openBlogDialog,
  setOpenBlogDialog,
  loading,
  blogFormData,
  setBlogFormData,
  handleSaveBlogData,
}) {
  return (
    <>
      {" "}
      <div>
        <Button onClick={() => setOpenBlogDialog(true)}>Add New Blog</Button>
      </div>
      <Dialog open={openBlogDialog} onOpenChange={() => {
          setOpenBlogDialog(false);
          setBlogFormData({
            title: "",
            description: "",
          });
     
        }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Blog</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                name="title"
                placeholder="Enter blog title"
                value={blogFormData.title}
                onChange={(event) =>
                  setBlogFormData({
                    ...blogFormData,
                    title: event.target.value,
                  })
                }
                id="title"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Input
                name="description"
                value={blogFormData.description}
                onChange={(event) =>
                  setBlogFormData({
                    ...blogFormData,
                    description: event.target.value,
                  })
                }
                id="description"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveBlogData} type="button">
            {loading ? "Saving changes" : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>{" "}
    </>
  );
}

export default AddNewBlog;
