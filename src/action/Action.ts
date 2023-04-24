import { DefaultAction, ActionCallback } from './DefaultAction'

export class Action extends DefaultAction<ActionCallback> {
  execute(): void {
    this._doCallback()
  }

  undo(): void {
    this._undoCallback()
  }
}
