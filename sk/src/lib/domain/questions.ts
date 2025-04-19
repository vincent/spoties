export const QuestionTypes = {
    checkboxes: 1,
    date: 1,
    just_text: 1,
    range: 1,
    rating: 1,
    rich_text: 1,
    select_many: 1,
    select_one: 1,
    simple_text: 1,
    time: 1,
    yes_no: 1,
    private_name: 1,
    private_age: 1,
    private_address: 1,
}

export type QuestionType = keyof typeof QuestionTypes

