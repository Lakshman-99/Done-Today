import { create } from "zustand"
import { isWithinInterval } from "date-fns"

export interface WorkLog {
  id: number
  date: Date
  title: string
  content: string
  tags: string[]
  images: string[]
  createdAt: Date
}

interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

interface WorkLogStore {
  // State
  workLogs: WorkLog[]
  dateRange: DateRange
  filterTag: string
  searchQuery: string
  isCreateDialogOpen: boolean
  editingLog: WorkLog | null
  userRole: "creator" | "viewer"

  // Form state
  formTitle: string
  formContent: string
  formTags: string
  formDate: Date

  // Actions
  setDateRange: (range: DateRange) => void
  setFilterTag: (tag: string) => void
  setSearchQuery: (query: string) => void
  setIsCreateDialogOpen: (open: boolean) => void
  setEditingLog: (log: WorkLog | null) => void
  setFormTitle: (title: string) => void
  setFormContent: (content: string) => void
  setFormTags: (tags: string) => void
  setFormDate: (date: Date) => void

  // Work log operations
  createWorkLog: () => void
  updateWorkLog: () => void
  deleteWorkLog: (id: number) => void
  resetForm: () => void
  clearDateRange: () => void

  // Computed
  getFilteredLogs: () => WorkLog[]
  getAllTags: () => string[]
}

// Mock data
const mockWorkLogs: WorkLog[] = [
  {
    id: 1,
    date: new Date(2024, 0, 15),
    title: "Database Optimization",
    content:
      "Spent the morning optimizing our user queries. Reduced response time by 40% by adding proper indexes and restructuring some complex joins. Also fixed a memory leak in the connection pool.",
    tags: ["database", "performance", "bug-fix"],
    images: ["/placeholder.svg?height=200&width=300","/placeholder.svg?height=200&width=300","/placeholder.svg?height=200&width=300"],
    createdAt: new Date(2024, 0, 15, 14, 30),
  },
  {
    id: 2,
    date: new Date(2024, 0, 14),
    title: "API Integration & Testing",
    content:
      "Integrated the new payment gateway API. Had to handle some edge cases with webhook validation. Wrote comprehensive tests and updated documentation. The integration is now live and working smoothly.",
    tags: ["api", "integration", "testing"],
    images: [],
    createdAt: new Date(2024, 0, 14, 16, 45),
  },
  {
    id: 3,
    date: new Date(2024, 0, 13),
    title: "UI/UX Improvements",
    content:
      "Redesigned the user dashboard based on feedback. Improved the navigation flow and added dark mode support. Users are loving the new interface!",
    tags: ["frontend", "ui-ux", "feature"],
    images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300","/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    createdAt: new Date(2024, 0, 13, 11, 20),
  },
  {
    id: 4,
    date: new Date(2024, 0, 12),
    title: "Code Review & Refactoring",
    content:
      "Reviewed pull requests from the team and refactored some legacy code. Improved code quality and maintainability.",
    tags: ["code-review", "refactoring"],
    images: [],
    createdAt: new Date(2024, 0, 12, 10, 15),
  },
  {
    id: 5,
    date: new Date(2024, 0, 11),
    title: "Meeting & Planning",
    content: "Sprint planning meeting and discussed upcoming features. Estimated tasks and assigned responsibilities.",
    tags: ["meeting", "planning"],
    images: [],
    createdAt: new Date(2024, 0, 11, 9, 30),
  },
]

export const useWorkLogStore = create<WorkLogStore>((set, get) => ({
  // Initial state
  workLogs: mockWorkLogs,
  dateRange: { from: undefined, to: undefined },
  filterTag: "all",
  searchQuery: "",
  isCreateDialogOpen: false,
  editingLog: null,
  userRole: "creator",

  // Form state
  formTitle: "",
  formContent: "",
  formTags: "",
  formDate: new Date(),

  // Actions
  setDateRange: (range) => set({ dateRange: range }),
  setFilterTag: (tag) => set({ filterTag: tag }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setIsCreateDialogOpen: (open) => set({ isCreateDialogOpen: open }),
  setEditingLog: (log) => {
    if (log) {
      set({
        editingLog: log,
        formTitle: log.title,
        formContent: log.content,
        formTags: log.tags.join(", "),
        formDate: log.date,
      })
    } else {
      set({ editingLog: log })
    }
  },
  setFormTitle: (title) => set({ formTitle: title }),
  setFormContent: (content) => set({ formContent: content }),
  setFormTags: (tags) => set({ formTags: tags }),
  setFormDate: (date) => set({ formDate: date }),

  // Work log operations
  createWorkLog: () => {
    const { formTitle, formContent, formTags, formDate, workLogs } = get()
    if (!formTitle.trim() || !formContent.trim()) return

    const newLog: WorkLog = {
      id: Date.now(),
      date: formDate,
      title: formTitle,
      content: formContent,
      tags: formTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      images: [],
      createdAt: new Date(),
    }

    set({
      workLogs: [newLog, ...workLogs],
      isCreateDialogOpen: false,
    })
    get().resetForm()
  },

  updateWorkLog: () => {
    const { editingLog, formTitle, formContent, formTags, formDate, workLogs } = get()
    if (!editingLog || !formTitle.trim() || !formContent.trim()) return

    const updatedLogs = workLogs.map((log) =>
      log.id === editingLog.id
        ? {
            ...log,
            title: formTitle,
            content: formContent,
            tags: formTags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
            date: formDate,
          }
        : log,
    )

    set({
      workLogs: updatedLogs,
      editingLog: null,
    })
    get().resetForm()
  },

  deleteWorkLog: (id) => {
    const { workLogs } = get()
    set({ workLogs: workLogs.filter((log) => log.id !== id) })
  },

  resetForm: () =>
    set({
      formTitle: "",
      formContent: "",
      formTags: "",
      formDate: new Date(),
    }),

  clearDateRange: () => set({ dateRange: { from: undefined, to: undefined } }),

  // Computed
  getFilteredLogs: () => {
    const { workLogs, dateRange, filterTag, searchQuery } = get()

    return workLogs.filter((log) => {
      const matchesSearch =
        log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.content.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTag = filterTag === "all" || log.tags.includes(filterTag)

      let matchesDate = true
      if (dateRange.from && dateRange.to) {
        matchesDate = isWithinInterval(log.date, { start: dateRange.from, end: dateRange.to })
      } else if (dateRange.from) {
        matchesDate = log.date >= dateRange.from
      } else if (dateRange.to) {
        matchesDate = log.date <= dateRange.to
      }

      return matchesSearch && matchesTag && matchesDate
    })
  },

  getAllTags: () => {
    const { workLogs } = get()
    return Array.from(new Set(workLogs.flatMap((log) => log.tags)))
  },
}))
