import { DefaultUndoRedo } from './DefaultUndoRedo'
import { Action } from '../action/Action'

export class UndoRedo extends DefaultUndoRedo<Action> {
  get isBusy(): false {
    return false
  }

  execute(action: Action): void {
    action.execute()
    this._undoStack.push(action)
    this._redoStack = []
  }

  undo(): void {
    const action = this._undoStack.pop()
    if (action) {
      action.undo()
      this._redoStack.push(action)
    }
  }

  redo(): void {
    const action = this._redoStack.pop()
    if (action) {
      action.execute()
      this._undoStack.push(action)
    }
  }
}
