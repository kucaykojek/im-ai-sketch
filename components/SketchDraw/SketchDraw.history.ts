import { Canvas } from 'fabric'

type HistoryEventCallback = () => void

class SketchDrawHistory {
  private canvas: Canvas
  private historyUndo: string[]
  private historyRedo: string[]
  private historyNextState: string
  private historyProcessing: boolean

  constructor(canvas: Canvas) {
    this.canvas = canvas
    this.historyUndo = []
    this.historyRedo = []
    this.historyNextState = this._historyNext()
    this.historyProcessing = false

    this._historyInit()
  }

  private _historyNext(): string {
    return JSON.stringify(this.canvas.toDatalessJSON())
  }

  private _historyEvents() {
    return {
      'object:added': this._historySaveAction.bind(this),
      'object:removed': this._historySaveAction.bind(this),
      'object:modified': this._historySaveAction.bind(this),
      'object:skewing': this._historySaveAction.bind(this)
    }
  }

  private _historyInit() {
    this.canvas.on(this._historyEvents())
  }

  private _historySaveAction() {
    if (this.historyProcessing) {
      return
    }

    const json = this.historyNextState
    this.historyUndo.push(json)
    this.historyNextState = this._historyNext()
  }

  private _loadHistory(history: string, callback?: HistoryEventCallback) {
    this.canvas.loadFromJSON(history, () => {
      this.canvas.requestRenderAll()
      this.historyProcessing = false

      if (callback) {
        callback()
      }
    })
  }

  undo(callback?: HistoryEventCallback) {
    this.historyProcessing = true

    const history = this.historyUndo.pop()
    if (history) {
      this.historyRedo.push(this._historyNext())
      this.historyNextState = history
      this._loadHistory(history, callback)
    } else {
      this.historyProcessing = false
    }
  }

  redo(callback?: HistoryEventCallback) {
    this.historyProcessing = true

    const history = this.historyRedo.pop()
    if (history) {
      this.historyUndo.push(this._historyNext())
      this.historyNextState = history
      this._loadHistory(history, callback)
    } else {
      this.historyProcessing = false
    }
  }

  clearHistory() {
    this.historyUndo = []
    this.historyRedo = []
  }

  onHistory() {
    this.historyProcessing = false
    this._historySaveAction()
  }

  canUndo(): boolean {
    return this.historyUndo.length > 0
  }

  canRedo(): boolean {
    return this.historyRedo.length > 0
  }

  offHistory() {
    this.historyProcessing = true
  }
}

export default SketchDrawHistory
