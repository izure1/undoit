import { Action, AsyncAction, UndoRedo, AsyncUndoRedo, StateHistory } from '../src'

describe('Sync Test', () => {
  test('acc', () => {
    let acc = 0
    const command = new UndoRedo()
    const execute = () => {
      acc++
    }
    const undo = () => {
      acc--
    }

    command.execute(new Action(execute, undo))
    expect(acc).toBe(1)
    command.undo()
    expect(acc).toBe(0)
    command.undo()
    expect(acc).toBe(0)
    command.redo()
    expect(acc).toBe(1)
    command.redo()
    expect(acc).toBe(1)
  })
})

describe('Async Test', () => {
  const delay = (interval: number) => new Promise((resolve) => {
    setTimeout(resolve, interval)
  })

  test('acc', async () => {
    let acc = 0
    const command = new AsyncUndoRedo()
    const execute = async () => {
      await delay(100)
      acc++
    }
    const undo = async () => {
      await delay(100)
      acc--
    }

    await command.execute(new AsyncAction(execute, undo))
    expect(acc).toBe(1)
    await command.undo()
    expect(acc).toBe(0)
    await command.undo()
    expect(acc).toBe(0)
    await command.redo()
    expect(acc).toBe(1)
    await command.redo()
    expect(acc).toBe(1)
    
    expect(command.isBusy).toBe(false)
    command.undo()
    expect(command.isBusy).toBe(true)
  })
})

describe('State history Test', () => {
  test('history', () => {
    const history = new StateHistory(1)
    
    expect(history.data).toBe(1)
    history.push(2)
    expect(history.data).toBe(2)
    history.push(3)
    expect(history.data).toBe(3)
    history.redo()
    expect(history.data).toBe(3)
    history.undo()
    expect(history.data).toBe(2)
    history.undo()
    expect(history.data).toBe(1)
    history.undo()
    expect(history.data).toBe(1)
  })
})
