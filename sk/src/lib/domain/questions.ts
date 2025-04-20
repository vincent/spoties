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

