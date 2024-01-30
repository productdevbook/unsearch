import { defineFilterPlugin } from '../utils'

export function twoPointScope() {
  return defineFilterPlugin({
    separation(params) {
      for (const [index, text] of params._data.textArray.entries()) {
        if (typeof text === 'object' || !text.includes(':'))
          continue

        const [columnKey, value] = text.split(':').map(key => key.trim())

        let filter = params.scopeTagsArray.find(f => value.includes(f))
        if (!filter) {
          if (columnKey === 'id')
            filter = '='

          else
            filter = '<ilike>'
        }

        const filterFunction = params.scopeTags[filter as keyof typeof params.scopeTags]

        params._data.textArray[index] = {
          func: filterFunction,
          text: value.replace(filter, '').trim(),
          index,
          key: columnKey,
          type: ':',
        }
      }
    },
    setup(params) {
      for (const text of params._data.textArray) {
        if (typeof text === 'object' && text.type === ':') {
          const filterFunction = text.func
          const key = text.key
          const value = text.text
          params._data.wheres.push(filterFunction(params.columKeys[key as keyof typeof params.columKeys], value))
          params._data.textArray.splice(text.index, 1)
        }
      }
    },
  })
}
