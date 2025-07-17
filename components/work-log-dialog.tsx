"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Save, X, Upload, ImageIcon, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { useWorkLogStore } from "../store/worklog-store"

export function WorkLogDialog() {
  const {
    isCreateDialogOpen,
    editingLog,
    formTitle,
    formContent,
    formTags,
    formDate,
    setIsCreateDialogOpen,
    setEditingLog,
    setFormTitle,
    setFormContent,
    setFormTags,
    setFormDate,
    createWorkLog,
    updateWorkLog,
    resetForm,
  } = useWorkLogStore()
  
  const [selectedImages, setSelectedImages] = useState<string[]>(editingLog?.images || [])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  
  const isEditing = !!editingLog

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files)
      setImageFiles(prev => [...prev, ...newFiles])
      
      // Convert files to base64 for preview (you might want to handle this differently in production)
      newFiles.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setSelectedImages(prev => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
    setImageFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    // In a real app, you'd upload the image files to a server here
    // For now, we'll pass the base64 strings
    const logData = {
      images: selectedImages
    }
    
    if (isEditing) {
      updateWorkLog(logData)
    } else {
      createWorkLog(logData)
    }
  }

  const handleClose = () => {
    if (isEditing) {
      setEditingLog(null)
    } else {
      setIsCreateDialogOpen(false)
    }
    setSelectedImages([])
    setImageFiles([])
    resetForm()
  }

  return (
    <Dialog open={isCreateDialogOpen || isEditing} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Work Log" : "Create New Work Log"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update your work log entry" : "Document what you accomplished today"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="What did you work on?"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="content">Description</Label>
            <Textarea
              id="content"
              placeholder="Describe what you accomplished, challenges faced, solutions implemented..."
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              rows={6}
            />
          </div>
          
          {/* Image Upload Section */}
          <div>
            <Label>Images</Label>
            <div className="mt-2 space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <Label
                  htmlFor="images"
                  className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Choose Images
                </Label>
                <span className="text-sm text-gray-500">
                  {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              
              {/* Image Preview Grid */}
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center pointer-events-none">
                        <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formDate, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={formDate} onSelect={(date) => date && setFormDate(date)} />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="e.g. bug-fix, feature, database"
                value={formTags}
                onChange={(e) => setFormTags(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleClose}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-gradient-to-r from-emerald-600 to-blue-600">
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? "Update Log" : "Create Log"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}