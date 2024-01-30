import { unSearch } from 'unsearch'
import type { Column } from 'drizzle-orm'
import {
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  ilike,
  like,
  lt,
  lte,
  ne,
  or,
} from 'drizzle-orm'
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  username: varchar('username').unique(),
  name: varchar('name'),
  email: varchar('email'),
})

const columKeys = {
  username: user.username,
  email: user.email,
  id: user.id,
  name: user.name,
}

const scopeTags = {
  '=': (key: Column, value: string) => eq(key, value),
  '!=': (key: Column, value: string) => ne(key, value),
  '>': (key: Column, value: string) => gt(key, value),
  '>=': (key: Column, value: string) => gte(key, value),
  '<': (key: Column, value: string) => lt(key, value),
  '<=': (key: Column, value: string) => lte(key, value),
  '<like>': (key: Column, value: string) => like(key, `%${value}%`),
  '<ilike>': (key: Column, value: string) => ilike(key, `%${value}%`),
  'OR': (...args: any[]) => or(...args),
  'AND': (...args: any[]) => and(...args),
  'asc': (key: Column) => asc(key),
  'desc': (key: Column) => desc(key),
}

const scopeTagsArray = ['OR', 'AND', '<like>', '<ilike>', '>=', '<=', '>', '<', '!=', '=']

unSearch({
  columKeys,
  scopeTags,
  scopeTagsArray,
  search: 'username:admin AND',
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
