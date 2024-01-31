import { describe, expect, it } from 'vitest'

import { unSearch } from '../src/core'

const columKeys = {
  username: 'user.username',
  email: 'user.email',
  id: 'user.id',
  name: 'user.name',
}

// POSTGRESS SQL TEST
const scopeTags = {
  '=': (key: string, value: string) => `${key} = ${value}`,
  '!=': (key: string, value: string) => `${key} != ${value}`,
  '>': (key: string, value: string) => `${key} > ${value}`,
  '>=': (key: string, value: string) => `${key} >= ${value}`,
  '<': (key: string, value: string) => `${key} < ${value}`,
  '<=': (key: string, value: string) => `${key} <= ${value}`,
  '<like>': (key: string, value: string) => `${key} LIKE %${value}%`,
  '<ilike>': (key: string, value: string) => `${key} ILIKE %${value}%`,
  'OR': (...args: any[]) => `${args.join(' OR ')}`,
  'AND': (...args: any[]) => `${args.join(' AND ')}`,
  'asc': (key: string) => `ORDER BY ${key} ASC`,
  'desc': (key: string) => `ORDER BY ${key} DESC`,
}

const scopeTagsArray = ['OR', 'AND', '<like>', '<ilike>', '>=', '<=', '>', '<', '!=', '=']

async function search(query: string) {
  return await unSearch({
    columKeys,
    scopeTags,
    scopeTagsArray,
    search: query,
    default: {
      filterText: Object.keys(columKeys).map((key) => {
        return {
          column: columKeys[key as keyof typeof columKeys],
          filter: '<ilike>',
          key,
        }
      }),
    },
  })
}

describe('suite', () => {
  it.concurrent('concurrent test 1', async () => {
    const data = await search('username:admin')

    expect(data.config._data?.wheres).toEqual([
      'user.username ILIKE %admin%',
    ])

    expect(data.config._data?.orderBy).toEqual([])
  })

  it.concurrent('concurrent test 2', async () => {
    const data = await search('username:admin AND email:admin')

    expect(data.config._data?.wheres).toEqual([
      'user.username ILIKE %admin% AND user.email ILIKE %admin%',
    ])

    expect(data.config._data?.orderBy).toEqual([])
  })

  it.concurrent('concurrent test 3', async () => {
    const data = await search('username:admin OR email:admin')

    expect(data.config._data?.wheres).toEqual([
      'user.username ILIKE %admin% OR user.email ILIKE %admin%',
    ])

    expect(data.config._data?.orderBy).toEqual([])
  })
})
