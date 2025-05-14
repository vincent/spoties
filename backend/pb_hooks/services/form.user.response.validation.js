module.exports = {
  validateResponseForm,
};

function validateResponseForm(form) {
  const { z } = require(`${__hooks}/zod`)

  function questionValidator(q) {
    if (!q.required) return z.any()
    if (q.answer_type === 'checkboxes') return z.object({ value: z.string().array() })
    return z.object({
      // value: z.union([ z.number(), z.string() ], { message: translate(get(locale), 'errors.required') })
      value: z.coerce
        .string()
        .min(1)
        .refine(val => (val !== 'null') ? val : '', { message: 'errors.required' })
    })
  }

  return z.object({
    questions_answers: z.object(
      Object
        .keys(form.questions_answers)
        .reduce((acc, qid) => ({
          ...acc,
          [qid]: questionValidator(form.questions_answers[qid].question)
        }), {})
    ),
    bookings: z.object({
      slots: z.object({})
    }),
  }).safeParse(form);
}