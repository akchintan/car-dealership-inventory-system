import { useEffect, useRef } from 'react'

export interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  callback: (event: KeyboardEvent) => void
  enabled?: boolean
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false

  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable
}

function matchesShortcut(event: KeyboardEvent, shortcut: KeyboardShortcut) {
  return event.key.toLowerCase() === shortcut.key.toLowerCase()
    && event.ctrlKey === (shortcut.ctrlKey ?? false)
    && event.shiftKey === (shortcut.shiftKey ?? false)
    && event.altKey === (shortcut.altKey ?? false)
    && !event.metaKey
}

function useKeyboardShortcuts(shortcuts: readonly KeyboardShortcut[]) {
  const shortcutsRef = useRef(shortcuts)
  shortcutsRef.current = shortcuts

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat || isTypingTarget(event.target)) return

      const shortcut = shortcutsRef.current.find((definition) =>
        definition.enabled !== false && matchesShortcut(event, definition),
      )

      if (!shortcut) return

      event.preventDefault()
      shortcut.callback(event)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}

export default useKeyboardShortcuts
