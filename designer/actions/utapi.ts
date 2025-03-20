"use server"
import { UTApi } from "uploadthing/server";

const utapi = new UTApi()
export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file")
    if (!file || !(file instanceof File)) {
      return { error: "No file provided" }
    }

    const response = await utapi.uploadFiles([file])

    if (response[0]?.error) {
      return { error: response[0].error }
    }

    return {
      url: response[0].data.url,
      key: response[0].data.key,
    }
  } catch (error) {
    console.error("Error uploading file:", error)
    return { error: "Failed to upload file" }
  }
}
