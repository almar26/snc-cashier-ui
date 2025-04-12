export function useUseShortcut(keys: string[], callback: () => void) {
 const pressedKeys = new Set<string>()
  const downHandler = (e: KeyboardEvent) => {
    pressedKeys.add(e.key.toLowerCase())
    const allPressed = keys.every((key) => pressedKeys.has(key.toLowerCase()))
    if (allPressed) callback()
  }
  const upHandler = (e: KeyboardEvent) => {
    pressedKeys.delete(e.key.toLowerCase())
  }
  onMounted(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', downHandler)
    window.removeEventListener('keyup', upHandler)
  })
}
