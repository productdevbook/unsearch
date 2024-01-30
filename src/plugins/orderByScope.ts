import { defineFilterPlugin } from '../utils'

export function orderByScope() {
  return defineFilterPlugin({
    separation(params) {
      for (const [index, text] of params._data.textArray.entries()) {
        if (typeof text === 'object' || !((text.includes('asc:') || text.includes('desc:'))))
          continue

        if (text.includes('asc:[') || text.includes('desc:[')) {
          const [columnKey, value] = text.split(':').map(key => key.trim())
          const ascOrDesc = columnKey.includes('asc') ? 'asc' : 'desc'
          const filterFunction = params.scopeTags[ascOrDesc as keyof typeof params.scopeTags]

          for (const key of value.replace('[', '').replace(']', '').split(',')) {
            params._data.textArray[index] = {
              func: filterFunction,
              text: key,
              index,
              type: 'orderBy',
            }
          }
        }

        if (text.includes('asc:') || text.includes('desc:')) {
          const [columnKey, value] = text.split(':').map(key => key.trim())
          const filterFunction = params.scopeTags[columnKey as keyof typeof params.scopeTags]
          params._data.textArray[index] = {
            func: filterFunction,
            text: value,
            index,
            type: 'orderBy',
          }
        }
      }
    },
    setup(params) {
      for (const item of params._data.textArray) {
        if (typeof item === 'object' && item.type === 'orderBy') {
          params._data.orderBy.push(
            item.func(params.columKeys[item.text as keyof typeof params.columKeys], item.text),
          )
          params._data.textArray.splice(item.index, 1)
        }
      }
    },
  })
}
