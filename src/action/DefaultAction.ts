export type AsyncActionCallback = () => Promise<void>
export type ActionCallback = () => void

export class DefaultAction<T extends (ActionCallback|AsyncActionCallback)> {
  protected _doCallback: T
  protected _undoCallback: T

  constructor(doCallback: T, undoCallback: T) {
    this._doCallback = doCallback
    this._undoCallback = undoCallback
  }
}
