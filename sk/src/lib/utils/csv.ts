import { stripTags, translate } from "$lib/i18n"


export function responsesToArray(locale: any, event: any, responses: any) {
    const headers = [
        translate(locale, 'data.date'),
        translate(locale, 'data.email'),
        ...event.questions.filter(q => q.answer_type !== 'just_text').map(q => q.label),
        ...event.locations.flatMap(l => l.slots.map(s => `${stripTags(l.name)} - ${stripTags(s.label)}`))
    ]

    const rows = responses.map(r => [
        new Date(r.updated).toISOString(),
        r.user.name,
        ...event.questions.filter(q => q.answer_type !== 'just_text').map(q => r.answers[q.id] ?? ''),
        ...event.locations.flatMap(l => l.slots.map(s => 
            r.bookings.includes(s.id) ? translate(locale, 'data.yes') : ''
        ))
    ]);

    return [
        headers,
        ...rows,
    ]
}


/**
 * Convert a 2D array into a CSV string
 */
export function arrayToCSV(data){
    return data.map(row =>
      row
        .map(String)  // convert every value to String
        .map(v => v.replaceAll('"', '""'))  // escape double quotes
        .map(v => `"${v}"`)  // quote it
        .join(',')  // comma-separated
    ).join('\r\n');  // rows starting on new lines
}

/**
 * Download contents as a file
 * Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
 */
export function downloadBlob(content, filename, contentType) {
    // Create a blob
    var blob = new Blob([content], { type: contentType });
    var url = URL.createObjectURL(blob);
  
    // Create a link to download it
    var pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
}