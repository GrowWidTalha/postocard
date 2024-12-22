"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "../schemas";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/lib/uploadthing";
import { Switch } from "@/components/ui/switch";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { createBlog } from "../actions/blogs.actions";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";

const CreateBlogForm = () => {
  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
      slug: "",
      published: false,
    },
  });
  const queryClient = new QueryClient();
  const router = useRouter();
  const title = form.watch("title");

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof blogSchema>) => {
      const res = await createBlog({
        title: values.title,
        content: values.content,
        imageUrl: values.imageUrl,
        slug: values.slug,
        author: "Daniel",
        published: values.published,
      });

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      router.push("/blogs");
    },
  });
// TODO: Fix the publish toggle bug
  useEffect(() => {
    const generateSlugFromTitle = () => {
      const slug = title.toLowerCase().replace(/ /g, "-");
      form.setValue("slug", slug);
    };

    generateSlugFromTitle();
  }, [title, form]);

  const onSubmit = (values: z.infer<typeof blogSchema>) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onChange={() => console.log(form.getValues("content"))}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Daniel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* TODO: Add froala editor */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  placeholder="Url friendly title of your blog post."
                  {...field}
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
                  endpoint={"imageUploader"}
                  onClientUploadComplete={(url) => {
                    form.setValue("imageUrl", url[0]?.url!);
                    console.log(url);
                  }}
                />
              </FormControl>
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
                  Do you want to publish this blog immedietely or save it as a
                  draft?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(value) => {
                    field.onChange(value);
                    console.log(value);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending && <Spinner size={"small"} className="text-white" />}
          Create Blog
        </Button>
      </form>
    </Form>
  );
};

export default CreateBlogForm;
