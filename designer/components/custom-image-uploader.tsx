"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { uploadFile } from "@/actions/utapi"

interface CustomImageUploaderProps {
    value?: string
    uploadId?: string
    onChange: (url: string, uploadId: string) => void
    onRemove: () => void
    className?: string
}

export default function CustomImageUploader({
    value,
    uploadId,
    onChange,
    onRemove,
    className,
}: CustomImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (file: File) => {
        if (!file) return

        try {
            setIsUploading(true)

            // Create form data
            const formData = new FormData()
            formData.append("file", file)

            // Use the server action to upload the file
            const result = await uploadFile(formData)

            if (result.error) {
                console.log(result.error)
                // @ts-ignore
                throw new Error(result.error)
            }

            // Call onChange with the URL and upload ID
            console.log(result)
            onChange(result?.url!, result?.key!)
        } catch (error) {
            console.error("Error uploading file:", error)
        } finally {
            setIsUploading(false)
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0])
        }
    }

    const handleClick = () => {
        fileInputRef.current?.click()
    }
    console.log(value)
    return (
        <div className={cn("w-full", className)}>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        handleFileChange(e.target.files[0])
                    }
                }}
            />

            {value ? (
                <div className="relative ">
                    <div className="relative max-w-xs overflow-hidden rounded-md border">
                        <Image
                            src={value || "/placeholder.svg"}
                            alt="Uploaded image"
                            width={500} // 5 inches at 100dpi
                            height={700} // 7 inches at 100dpi
                            className="object-cover "
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute right-2 top-2 h-7 w-7 rounded-full"
                            onClick={onRemove}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={handleClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                        "flex flex-col items-center justify-center rounded-md border border-dashed p-6 transition-colors",
                        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
                        isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-muted/50",
                    )}
                >
                    <div className="flex flex-col items-center justify-center gap-1 text-center">
                        <Upload className="h-10 w-10 text-muted-foreground" />
                        <p className="text-sm font-medium">{isUploading ? "Uploading..." : "Drag & drop or click to upload"}</p>
                        <p className="text-xs text-muted-foreground">Supported formats: JPEG, PNG, WebP</p>
                    </div>
                </div>
            )}
        </div>
    )
}
