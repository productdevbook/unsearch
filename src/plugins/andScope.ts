import { defineFilterPlugin } from '../utils'

export function andScope() {
  return defineFilterPlugin({
    separation(params) {
      for (const [index, text] of params._data.textArray.entries()) {
        if (typeof text === 'object' || !text.includes('AND'))
          continue

        const andFunction = params.scopeTags.AND

        params._data.textArray[index] = {
          func: andFunction,
          text,
          index,
          type: 'and',
        }
      }
    },
    setup(params) {
      for (const text of params._data.textArray) {
        if (typeof text !== 'object' || text.type !== 'and')
          continue

        if (typeof text === 'object' && text.type === 'and') {
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
