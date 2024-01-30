import { andScope } from './plugins/andScope'
import { orScope } from './plugins/orScope'
import { orderByScope } from './plugins/orderByScope'
import { textScope } from './plugins/textScope'
import { twoPointScope } from './plugins/twoPointScope'
import type { SearchFilter } from './types'

export async function unSearch(
  config: SearchFilter,
) {
  config._data ??= {
    wheres: [],
    orderBy: [],
    textArray: [],
  }

  config.default.ignore = config.default.ignore ?? {
    filterText: ['id'],
  }

  config.regex = config.regex ?? /([a-zA-Z]{1,20}):(\/([^\/]+)\/\/|([^:\s]{1,100}))/g
  config.plugins = config.plugins ?? [orScope, andScope, orderByScope, twoPointScope, textScope]

  const textArray = config.search.split(' ')
  config._data.textArray = textArray

  for await (const plugin of config.plugins) {
    if (typeof plugin === 'function') {
      const { separation } = plugin()
      if (typeof separation === 'function')
        separation(config as Required<SearchFilter>)
    }
  }

  for await (const plugin of config.plugins) {
    if (typeof plugin === 'function') {
      const { setup } = plugin()
      if (typeof setup === 'function')
        setup(config as Required<SearchFilter>)
    }
  }

  return {
    config,
  }
}
