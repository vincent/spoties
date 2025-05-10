
import type { AuthRecord, RecordModel } from "pocketbase"
import type { EventsResponse, IsoDateString, LocationsResponse, QuestionsResponse, TimeSlotsResponse } from "./generated-types"

export const QuestionTypes = {
    checkboxes: 'checkboxes',
    date: 'date',
    just_text: 'just_text',
    range: 'range',
    rating: 'rating',
    rich_text: 'rich_text',
    select_many: 'select_many',
    select_one: 'select_one',
    simple_text: 'simple_text',
    time: 'time',
    yes_no: 'yes_no',
    private_name: 'private_name',
    private_age: 'private_age',
    private_address: 'private_address',
}

export type QuestionType = keyof typeof QuestionTypes

export type Question = {
    id: string
    properties: any
    required: boolean
    answer_type: QuestionType
}

export type UserFormAnswer = {
    id?: string
    question: Question
    value: any
}

export type UserEvent = {
    questions_answers: Record<string, UserFormAnswer>
    bookings: { id: string, updated: Date, slots: Record<string, boolean> }
    event_id: string
    loading?: boolean
}

export type TimeSlotsResponseWithAvailability = TimeSlotsResponse & {
    available_seats: number
}

export type InputEventObject = EventsResponse & {
    questions: QuestionsResponse<any>[]
    locations: (LocationsResponse & { slots: TimeSlotsResponseWithAvailability[] })[]
}

export type AdminEvent = InputEventObject & {
    loading: boolean
}

export type UserBookingResponse = {
    updated: IsoDateString
    answers: Record<string, any>
    bookings: string[]
    id: string
    user: RecordModel
    confirmed: boolean
}