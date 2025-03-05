import { create } from "zustand"
import { persist } from "zustand/middleware"

interface DesignState {
  pageIndex: number
  inputText: string
  fromText: string // New field
  toText: string // New field
  canvasData: string | null
  setPageIndex: (index: number) => void
  setInputText: (text: string) => void
  setFromText: (text: string) => void // New setter
  setToText: (text: string) => void // New setter
  setCanvasData: (data: string | null) => void
  resetDesignStore: () => void
}

export const useDesignStore = create<DesignState>()(
  persist(
    (set) => ({
      pageIndex: 0,
      inputText: "",
      fromText: "", // Initialize new field
      toText: "", // Initialize new field
      canvasData: null,
      setPageIndex: (index) => set({ pageIndex: index }),
      setInputText: (text) => set({ inputText: text }),
      setFromText: (text) => set({ fromText: text }), // New setter
      setToText: (text) => set({ toText: text }), // New setter
      setCanvasData: (data) => set({ canvasData: data }),
      resetDesignStore: () => set({
        pageIndex: 0,
        inputText: "",
        fromText: "",
        toText: "",
        canvasData: null
      }),
    }),
    {
      name: "design-storage",
    },
  ),
)

