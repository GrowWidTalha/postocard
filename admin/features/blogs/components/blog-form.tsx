"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Editor from "@/components/editor";
import { UploadDropzone } from "@/lib/uploadthing";
import { Spinner } from "@/components/spinner";
import { blogSchema, BlogFormProps, BlogFormData } from "../types/blog";

const BlogForm: React.FC<BlogFormProps> = ({ blog, onSubmit, isPending }) => {
  const router = useRouter();
  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: blog || {
      title: "",
      content: "",
      imageUrl: "",
      slug: "",
      published: false,
    },
  });

  const title = form.watch("title");

  useEffect(() => {
    const generateSlugFromTitle = () => {
      if (!blog) { // Only generate slug for new blogs
        const slug = title.toLowerCase().replace(/ /g, "-");
        form.setValue("slug", slug);
      }
    };

    generateSlugFromTitle();
  }, [title, form, blog]);

  const handleSubmit = (values: BlogFormData) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter blog title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  placeholder="URL-friendly title of your blog post"
                  {...field}
                  readOnly={!!blog} // Make slug readonly for existing blogs
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Editor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                      form.setValue("imageUrl", res[0].url);
                    }
                  }}
                />
              </FormControl>
              {field.value && (
                <img src={field.value || "/placeholder.svg"} alt="Blog cover" className="mt-2 max-w-xs rounded" />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Publish</FormLabel>
                <FormDescription>
                  Do you want to publish this blog immediately or save it as a draft?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending && <Spinner size="small" className="mr-2 text-white" />}
          {blog ? 'Update' : 'Create'} Blog
        </Button>
      </form>
    </Form>
  );
};

export default BlogForm;
