// components/CustomFileUpload.tsx
import React, { useState } from "react";

type CustomFileUploadProps = {
  onUploadComplete: (result: { url: string; uploadId: string }) => void;
  accept?: string;
};

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({ onUploadComplete, accept }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview for images
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload"); // Update with your actual upload endpoint

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
      }
    };

    xhr.onload = () => {
      setUploading(false);
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        // Expect response: { url: string, uploadId: string }
        onUploadComplete({ url: response.url, uploadId: response.uploadId });
      } else {
        console.error("Upload failed", xhr.responseText);
      }
    };

    xhr.onerror = () => {
      setUploading(false);
      console.error("Upload error");
    };

    setUploading(true);
    xhr.send(formData);
  };

  return (
    <div className="border p-2 rounded">
      <input type="file" accept={accept} onChange={handleFileChange} />
      {uploading && <div>Uploading: {uploadProgress}%</div>}
      {preview && (
        <div className="mt-2">
          <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded" />
        </div>
      )}
    </div>
  );
};

export default CustomFileUpload;
