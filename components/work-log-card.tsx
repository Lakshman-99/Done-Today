"use client"
import React, { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Edit3, Trash2, ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react"
import { format } from "date-fns"
import { useWorkLogStore, type WorkLog } from "../store/worklog-store"

interface WorkLogCardProps {
  log: WorkLog
}

export function WorkLogCard({ log }: WorkLogCardProps) {
  const { userRole, setEditingLog, deleteWorkLog } = useWorkLogStore()
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollImages = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      const currentScroll = scrollContainerRef.current.scrollLeft
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      })
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{log.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                {format(log.date, "MMM d, yyyy")}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {format(log.createdAt, "h:mm a")}
              </div>
            </div>
          </div>
          {userRole === "creator" && (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setEditingLog(log)}>
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteWorkLog(log.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4 leading-relaxed">{log.content}</p>
        {log.images.length > 0 && (
          <div className="mb-4 relative group">
            <div 
              ref={scrollContainerRef}
              className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {log.images.map((image, index) => (
                <div key={index} className="relative group flex-shrink-0">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Work log image ${index + 1}`}
                    className="w-48 h-32 object-cover rounded-lg border cursor-pointer"
                    onClick={() => setEnlargedImage(image)}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center pointer-events-none">
                    <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            {log.images.length > 2 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white/90 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => scrollImages('left')}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white/90 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => scrollImages('right')}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        )}
        {log.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {log.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      {/* Enlarged Image Modal */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={enlargedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setEnlargedImage(null)}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}