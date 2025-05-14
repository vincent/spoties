module.exports = {
  validateEventForm,
};

function validateEventForm(form) {
  const { z } = require(`${__hooks}/zod`)

  const QuestionTypes = {
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

  return z.object({
    title: z
      .string({ message: 'errors.required' })
      .trim()
      .min(1, { message: 'errors.required' })
      .max(128, { message: 'errors.too_long' }),
    description: z.string()
      .trim()
      // .min(20, { message: 'errors.required' })
      .max(20000),
    questions: z.array(z.object({
      label: z
        .string()
        .trim()
        .min(1, { message: 'errors.required' })
        .max(128, { message: 'errors.too_long' }),
      answer_type: z
        .nativeEnum(QuestionTypes),
      properties: z
        .object({}),
      required: z
        .boolean(),
    })),
    locations: z.array(
      z.union([
        z.object({ deleted: z.literal(true) }),
        z.object({
          name: z
            .string()
            .trim()
            .min(1)
            .max(128, { message: 'errors.too_long' }),
            // description: z
            //  .string()
            //  .trim()
            //  .min(1)
            //  .max(20000),
            slots: z
              .array(
                z.union([
                  z.object({ deleted: z.literal(true) }),
                  z.object({
                    label: z
                      .string()
                      .trim()
                      .min(1, { message: 'errors.required' })
                      .max(128, { message: 'errors.too_long' }),
                    starts_at: z.coerce.date(),
                    description: z
                      .string()
                      .trim()
                      .min(0)
                      .max(20000),
                    limit: z
                      .number(),
                  })
                ])
              )
        })
      ]),
    )
  }).safeParse(form);
}