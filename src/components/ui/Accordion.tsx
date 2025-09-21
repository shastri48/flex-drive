'use client'

import { useState, ReactNode } from 'react'
import { ChevronDownIcon } from '@/components/ui'

interface FilterSectionProps {
  title: string
  isExpanded?: boolean
  children: ReactNode
}

export default function FilterSection({
  title,
  isExpanded = false,
  children,
}: FilterSectionProps) {
  const [expanded, setExpanded] = useState(isExpanded)

  return (
    <div className="p-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-sm font-medium text-gray-900">{title}</span>
        <ChevronDownIcon
          className={`w-4 h-4 text-gray-400 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {expanded && <div className="mt-3">{children}</div>}
    </div>
  )
}
