export function generateId(prefix: string) {
  return `${prefix}-${Math.floor(Math.random() * 10_001)}`
}