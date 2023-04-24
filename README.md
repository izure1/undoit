# Undoit

[![](https://data.jsdelivr.com/v1/package/npm/undoit/badge)](https://www.jsdelivr.com/package/npm/undoit)

Simple undo, redo system for JavaScript/TypeScript.

## How to use

```typescript
import { Action, UndoRedo } from 'undoit'

const command = new UndoRedo()
let acc = 0

const execute = () => {
  acc++
}
const undo = () => {
  acc--
}

command.execute(new Action(execute, undo))
acc // 1
command.undo()
acc // 0
command.redo()
acc // 1
```

### Work asynchronously

```typescript
import { AsyncAction, AsyncUndoRedo } from 'undoit'

const command = new AsyncUndoRedo()
let acc = 0

function delay(interval) {
  return new Promise((resolve) => {
    setTimeout(resolve, interval)
  })
}

const execute = async () => {
  await delay(100)
  acc++
}
const undo = async () => {
  await delay(100)
  acc--
}

await command.execute(new AsyncAction(execute, undo))
acc // 1
await command.undo()
acc // 0
await command.redo()
acc // 1

// without a await keyword
command.undo()
command.isBusy // true
```

### Manage easily with state history

```typescript
import { StateHistory } from 'undoit'

const initialValue = 1
const history = new StateHistory(1)

history.data // 1

history.push(2)
history.data // 2

history.undo()
history.data // 1

history.redo()
history.data // 2
```

## Install

|Site|Link|
|---|---|
|**NPM**|[View](https://www.npmjs.com/package/undoit)|
|**Github**|[View](https://github.com/izure1/undoit)|
|**jsdelivr**|[Download](https://cdn.jsdelivr.net/npm/undoit@1.x.x/dist/esm/index.min.js)|

### Node.js (commonjs)

```bash
npm i undoit
```

### Browser (esmodule)

```html
<script type="module">
  import { Action, UndoRedo } from 'https://cdn.jsdelivr.net/npm/undoit@1.x.x/dist/esm/index.min.js'
</script>
```

## License

MIT LICENSE
