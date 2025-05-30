import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 5,
    },
    pdf: {
        maxFileCount: 1,
        maxFileSize: "1024MB",
    }
  })
    .onUploadComplete(async ({file }) => {

      console.log("file url", file.url);
      return { fileUrl: file.url, fileId: file.key };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
