import { create } from "zustand"
import { persist } from "zustand/middleware"

interface DesignState {
  pageIndex: number
  inputText: string
  canvasData: string | null
  setPageIndex: (index: number) => void
  setInputText: (text: string) => void
  setCanvasData: (data: string | null) => void
}

export const useDesignStore = create<DesignState>()(
  persist(
    (set) => ({
      pageIndex: 0,
      inputText: "",
      canvasData: null,
      setPageIndex: (index) => set({ pageIndex: index }),
      setInputText: (text) => set({ inputText: text }),
      setCanvasData: (data) => set({ canvasData: data }),
    }),
    {
      name: "design-storage",
    },
  ),
)
