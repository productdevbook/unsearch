import { defineFilterPlugin } from '../utils'

export function textScope(ignoreKeys: string[] = ['id']) {
  return defineFilterPlugin({
    separation(params) {
      for (const [index, text] of params._data.textArray.entries()) {
        if (typeof text === 'object'
          || text.includes(':')
          || text.includes('OR')
          || text.includes('AND')
        )
          continue

        const filterFunction = params.scopeTags['<ilike>']

        params._data.textArray[index] = {
          func: filterFunction,
          text,
          index,
          type: 'text',
        }
      }
    },
    setup(params) {
      for (const text of params._data.textArray) {
        if (typeof text === 'object' && text.type === 'text') {
          const filterFunction = text.func
          for (const key of Object.keys(params.columKeys)) {
            if (ignoreKeys.includes(key))
              continue

            params._data.wheres.push(filterFunction(params.columKeys[key as keyof typeof params.columKeys], text.text))
            params._data.textArray.splice(text.index, 1)
          }
        }
      }
    },
  })
}
