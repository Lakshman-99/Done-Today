import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckSquare, Target, Edit3, Eye, User } from "lucide-react"
import { useWorkLogStore } from "../store/worklog-store"

export function Header() {
  const userRole = useWorkLogStore((state) => state.userRole)

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                <Target className="w-1.5 h-1.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                DoneToday
              </h1>
              <p className="text-xs text-gray-500">Work Log Dashboard</p>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4">
            <Badge variant={userRole === "creator" ? "default" : "secondary"} className="capitalize">
              {userRole === "creator" ? <Edit3 className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
              {userRole}
            </Badge>
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white">
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
