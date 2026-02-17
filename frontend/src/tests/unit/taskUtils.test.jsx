import { describe, it, expect } from 'vitest'

describe('task sorting', () => {
  it('should sort tasks by priority', () => {
    const tasks = [
      { id: 1, priority: 'low' },
      { id: 2, priority: 'high' },
      { id: 3, priority: 'medium' }
    ]

    const priorityorder = { high: 1, medium: 2, low: 3 }
    const sorted = [...tasks].sort((a, b) => priorityorder[a.priority] - priorityorder[b.priority])

    expect(sorted[0].priority).toBe('high')
    expect(sorted[1].priority).toBe('medium')
    expect(sorted[2].priority).toBe('low')
  })
})
