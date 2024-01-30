export interface SearchFilter {
  /**
   * username:hello, email:hello, username:test@test.com or:[username, email] and:[username, email] asc:[username, email] desc:[username, email]
   */
  search: string
  /**
   * {
   * Drizzle Example
   * username: tablesPzg.user.username,
   *
   * Postgres Example
   * username: SQL`users.username`
   * }
   */
  columKeys: Record<string, any>

  /**
   * {
   * Drizzle Example
   * '=': (key: Column, value: string) => eq(key, value),
   * '!=': (key: Column, value: string) => ne(key, value),
   *
   * Postgres Example
   * '=': (key: SQLWrapper, value: string) => SQL`${key} = ${value}`,
   * '!=': (key: SQLWrapper, value: string) => SQL`${key} != ${value}`,
   *
   */
  scopeTags: {
    [key in string]: (key: any, value: string) => void
  }

  /**
   * The order is important here. If >= is at the beginning, >= will not be perceived and will be corrupted.
   * Make sure that the order is correct.
   * ['like', 'ilike', '>=', '<=', '>', '<', '!=', '=']
   */
  scopeTagsArray: string[]

  /**
   *
   * @example
   * const regex = /([a-zA-Z]{1,20}):(\/([^\/]+)\/\/|([^:\s]{1,100}))/g
   *
   * @default
   * /([a-zA-Z]{1,20}):(\/([^\/]+)\/\/|([^:\s]{1,100}))/g
   */
  regex?: RegExp

  /**
   *
   * @example
   * const plugins = [ORScope, orderByScope]
   *
   * @default
   * [ORScope, orderByScope]
   */
  plugins?: (() => FilterConfig)[]

  default: {
    /**
     * @default
     * filter: SearchFilter.default.filterText
     */
    filterText: {
      filter: string
      column: any
      key: string
    }[]
    ignore?: {
      /** @default ['id'] */
      filterText?: string[]
    }
  }

  /**
   * @private
   * @ignore
   * @default
   * {
   * wheres: [],
   * orderBy: [],
   * }
   */
  _data?: {
    wheres: any[]
    orderBy: any[]
    textArray: (string | {
      func: any
      text: string
      index: number
      key?: string
      type: string
    })[]
  }
}

export interface FilterConfig {
  setup?(
    params: Required<SearchFilter>,
  ): void
  separation?(
    params: Required<SearchFilter>,
  ): void
}
