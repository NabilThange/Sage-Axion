import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Topic {
  id: string
  name: string
  children?: Topic[]
}

interface TopicTreeProps {
  topics: Topic[]
  selectedIds: Set<string>
  onToggle: (id: string, isSelected: boolean, childIds: string[]) => void
}

export function TopicTree({ topics, selectedIds, onToggle }: TopicTreeProps) {
  return (
    <div className="space-y-2">
      {topics.map((topic) => (
        <TopicNode
          key={topic.id}
          topic={topic}
          selectedIds={selectedIds}
          onToggle={onToggle}
          level={0}
        />
      ))}
    </div>
  )
}

interface TopicNodeProps {
  topic: Topic
  selectedIds: Set<string>
  onToggle: (id: string, isSelected: boolean, childIds: string[]) => void
  level: number
}

function TopicNode({ topic, selectedIds, onToggle, level }: TopicNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasChildren = topic.children && topic.children.length > 0
  const isSelected = selectedIds.has(topic.id)

  // Get all descendant IDs
  const getAllDescendantIds = (node: Topic): string[] => {
    if (!node.children) return []
    const ids: string[] = []
    node.children.forEach((child) => {
      ids.push(child.id)
      ids.push(...getAllDescendantIds(child))
    })
    return ids
  }

  // Check if all children are selected
  const allChildrenSelected = hasChildren
    ? topic.children!.every((child) => {
        const childSelected = selectedIds.has(child.id)
        if (child.children) {
          return childSelected && child.children.every((subChild) => selectedIds.has(subChild.id))
        }
        return childSelected
      })
    : false

  // Check if some (but not all) children are selected
  const someChildrenSelected = hasChildren
    ? topic.children!.some((child) => selectedIds.has(child.id) || 
        (child.children && child.children.some((subChild) => selectedIds.has(subChild.id))))
    : false

  const handleToggle = () => {
    const childIds = getAllDescendantIds(topic)
    const newIsSelected = !isSelected
    onToggle(topic.id, newIsSelected, childIds)
  }

  const paddingLeft = level * 24

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 py-2 px-3 rounded-button hover:bg-background-elevated/50 transition-colors"
        style={{ paddingLeft: `${paddingLeft + 12}px` }}
      >
        {/* Expand/Collapse Button */}
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-5 h-5 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▶
            </motion.div>
          </button>
        )}

        {/* Spacer for items without children */}
        {!hasChildren && <div className="w-5" />}

        {/* Checkbox */}
        <label className="flex items-center gap-3 flex-1 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleToggle}
              className="w-5 h-5 rounded border-2 border-background-elevated bg-background-elevated checked:bg-accent-violet checked:border-accent-violet appearance-none cursor-pointer transition-all"
            />
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center text-white text-xs pointer-events-none"
              >
                ✓
              </motion.div>
            )}
            {/* Indeterminate state (some children selected) */}
            {!isSelected && someChildrenSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center text-accent-violet text-xs pointer-events-none"
              >
                −
              </motion.div>
            )}
          </div>

          <span className={`text-sm ${level === 0 ? "font-medium" : ""}`}>
            {topic.name}
          </span>

          {/* Badge for module/topic type */}
          {level === 0 && (
            <span className="text-xs px-2 py-0.5 bg-accent-violet/20 text-accent-violet rounded-full">
              Module
            </span>
          )}
        </label>
      </motion.div>

      {/* Children */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {topic.children!.map((child) => (
              <TopicNode
                key={child.id}
                topic={child}
                selectedIds={selectedIds}
                onToggle={onToggle}
                level={level + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
