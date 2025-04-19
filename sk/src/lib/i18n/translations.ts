
const en = {
  'lang.en': 'English',
  'lang.fr': 'French',
  'act.submit': 'Submit',
  'act.select': 'Select',
  'data.date': 'Date',
  'data.email': 'Email',
  'data.yes': 'Yes',
  'data.required': 'Required',
  'data.option_i': 'Option {{i}}',

  "homepage.welcome": `Welcome !`,
  "homepage.start_creating_event": `Start by creating a event`,
  "homepage.access_admin": `Access your admin panel`,
  "homepage.headline": `Seamless event staffing,\nfrom <span class="text-primary-600">invitation</span> to <span class="text-primary-600">location</span>.`,
  "homepage.subline": `Match the right staff to the right locations based on your answers, availability, and proximity. When plans change, our system helps you reassign spots — turning hours of coordination into seconds, so you can focus on what matters.`,
  "homepage.getting_started": `Getting started`,
  "homepage.staff_new_event": `Staff a new event`,

  "errors.we_are_on_it": "We are already working to solve the problem.",

  "event.done.answers_sent": "Your answers have been sent to the organizer",
  "event.done.review_answers": "Review your answers",
  "event.done.close_window": "close this window",
  "event.done.thx": "Thank you !",

  "event.empty_list": "No event found. Create some !",
  'event.places_limit': "{{limit}} places available",
  'event.places_limited_to': "Limited to {{limit}} places",
  'event.places_unlimited': "Unlimited places",
  'event.duration': "{{duration}} hours",

  'event.banner_1': `Hi <span class="font-semibold">{{username}}</span>, Welcome back!<br>`,
  'event.banner_2': "We already filled the form with your previous answers.",

  'event.form.add_locations': "Add some locations to your event",
  'event.form.available_locations': "Available locations",
  'event.form.event_title': "The event title",
  'event.form.public_link': "Public link",
  'event.form.description': "Description",
  'event.form.questions': "Questions",
  'event.form.locations': "Locations",
  'event.form.add_question': "Add a question",
  'event.form.question_title': "Question title",
  'event.form.add_choice': "Add a choice",

  'event.form.text': "Text",
  'event.form.choice': "Choice",
  'event.form.question_type': "Answer type",
  'event.form.question_type_just_text': "Just text",
  'event.form.question_type_simple_text': "Short answer",
  'event.form.question_type_rich_text': "Long answer",
  'event.form.question_type_rating': "Rating",
  'event.form.question_type_range': "Range",
  'event.form.question_type_date': "Date",
  'event.form.question_type_time': "Time",
  'event.form.question_type_yes_no': "Yes / No",
  'event.form.question_type_checkboxes': "Checkboxes",
  'event.form.question_type_select_one': "One choice",
  'event.form.question_type_select_many': "Multiple choices",

  'event.form.personal_data': "Personal data",
  'event.form.question_type_private_name': "Full name",
  'event.form.question_type_private_age': "Age",
  'event.form.question_type_private_address': "Address",

  'login.welcome_1': "Hi, Thank you for checking us!",
  'login.welcome_2': "To answer the form you've been invited, we need your email.",
  'login.welcome_3': "We promise we wont send you anything without your approval.",
  'login.login_with': "Welcome, login with",
  'login.with_email': "Or continue with email",
  'login.sign_in': "Sign in",
  'login.your_email': "Your email",
  'login.your_password': "Your password",
  'login.login': "Login",
  'login.create_an_account': "Create an account",
  'login.confirm_password': "Confirm password",
  'login.your_name': "Name",
  'login.back_to_login': "Back to login",
  'login.register': "Register",
  'login.no_account': "Don't have an account?",
  'login.register_here': "Register here",
  'login.login_here': "Login here",
  'login.have_an_account': "Already have an account?",

  "end": "."
}

const fr = {
  ...en,
  'lang.en': 'Anglais',
  'lang.fr': 'Français',
  'event.banner_1': `Bonjour <span class="font-semibold">{{username}}</span>, heureux de vous revoir ici!<br>`,
  'event.banner_2': "Nous avons déjà rempli le formulaire avec vos réponses précédentes.",
  'act.submit': 'Envoyer',
  'act.select': 'Sélectionner',
}

const translations = { en, fr };

export type Lang = "en" | "fr";
export type Translations = typeof en | typeof fr
export default translations