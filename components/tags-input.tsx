"use client"

import { useState, type KeyboardEvent, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { useTags } from "@/hooks/use-tags"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tag } from "@prisma/client"

interface TagsInputProps {
  placeholder?: string
  onChange?: (tags: Tag[]) => void
  defaultTags?: Tag[]
  maxTags?: number
  suggestedTags?: Tag[]
}

export function TagsInput({
  placeholder = "Add tags...",
  onChange,
  defaultTags = [],
  maxTags = 10,
  suggestedTags = [],
}: TagsInputProps) {
  const [inputValue, setInputValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const { tags, addTag, removeTag, removeLastTag, hasReachedMax } = useTags({
    onChange,
    defaultTags,
    maxTags,
  })

  const filteredSuggestions = suggestedTags
    .filter(
      (suggestion) =>
        suggestion.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !tags.some((tag: Tag) => tag.name.toLowerCase() === suggestion.name.toLowerCase()),
    )
    .slice(0, 5)


  useEffect(() => {
    setSelectedSuggestionIndex(0)
  }, [filteredSuggestions.length])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (showSuggestions && filteredSuggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedSuggestionIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : 0))
      } else if (e.key === "Enter" && filteredSuggestions[selectedSuggestionIndex]) {
        e.preventDefault()
        selectSuggestion(filteredSuggestions[selectedSuggestionIndex])
        return
      } else if (e.key === "Escape") {
        setShowSuggestions(false)
      }
    }

    const tagAlreadyExists = tags.some((tag) => tag.name.toLowerCase() === inputValue.trim().toLowerCase())

    if (e.key === " " && inputValue && inputValue.endsWith(',') && !tagAlreadyExists) {
      e.preventDefault()

      addTag({
        id: crypto.randomUUID(),
        name: inputValue.trim().replaceAll(',', ''),
        userId: '',
      })

      setInputValue("")
    } else if (e.key === "Backspace" && !inputValue) {
      e.preventDefault()
      removeLastTag()
    }
  }

  const selectSuggestion = (suggestion: Tag) => {
    addTag({
      id: suggestion.id,
      name: suggestion.name,
      userId: suggestion.userId,
    })

    setInputValue("")
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
    setShowSuggestions(value.length > 0)
  }

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 p-2 border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        {tags.map((tag) => (
          <Badge key={tag.id} variant="secondary" className={`bg-primary text-secondary hover:bg-primary/80 hover:text-secondary flex items-center gap-1 px-2 py-1`}>
            {tag.name}
            <button
              type="button"
              onClick={() => removeTag(tag.id)}
              className="flex items-center justify-center w-4 h-4 rounded-full"
              aria-label={`Remove ${tag.name} tag`}
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}

        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue && setShowSuggestions(true)}
          placeholder={hasReachedMax ? `Max tags reached (${maxTags})` : placeholder}
          disabled={hasReachedMax}
          className="flex-1 min-w-[120px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
        />
      </div>
      <span className="text-xs text-muted-foreground">Type &quot;,&quot; then hit space to create a new label</span>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 -bottom-[110%] w-full mt-1 bg-background border rounded-md shadow-md max-h-60 overflow-auto"
        >
          <div className="py-1">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={suggestion.id || suggestion.name}
                className={`px-3 py-2 cursor-pointer flex items-center ${index === selectedSuggestionIndex ? "bg-muted" : ""
                  } hover:bg-muted`}
                onClick={() => selectSuggestion(suggestion)}
                onMouseEnter={() => setSelectedSuggestionIndex(index)}
              >
                <span className="flex-1">{suggestion.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

