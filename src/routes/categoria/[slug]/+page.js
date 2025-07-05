/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    const res = await fetch('/prompts_database_final.json');
    const all = await res.json();
    const category = all.find(cat => cat.slug === params.slug);
    const prompts = category ? category.prompts : [];
    return { category, prompts };
}
