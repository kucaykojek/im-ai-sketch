import { HistoryCommand, HistoryManager } from '../data/types'

const removeFromTo = <T>(array: T[], from: number, to?: number): T[] => {
  const deleteCount = to === undefined ? array.length - from : to - from

  if (deleteCount > 0) {
    array.splice(from, deleteCount)
  }

  return array
}

const historyManager = (): HistoryManager => {
  let commands: HistoryCommand[] = [],
    index = -1,
    limit = 0,
    on = true,
    isExecuting = false,
    callback: (() => void) | undefined

  function execute(command: HistoryCommand, action: 'undo' | 'redo'): void {
    if (!command || typeof command[action] !== 'function') {
      return
    }
    isExecuting = true

    command[action]()

    isExecuting = false
  }

  return {
    on: function (status: boolean): void {
      on = status
    },

    add: function (command: HistoryCommand): HistoryManager {
      if (isExecuting || !on) {
        return this
      }

      commands.splice(index + 1, commands.length - index)
      commands.push(command)

      if (limit && commands.length > limit) {
        removeFromTo(commands, 0, commands.length - limit)
      }

      index = commands.length - 1
      if (callback) {
        callback()
      }
      return this
    },

    setCallback: function (callbackFunc: () => void): void {
      callback = callbackFunc
    },

    undo: function (): HistoryManager {
      let command = commands[index]
      if (!command) {
        return this
      }

      const groupId = command.groupId
      while (command.groupId === groupId) {
        execute(command, 'undo')
        index -= 1
        command = commands[index]
        if (!command || !command.groupId) {
          break
        }
      }

      if (callback) {
        callback()
      }
      return this
    },

    redo: function (): HistoryManager {
      let command = commands[index + 1]
      if (!command) {
        return this
      }

      const groupId = command.groupId
      while (command.groupId === groupId) {
        execute(command, 'redo')
        index += 1
        command = commands[index + 1]
        if (!command || !command.groupId) {
          break
        }
      }

      if (callback) {
        callback()
      }
      return this
    },

    clear: function (): HistoryManager {
      let prev_size = commands.length

      commands = []
      index = -1

      if (callback && prev_size > 0) {
        callback()
      }
      return this
    },

    canUndo: function (): boolean {
      return index !== -1
    },

    canRedo: function (): boolean {
      return index < commands.length - 1
    },

    getCommands: function (groupId?: string): HistoryCommand[] {
      return groupId ? commands.filter((c) => c.groupId === groupId) : commands
    },

    getIndex: function (): number {
      return index
    },

    setLimit: function (max: number): void {
      limit = max
    }
  }
}

export default historyManager
