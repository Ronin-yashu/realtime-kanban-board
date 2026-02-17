import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Column from '../../components/Column'

describe('column component', () => {
  it('should render column with title', () => {
    const column = { id: 'todo', title: 'To Do', status: 'todo' }
    const tasks = []

    render(
      <DndProvider backend={HTML5Backend}>
        <Column column={column} tasks={tasks} onmovetask={vi.fn()} onupdatetask={vi.fn()} ondeletetask={vi.fn()} />
      </DndProvider>
    )

    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should display correct task count', () => {
    const column = { id: 'todo', title: 'To Do', status: 'todo' }
    const tasks = [
      { id: 1, title: 'task 1', status: 'todo', priority: 'high', category: 'feature' },
      { id: 2, title: 'task 2', status: 'todo', priority: 'low', category: 'bug' }
    ]

    render(
      <DndProvider backend={HTML5Backend}>
        <Column column={column} tasks={tasks} onmovetask={vi.fn()} onupdatetask={vi.fn()} ondeletetask={vi.fn()} />
      </DndProvider>
    )

    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
