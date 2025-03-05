"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import type { Design } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, ShoppingBasket } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useDesignStore } from "@/hooks/store"
import { useCartStore } from "@/hooks/useCart"
import { useRouter } from "next/navigation"

// ===== Utility Functions =====
const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) => {
  const words = text.split(" ")
  let line = ""
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " "
    const metrics = ctx.measureText(testLine)
    const testWidth = metrics.width
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y)
      line = words[n] + " "
      y += lineHeight
    } else {
      line = testLine
    }
  }
  ctx.fillText(line, x, y)
}

const drawTiltedText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  label: string,
  x: number,
  y: number,
  angle: number,
) => {
  ctx.save()

  // Draw the label first
  ctx.font = "italic 12px Georgia"
  ctx.fillStyle = "#666666"
  ctx.textAlign = "left"
  ctx.textBaseline = "bottom"

  // Position the label slightly above the text
  const labelX = x - 20
  const labelY = y - 10
  ctx.fillText(label, labelX, labelY)

  // Draw the main text
  ctx.translate(x, y)
  ctx.rotate(angle)
  ctx.font = "italic 16px Georgia"
  ctx.fillStyle = "#000000"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text, 0, 0)

  ctx.restore()
}

// ===== Header Component =====
const Header = () => {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      <Link href="/">
        <img src="/4.jpg" alt="PostoCard Logo" className="w-[40px] h-[40px] cursor-pointer" />
      </Link>
      <h1 className="text-4xl font-bold text-yellow-500 font-serif">PostoCard</h1>
    </div>
  )
}

// ===== Canvas Component =====
type CanvasProps = {
  design: Design
  pageIndex: number
  inputText: string
  fromText: string
  toText: string
  canvasData: string | null
  setCanvasData: (data: string | null) => void
}

const DesignCanvas = ({ design, pageIndex, inputText, fromText, toText, canvasData, setCanvasData }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear the canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Variables for text drawing
    ctx.font = "italic 20px Georgia"
    ctx.fillStyle = "#000000"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    const margin = 20
    const maxWidth = canvas.width - 2 * margin
    const lineHeight = 24
    const x = canvas.width / 2
    const y = canvas.height / 2

    if (pageIndex === 1) {
      // Page 1: Draw the background image then add text
      const img = new Image()
      img.src = design.pdfLink || "/placeholder.svg"
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        wrapText(ctx, inputText, x, y, maxWidth, lineHeight)
        const newCanvasData = canvas.toDataURL()
        if (newCanvasData !== canvasData) {
          setCanvasData(newCanvasData)
        }
      }
    } else if (pageIndex === 2) {
      // Page 2: Plain white background with text
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Reset text fillStyle after background fill
      ctx.fillStyle = "#000000"

      // Draw the main text in the center
      ctx.font = "italic 20px Georgia"
      wrapText(ctx, inputText, x, y, maxWidth, lineHeight)

      // Draw "From" text in top left with tilt
      if (fromText) {
        drawTiltedText(
          ctx,
          fromText,
          "From:",
          60,
          40,
          -Math.PI / 12, // Reduced angle for better readability (about 15 degrees)
        )
      }

      // Draw "To" text in bottom right with tilt
      if (toText) {
        drawTiltedText(
          ctx,
          toText,
          "To:",
          canvas.width - 60,
          canvas.height - 40,
          -Math.PI / 12, // Same downward tilt as the "From" text
        )
      }

      const newCanvasData = canvas.toDataURL()
      if (newCanvasData !== canvasData) {
        setCanvasData(newCanvasData)
      }
    } else {
      // For other pages (if needed), simply fill a neutral background.
      ctx.fillStyle = "#eee"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      const newCanvasData = canvas.toDataURL()
      if (newCanvasData !== canvasData) {
        setCanvasData(newCanvasData)
      }
    }
  }, [pageIndex, inputText, fromText, toText, design, canvasData, setCanvasData])

  return (
    <canvas ref={canvasRef} width={300} height={420} className="w-full h-full border-4 border-dotted border-pink-200" />
  )
}

// ===== Page Content Component =====
type PageContentProps = {
  pageIndex: number
  design: Design
  inputText: string
  fromText: string
  toText: string
  canvasData: string | null
  setCanvasData: (data: string | null) => void
}

const PageContent = ({
  pageIndex,
  design,
  inputText,
  fromText,
  toText,
  canvasData,
  setCanvasData,
}: PageContentProps) => {
  switch (pageIndex) {
    case 0:
      return (
        <img src={design.thumbnailUrl || "/placeholder.svg"} alt="Thumbnail" className="w-full h-full object-contain" />
      )
    case 1:
      return (
        <img src={design.pdfLink || "/placeholder.svg"} alt="Design PDF" className="w-full h-full object-contain" />
      )
    case 2:
      return (
        <DesignCanvas
          design={design}
          pageIndex={pageIndex}
          inputText={inputText}
          fromText={fromText}
          toText={toText}
          canvasData={canvasData}
          setCanvasData={setCanvasData}
        />
      )
    case 3:
      return (
        <div className="flex flex-col items-center">
          <img src="/last-page.jpg" alt="Static Design" className="w-full h-full object-contain" />
        </div>
      )
    default:
      return null
  }
}

// ===== Navigation Controls Component =====
type NavigationProps = {
  pageIndex: number
  inputText: string
  fromText: string
  toText: string
  handlePrev: () => void
  handleNext: () => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFromChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleToChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAddToCart: () => void
}

const NavigationControls = ({
  pageIndex,
  inputText,
  fromText,
  toText,
  handlePrev,
  handleNext,
  handleInputChange,
  handleFromChange,
  handleToChange,
  handleAddToCart,
}: NavigationProps) => {
  return (
    <div className="w-full md:w-auto flex flex-col items-center space-y-4">
      {/* Navigation Controls */}
      <div className="flex items-center justify-between w-full md:w-auto md:space-x-4">
        <Button
          onClick={handlePrev}
          disabled={pageIndex === 0}
          variant="outline"
          size="icon"
          className="bg-pink-100 hover:bg-pink-200 text-pink-500 border-pink-300 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex-grow md:w-[200px] mx-4">
          <AnimatePresence mode="wait">
            {pageIndex === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <Input
                  type="text"
                  placeholder="Type your text..."
                  value={inputText}
                  onChange={handleInputChange}
                  className="w-full border-pink-200 focus:ring-pink-500 focus:border-pink-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="text"
                    placeholder="From..."
                    value={fromText}
                    onChange={handleFromChange}
                    className="w-full border-pink-200 focus:ring-pink-500 focus:border-pink-500"
                  />
                  <Input
                    type="text"
                    placeholder="To..."
                    value={toText}
                    onChange={handleToChange}
                    className="w-full border-pink-200 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button
          onClick={handleNext}
          hidden={pageIndex === 3}
          variant="outline"
          size="icon"
          className={`bg-pink-100 hover:bg-pink-200 text-pink-500 border-pink-300 transition-colors ${pageIndex === 3 && "hidden"} `}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          onClick={handleAddToCart}
          variant="outline"
          className="bg-pink-100 hover:bg-pink-200 text-pink-500 border-pink-300 transition-colors"
        >
          <ShoppingBasket className="h-4 w-4" />
          Add to cart
        </Button>
      </div>

      {/* Page indicator */}
      <PageIndicator pageIndex={pageIndex} />
    </div>
  )
}

// ===== Page Indicator Component =====
const PageIndicator = ({ pageIndex }: { pageIndex: number }) => {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2, 3].map((idx) => (
        <motion.div
          key={idx}
          className={cn(
            "w-2 h-2 rounded-full transition-colors duration-300",
            pageIndex === idx ? "bg-pink-500" : "bg-pink-200",
          )}
          whileHover={{ scale: 1.2 }}
        />
      ))}
    </div>
  )
}

// ===== Main Component =====
const DesignPageClient = ({ design }: { design: Design }) => {
  const {
    pageIndex,
    inputText,
    fromText,
    toText,
    canvasData,
    setPageIndex,
    setInputText,
    setFromText,
    setToText,
    setCanvasData,
  } = useDesignStore()

  const addItemToCart = useCartStore((state) => state.addItem)
  const router = useRouter()

  const handleNext = () => {
    if (pageIndex < 3) setPageIndex(pageIndex + 1)
  }

  const handlePrev = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
    // Clear stored canvas data when text changes so it redraws
    setCanvasData(null)
  }

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromText(e.target.value)
    // Clear stored canvas data when text changes so it redraws
    setCanvasData(null)
  }

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToText(e.target.value)
    // Clear stored canvas data when text changes so it redraws
    setCanvasData(null)
  }

  const handleAddToCart = () => {
    // Add the whole design object to the cart along with the custom text
    addItemToCart({
      ...design,
      customText: inputText,
      fromText: fromText,
      toText: toText,
      quantity: 1,
      price: 5,
    })
    // Redirect to the /cart route
    router.push("/cart")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-yellow-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Logo and Header */}
        <Header />

        <div className="flex flex-col items-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">{design.name}</h2>

          <div className="w-full flex flex-col md:flex-col md:items-center md:justify-center gap-6 md:gap-12">
            {/* Card Container */}
            <Card className="w-full md:w-[280px] lg:w-[320px] mx-auto shadow-2xl hover:shadow-3xl transition-shadow">
              <CardContent className="p-0">
                <motion.div className="relative overflow-hidden rounded-lg bg-white" style={{ aspectRatio: "5 / 7" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={pageIndex}
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: -90 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="w-full h-full"
                    >
                      <PageContent
                        pageIndex={pageIndex}
                        design={design}
                        inputText={inputText}
                        fromText={fromText}
                        toText={toText}
                        canvasData={canvasData}
                        setCanvasData={setCanvasData}
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </CardContent>
            </Card>

            {/* Controls Container */}
            <NavigationControls
              pageIndex={pageIndex}
              inputText={inputText}
              fromText={fromText}
              toText={toText}
              handlePrev={handlePrev}
              handleNext={handleNext}
              handleInputChange={handleInputChange}
              handleFromChange={handleFromChange}
              handleToChange={handleToChange}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignPageClient

