import { DefaultUndoRedo } from './DefaultUndoRedo'
import { AsyncAction } from '../action/AsyncAction'

export class AsyncUndoRedo extends DefaultUndoRedo<AsyncAction> {
  private _isBusy: boolean
  
  constructor() {
    super()
    this._isBusy = false
  }

  get isBusy(): boolean {
    return this._isBusy
  }

  async execute(action: AsyncAction): Promise<void> {
    if (this._isBusy) {
      throw DefaultUndoRedo.BusyError()
    }
    this._isBusy = true
    await action.execute()
    this._undoStack.push(action)
    this._redoStack = []
    this._isBusy = false
  }

  async undo(): Promise<void> {
    if (this._isBusy) {
      throw DefaultUndoRedo.BusyError()
    }
    this._isBusy = true
    const action = this._undoStack.pop()
    if (action) {
      await action.undo()
      this._redoStack.push(action)
    }
    this._isBusy = false
  }

  async redo(): Promise<void> {
    if (this._isBusy) {
      throw DefaultUndoRedo.BusyError()
    }
    this._isBusy = true
    const action = this._redoStack.pop()
    if (action) {
      await action.execute()
      this._undoStack.push(action)
    }
    this._isBusy = false
  }
}
