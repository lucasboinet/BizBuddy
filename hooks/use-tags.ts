"use client"

import { Tag } from "@prisma/client"
import { useState } from "react"

interface UseTagsProps {
  onChange?: (tags: Tag[]) => void
  defaultTags?: Tag[]
  maxTags?: number
}

export function useTags({
  onChange,
  defaultTags = [],
  maxTags = 10,
}: UseTagsProps = {}) {
  const [tags, setTags] = useState<Tag[]>(defaultTags)

  function addTag(tag: Tag) {
    if (tags.length >= maxTags) return

    const newTags = [
      ...tags,
      { ...tag},
    ]
    setTags(newTags)
    onChange?.(newTags)
    return newTags
  }

  function removeTag(tagId: string) {
    const newTags = tags.filter((t) => t.id !== tagId)
    setTags(newTags)
    onChange?.(newTags)
    return newTags
  }

  function removeLastTag() {
    if (tags.length === 0) return
    return removeTag(tags[tags.length - 1].id)
  }

  return {
    tags,
    setTags,
    addTag,
    removeTag,
    removeLastTag,
    hasReachedMax: tags.length >= maxTags,
  }
}

