/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Admins = "admins",
	Auditlog = "auditlog",
	Bookings = "bookings",
	Events = "events",
	Locations = "locations",
	Posts = "posts",
	TimeSlots = "time_slots",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
	created: string
	updated: string
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AdminsRecord = never

export type AuditlogRecord<Tdata = unknown, Toriginal = unknown> = {
	admin?: string
	collection: string
	data?: null | Tdata
	event: string
	original?: null | Toriginal
	record: string
	user?: RecordIdString[]
}

export type BookingsRecord = {
	field: RecordIdString[]
	user: RecordIdString[]
}

export type EventsRecord = {
	description?: HTMLString
	public_access_link?: string
	title: string
}

export type LocationsRecord = {
	description?: HTMLString
	event_id: RecordIdString[]
	geo_place?: string
	name?: string
}

export type PostsRecord = {
	body: string
	files?: string
	slug: string
	title: string
	user?: RecordIdString[]
}

export type TimeSlotsRecord = {
	description?: HTMLString
	duration: number
	label: string
	limit?: number
	location_id: RecordIdString[]
	start_at: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AdminsResponse<Texpand = unknown> = Required<AdminsRecord> & AuthSystemFields<Texpand>
export type AuditlogResponse<Tdata = unknown, Toriginal = unknown, Texpand = unknown> = Required<AuditlogRecord<Tdata, Toriginal>> & BaseSystemFields<Texpand>
export type BookingsResponse<Texpand = unknown> = Required<BookingsRecord> & BaseSystemFields<Texpand>
export type EventsResponse<Texpand = unknown> = Required<EventsRecord> & BaseSystemFields<Texpand>
export type LocationsResponse<Texpand = unknown> = Required<LocationsRecord> & BaseSystemFields<Texpand>
export type PostsResponse<Texpand = unknown> = Required<PostsRecord> & BaseSystemFields<Texpand>
export type TimeSlotsResponse<Texpand = unknown> = Required<TimeSlotsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	admins: AdminsRecord
	auditlog: AuditlogRecord
	bookings: BookingsRecord
	events: EventsRecord
	locations: LocationsRecord
	posts: PostsRecord
	time_slots: TimeSlotsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	admins: AdminsResponse
	auditlog: AuditlogResponse
	bookings: BookingsResponse
	events: EventsResponse
	locations: LocationsResponse
	posts: PostsResponse
	time_slots: TimeSlotsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'admins'): RecordService<AdminsResponse>
	collection(idOrName: 'auditlog'): RecordService<AuditlogResponse>
	collection(idOrName: 'bookings'): RecordService<BookingsResponse>
	collection(idOrName: 'events'): RecordService<EventsResponse>
	collection(idOrName: 'locations'): RecordService<LocationsResponse>
	collection(idOrName: 'posts'): RecordService<PostsResponse>
	collection(idOrName: 'time_slots'): RecordService<TimeSlotsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
