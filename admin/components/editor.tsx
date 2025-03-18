"use client"

import type React from "react"
import { useState } from "react"
import { useEditor, EditorContent, type Editor as EditorType } from "@tiptap/react"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    List,
    ListOrdered,
    Strikethrough,
    ImageIcon,
} from "lucide-react"
import { Toggle } from "./ui/toggle"
import { useUploadThing } from "@/lib/uploadthing"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const Editor = ({
    value,
    onChange,
}: {
    value: string
    onChange: (html: any) => void
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc ml-3",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal ml-3",
                    },
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight,
            Image.configure({
                HTMLAttributes: {
                    class: "rounded-lg max-w-full h-auto",
                },
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: "prose min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    const addImage = (url: string) => {
        if (editor) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    return (
        <div>
            <MenuBar editor={editor} addImage={addImage} />
            <EditorContent editor={editor} />
        </div>
    )
}

export default Editor

const MenuBar = ({
    editor,
    addImage,
}: {
    editor: EditorType | null
    addImage: (url: string) => void
}) => {
    if (!editor) return null

    const Options = [
        {
            icon: <Heading1 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            pressed: editor.isActive("heading", { level: 1 }),
        },
        {
            icon: <Heading2 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            pressed: editor.isActive("heading", { level: 2 }),
        },
        {
            icon: <Heading3 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            pressed: editor.isActive("heading", { level: 3 }),
        },
        {
            icon: <Bold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive("bold"),
        },
        {
            icon: <Italic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive("italic"),
        },
        {
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive("strike"),
        },
        {
            icon: <AlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            pressed: editor.isActive({ textAlign: "left" }),
        },
        {
            icon: <AlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            pressed: editor.isActive({ textAlign: "center" }),
        },
        {
            icon: <AlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            pressed: editor.isActive({ textAlign: "right" }),
        },
        {
            icon: <List className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive("bulletList"),
        },
        {
            icon: <ListOrdered className="size-4" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            pressed: editor.isActive("orderedList"),
        },
        {
            icon: <Highlighter className="size-4" />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            pressed: editor.isActive("highlight"),
        },
    ]

    return (
        <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2 z-50">
            {Options.map((option, index) => (
                <Toggle key={index} pressed={option.pressed} onPressedChange={option.onClick}>
                    {option.icon}
                </Toggle>
            ))}
            <ImageUploadButton addImage={addImage} />
        </div>
    )
}

const ImageUploadButton = ({ addImage }: { addImage: (url: string) => void }) => {
    const [isUploading, setIsUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const [isUrlPopoverOpen, setIsUrlPopoverOpen] = useState(false)

    const { startUpload } = useUploadThing("imageUploader")

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)

        try {
            const res = await startUpload([file])
            if (res?.[0]) {
                addImage(res[0].url)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsUploading(false)
        }
    }

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (imageUrl.trim()) {
            addImage(imageUrl)
            setImageUrl("")
            setIsUrlPopoverOpen(false)
        }
    }

    return (
        <div className="inline-flex">
            <Popover>
                <PopoverTrigger asChild>
                    <Toggle>
                        <ImageIcon className="size-4" />
                    </Toggle>
                </PopoverTrigger>
                <PopoverContent className="w-72">
                    <div className="space-y-4">
                        <h4 className="font-medium">Insert Image</h4>

                        <div>
                            <p className="text-sm mb-2">Upload from your device</p>
                            <label
                                htmlFor="image-upload"
                                className="flex items-center justify-center w-full h-9 px-4 py-2 text-sm font-medium text-center border rounded-md cursor-pointer bg-background hover:bg-accent"
                            >
                                {isUploading ? "Uploading..." : "Choose File"}
                            </label>
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handleFileChange}
                                disabled={isUploading}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm">Or insert from URL</p>
                            <form onSubmit={handleUrlSubmit} className="flex space-x-2">
                                <Input
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className="flex-1"
                                />
                                <Button type="submit" size="sm">
                                    Insert
                                </Button>
                            </form>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
