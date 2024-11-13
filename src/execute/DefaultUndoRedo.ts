import { DefaultAction, ActionCallback, AsyncActionCallback } from '../action/DefaultAction'

export class DefaultUndoRedo<T extends DefaultAction<ActionCallback|AsyncActionCallback>> {
  protected _undoStack: T[]
  protected _redoStack: T[]

  protected static BusyError(): Error {
    return new Error(`The 'execute', 'undo', 'redo' cannot be executed because the operation is currently running.`)
  }

  constructor() {
    this._undoStack = []
    this._redoStack = []
  }

  clear(): void {
    this._undoStack = []
    this._redoStack = []
  }
}
