function sanitizePrompt(prompt) {
  // Remove tags HTML e converte <br> em \n do long_description
  let long_description = prompt.long_description || '';
  long_description = long_description
    .replace(/<br\s*\/?>/gi, '\n')      // Troca <br> por \n
    .replace(/\n{2,}/g, '\n\n')         // Garante duplas quebras para parágrafos
    .replace(/^\s+|\s+$/g, '');         // Tira espaços no começo/fim

  // Remove bullet, tags extras, e espaços de benefits
  let benefits = Array.isArray(prompt.benefits)
    ? prompt.benefits
        .map(b =>
          b
            .replace(/^(\*|-|\d+\.|•)\s*/g, '') // remove bullet char no começo
            .replace(/<br\s*\/?>/gi, '')
            .replace(/[*_]{2,}/g, '')           // remove excesso de **
            .replace(/^\s+|\s+$/g, '')
        )
        .filter(Boolean)
    : [];

  // Sanitize outros campos se quiser...

  return { ...prompt, long_description, benefits };
}

export async function load({ params, fetch }) {
  const res = await fetch('/prompts_database_final.json');
  const all = await res.json();

  let prompt, category;
  for (let cat of all) {
    const found = cat.prompts.find((p) => p.slug === params.slug);
    if (found) {
      prompt = sanitizePrompt(found);
      category = cat;
      break;
    }
  }
  return { prompt, category };
}
