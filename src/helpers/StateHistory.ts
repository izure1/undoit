import { Action } from '../action/Action'
import { UndoRedo } from '../execute/UndoRedo'

export class StateHistory<T> {
  private _data: T
  private _command: UndoRedo

  constructor(data: T) {
    this._data = data
    this._command = new UndoRedo()
  }

  get data(): T {
    return this._data
  }

  push(data: T): void {
    let before = this._data
    const execute = () => {
      this._data = data
    }
    const undo = () => {
      this._data = before
    }
    this._command.execute(new Action(execute, undo))
  }

  undo(): void {
    this._command.undo()
  }

  redo(): void {
    this._command.redo()
  }

  clear(): void {
    this._command.clear()
  }
}
