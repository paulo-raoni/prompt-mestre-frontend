<script>
	import { onMount } from 'svelte';
	let categories = [];
	let search = '';
	let filteredCategories = [];

	onMount(async () => {
		const res = await fetch('/prompts_database_final.json');
		categories = await res.json();
		filterCategories();
	});

	function filterCategories() {
		if (!search.trim()) {
			filteredCategories = categories;
		} else {
			const s = search.toLowerCase();
			filteredCategories = categories
				.map((cat) => ({
					...cat,
					prompts: cat.prompts.filter(
						(p) =>
							p.title.toLowerCase().includes(s) ||
							p.short_description?.toLowerCase().includes(s) ||
							p.long_description?.toLowerCase().includes(s)
					)
				}))
				.filter((cat) => cat.prompts.length > 0);
		}
	}
</script>

<main>
    <h1 style="margin-top:36px;">Categorias de Prompts Mestres</h1>
    <div class="categorias-grid">
        {#each filteredCategories as cat}
            <div
                class="category-bloco"
                on:click={() => goto(`/categoria/${cat.slug}`)}
            >
                <span class="emoji">{cat.category_emoji}</span>
                <span class="category-title">{cat.category}</span>
                <div class="prompt-preview-list">
                    {#each cat.prompts.slice(0, 3) as p}
                        <div class="prompt-short" style="margin-bottom:2px">
                            <span class="emoji">{p.emoji}</span>
                            {p.title}
                        </div>
                    {/each}
                </div>
                <button class="prompt-cta">Ver todos</button>
            </div>
        {/each}
    </div>
</main>