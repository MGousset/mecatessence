import { sql } from 'drizzle-orm'
import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

const horodatage = (nom: string) => integer(nom, { mode: 'timestamp_ms' })

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull().default(''),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
  image: text('image'),
  createdAt: horodatage('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: horodatage('updated_at').notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
  pseudo: text('pseudo'),
  role: text('role').notNull().default('contributeur'),
  cguVersion: text('cgu_version')
}, t => [
  // Pseudo unique sans tenir compte de la casse
  uniqueIndex('user_pseudo_unique').on(sql`lower(${t.pseudo})`)
])

export const session = sqliteTable('session', {
  id: text('id').primaryKey(),
  expiresAt: horodatage('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: horodatage('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: horodatage('updated_at').notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
}, t => [
  index('session_user_idx').on(t.userId)
])

export const account = sqliteTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: horodatage('access_token_expires_at'),
  refreshTokenExpiresAt: horodatage('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: horodatage('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: horodatage('updated_at').notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date())
}, t => [
  index('account_user_idx').on(t.userId)
])

export const verification = sqliteTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('ident
