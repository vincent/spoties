/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Admins = "admins",
	Answers = "answers",
	Bookings = "bookings",
	Events = "events",
	Locations = "locations",
	Participants = "participants",
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
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type AdminsRecord = {
	created?: IsoDateString
	email?: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	username: string
	verified?: boolean
}

export type AnswersRecord<Tvalue = unknown> = {
	created?: IsoDateString
	event: RecordIdString
	id: string
	question: RecordIdString
	updated?: IsoDateString
	user: RecordIdString
	value?: null | Tvalue
}

export type BookingsRecord = {
	confirmed?: boolean
	created?: IsoDateString
	event: RecordIdString
	id: string
	slots?: RecordIdString[]
	updated?: IsoDateString
	user: RecordIdString
}

export type EventsRecord = {
	created?: IsoDateString
	description?: HTMLString
	id: string
	public_access_link?: string
	team: RecordIdString
	title: string
	updated?: IsoDateString
}

export type LocationsRecord = {
	created?: IsoDateString
	deleted?: boolean
	description?: HTMLString
	event: RecordIdString
	geo_place?: string
	id: string
	name?: string
	updated?: IsoDateString
}

export type ParticipantsRecord = {
	avatar?: string
	email?: string
	emailVisibility?: boolean
	event?: RecordIdString
	id: string
	name?: string
	team?: RecordIdString
}

export type PostsRecord = {
	body: string
	created?: IsoDateString
	files?: string[]
	id: string
	slug: string
	title: string
	updated?: IsoDateString
	user?: RecordIdString
}

export type QuestionsRecord<Tproperties = unknown> = {
	answer_type: string
	created?: IsoDateString
	deleted?: boolean
	entity: string
	entity_id: string
	event?: RecordIdString
	id: string
	label: HTMLString
	properties?: null | Tproperties
	rank?: number
	required?: boolean
	updated?: IsoDateString
}

export type TeamsRecord = {
	created?: IsoDateString
	id: string
	owner?: RecordIdString
	updated?: IsoDateString
}

export type TimeSlotsRecord = {
	created?: IsoDateString
	deleted?: boolean
	description?: HTMLString
	duration: number
	event: RecordIdString
	id: string
	label: string
	limit?: number
	location: RecordIdString
	starts_at: IsoDateString
	updated?: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	email?: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	teams?: RecordIdString[]
	tokenKey: string
	updated?: IsoDateString
	username: string
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type AdminsResponse<Texpand = unknown> = Required<AdminsRecord> & AuthSystemFields<Texpand>
export type AnswersResponse<Tvalue = unknown, Texpand = unknown> = Required<AnswersRecord<Tvalue>> & BaseSystemFields<Texpand>
export type BookingsResponse<Texpand = unknown> = Required<BookingsRecord> & BaseSystemFields<Texpand>
export type EventsResponse<Texpand = unknown> = Required<EventsRecord> & BaseSystemFields<Texpand>
export type LocationsResponse<Texpand = unknown> = Required<LocationsRecord> & BaseSystemFields<Texpand>
export type ParticipantsResponse<Texpand = unknown> = Required<ParticipantsRecord> & BaseSystemFields<Texpand>
export type PostsResponse<Texpand = unknown> = Required<PostsRecord> & BaseSystemFields<Texpand>
export type QuestionsResponse<Tproperties = unknown, Texpand = unknown> = Required<QuestionsRecord<Tproperties>> & BaseSystemFields<Texpand>
export type TeamsResponse<Texpand = unknown> = Required<TeamsRecord> & BaseSystemFields<Texpand>
export type TimeSlotsResponse<Texpand = unknown> = Required<TimeSlotsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	admins: AdminsRecord
	answers: AnswersRecord
	bookings: BookingsRecord
	events: EventsRecord
	locations: LocationsRecord
	participants: ParticipantsRecord
	posts: PostsRecord
	questions: QuestionsRecord
	teams: TeamsRecord
	time_slots: TimeSlotsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	admins: AdminsResponse
	answers: AnswersResponse
	bookings: BookingsResponse
	events: EventsResponse
	locations: LocationsResponse
	participants: ParticipantsResponse
	posts: PostsResponse
	questions: QuestionsResponse
	teams: TeamsResponse
	time_slots: TimeSlotsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'admins'): RecordService<AdminsResponse>
	collection(idOrName: 'answers'): RecordService<AnswersResponse>
	collection(idOrName: 'bookings'): RecordService<BookingsResponse>
	collection(idOrName: 'events'): RecordService<EventsResponse>
	collection(idOrName: 'locations'): RecordService<LocationsResponse>
	collection(idOrName: 'participants'): RecordService<ParticipantsResponse>
	collection(idOrName: 'posts'): RecordService<PostsResponse>
	collection(idOrName: 'questions'): RecordService<QuestionsResponse>
	collection(idOrName: 'teams'): RecordService<TeamsResponse>
	collection(idOrName: 'time_slots'): RecordService<TimeSlotsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
