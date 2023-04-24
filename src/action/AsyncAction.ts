import { DefaultAction, AsyncActionCallback } from './DefaultAction'

export class AsyncAction extends DefaultAction<AsyncActionCallback> {
  async execute(): Promise<void> {
    await this._doCallback()
  }

  async undo(): Promise<void> {
    await this._undoCallback()
  }
}
