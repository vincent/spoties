/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Admins = "admins",
	Answers = "answers",
	Auditlog = "auditlog",
	Bookings = "bookings",
	Events = "events",
	Locations = "locations",
	Posts = "posts",
	Questions = "questions",
	Teams = "teams",
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
	expand?: T
	created: string
	updated: string
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AdminsRecord = never

export type AnswersRecord<Tvalue = unknown> = {
	event: RecordIdString[]
	question: RecordIdString[]
	user: RecordIdString[]
	value?: null | Tvalue
}

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
	event: RecordIdString[]
	slots?: RecordIdString[]
	user: RecordIdString[]
}

export type EventsRecord = {
	description?: HTMLString
	public_access_link?: string
	team: RecordIdString[]
	title: string
}

export type LocationsRecord = {
	description?: HTMLString
	event: RecordIdString[]
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

export type QuestionsRecord<Tproperties = unknown> = {
	answer_type: string
	deleted?: boolean
	entity: string
	entity_id: string
	event?: RecordIdString[]
	label: HTMLString
	properties?: null | Tproperties
	required?: boolean
}

export type TeamsRecord = {
	owner?: RecordIdString[]
}

export type TimeSlotsRecord = {
	deleted?: boolean
	description?: HTMLString
	duration: number
	event: RecordIdString[]
	label: string
	limit?: number
	location: RecordIdString[]
	starts_at: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	name?: string
	teams?: RecordIdString[]
}

// Response types include system fields and match responses from the PocketBase API
export type AdminsResponse<Texpand = unknown> = Required<AdminsRecord> & AuthSystemFields<Texpand>
export type AnswersResponse<Tvalue = unknown, Texpand = unknown> = Required<AnswersRecord<Tvalue>> & BaseSystemFields<Texpand>
export type AuditlogResponse<Tdata = unknown, Toriginal = unknown, Texpand = unknown> = Required<AuditlogRecord<Tdata, Toriginal>> & BaseSystemFields<Texpand>
export type BookingsResponse<Texpand = unknown> = Required<BookingsRecord> & BaseSystemFields<Texpand>
export type EventsResponse<Texpand = unknown> = Required<EventsRecord> & BaseSystemFields<Texpand>
export type LocationsResponse<Texpand = unknown> = Required<LocationsRecord> & BaseSystemFields<Texpand>
export type PostsResponse<Texpand = unknown> = Required<PostsRecord> & BaseSystemFields<Texpand>
export type QuestionsResponse<Tproperties = unknown, Texpand = unknown> = Required<QuestionsRecord<Tproperties>> & BaseSystemFields<Texpand>
export type TeamsResponse<Texpand = unknown> = Required<TeamsRecord> & BaseSystemFields<Texpand>
export type TimeSlotsResponse<Texpand = unknown> = Required<TimeSlotsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	admins: AdminsRecord
	answers: AnswersRecord
	auditlog: AuditlogRecord
	bookings: BookingsRecord
	events: EventsRecord
	locations: LocationsRecord
	posts: PostsRecord
	questions: QuestionsRecord
	teams: TeamsRecord
	time_slots: TimeSlotsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	admins: AdminsResponse
	answers: AnswersResponse
	auditlog: AuditlogResponse
	bookings: BookingsResponse
	events: EventsResponse
	locations: LocationsResponse
	posts: PostsResponse
	questions: QuestionsResponse
	teams: TeamsResponse
	time_slots: TimeSlotsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'admins'): RecordService<AdminsResponse>
	collection(idOrName: 'answers'): RecordService<AnswersResponse>
	collection(idOrName: 'auditlog'): RecordService<AuditlogResponse>
	collection(idOrName: 'bookings'): RecordService<BookingsResponse>
	collection(idOrName: 'events'): RecordService<EventsResponse>
	collection(idOrName: 'locations'): RecordService<LocationsResponse>
	collection(idOrName: 'posts'): RecordService<PostsResponse>
	collection(idOrName: 'questions'): RecordService<QuestionsResponse>
	collection(idOrName: 'teams'): RecordService<TeamsResponse>
	collection(idOrName: 'time_slots'): RecordService<TimeSlotsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
