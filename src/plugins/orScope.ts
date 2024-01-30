import { defineFilterPlugin } from '../utils'

export function orScope() {
  return defineFilterPlugin({
    separation(params) {
      for (const [index, text] of params._data.textArray.entries()) {
        if (typeof text === 'object' || !text.includes('OR'))
          continue

        const orFunction = params.scopeTags.OR

        params._data.textArray[index] = {
          func: orFunction,
          text,
          index,
          type: 'or',
        }
      }
    },
    setup(params) {
      for (const text of params._data.textArray) {
        if (typeof text !== 'object' || text.type !== 'or')
          continue

        if (typeof text === 'object' && text.type === 'or') {
          const prev = params._data.textArray[text.index - 1]
          const next = params._data.textArray[text.index + 1]

          if (prev && next && typeof prev === 'object' && typeof next === 'object') {
            params._data.wheres.push(text.func(
              prev.func(params.columKeys[prev.key as keyof typeof params.columKeys], prev.text),
              next.func(params.columKeys[next.key as keyof typeof params.columKeys], next.text),
            ))
            params._data.textArray.splice(text.index - 1, 3)
          }
        }
      }
    },
  })
}
