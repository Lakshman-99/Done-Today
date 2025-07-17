"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckSquare, Plus } from "lucide-react"
import { useWorkLogStore } from "../store/worklog-store"
import { WorkLogCard } from "./work-log-card"
import { format } from "date-fns"

export function WorkLogList() {
  const { dateRange, userRole, setIsCreateDialogOpen, getFilteredLogs } = useWorkLogStore()

  const filteredLogs = getFilteredLogs()

  return (
    <div className="lg:col-span-3">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Work Logs</h2>
          <p className="text-gray-600 mt-1">
            {filteredLogs.length} {filteredLogs.length === 1 ? "entry" : "entries"} found
            {(dateRange.from || dateRange.to) && (
              <span className="ml-2">
                {dateRange.from && dateRange.to
                  ? `from ${format(dateRange.from, "MMM d")} to ${format(dateRange.to, "MMM d")}`
                  : dateRange.from
                    ? `from ${format(dateRange.from, "MMM d")}`
                    : `until ${format(dateRange.to!, "MMM d")}`}
              </span>
            )}
          </p>
        </div>

        {userRole === "creator" && (
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Work Log
          </Button>
        )}
      </div>

      {/* Work Logs */}
      <div className="space-y-6">
        {filteredLogs.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No work logs found</h3>
              <p className="text-gray-600 mb-4">No work logs match your current filters</p>
              {userRole === "creator" && (
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-gradient-to-r from-emerald-600 to-blue-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Log
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredLogs.map((log) => <WorkLogCard key={log.id} log={log} />)
        )}
      </div>
    </div>
  )
}
