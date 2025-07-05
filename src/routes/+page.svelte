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
	<h1 class="main-title">Arsenal Dev AI</h1>
	<p class="main-desc">
		Seu arsenal completo de prompts de IA. Use a busca ou navegue pelas categorias.
	</p>

	<div style="margin: 0 auto; max-width: 96vw;">
		<form class="pm-search-form" on:submit|preventDefault={filterCategories}>
			<input
				class="pm-search-input"
				bind:value={search}
				on:input={filterCategories}
				placeholder="Buscar por prompts, técnicas, ferramentas..."
			/>
			<button class="pm-search-btn" type="submit" aria-label="Buscar"><span>🔍</span></button>
		</form>
	</div>
	<div class="categorias-grid">
		{#each filteredCategories as cat}
			<div
				class="category-bloco"
				on:click={() => (window.location.href = `/categoria/${cat.slug}`)}
			>
				<div class="category-header">
					<span class="emoji">{cat.category_emoji}</span>
					<span class="category-title">{cat.category}</span>
				</div>
				<ul class="prompt-preview-list">
					{#each cat.prompts.slice(0, 4) as p}
						<li title={p.title}>
							<span class="bullet"></span>
							{p.title}
						</li>
					{/each}
				</ul>
				<button class="prompt-cta">Ver todos</button>
			</div>
		{/each}
	</div>
</main>

<style>
	.main-title,
	.main-desc {
		text-align: center;
		width: 100%;
	}
	.main-title {
		font-size: 3rem;
		margin-top: 48px;
	}
	.main-desc {
		margin-bottom: 18px;
		color: #b1bdd6;
		font-size: 1.24rem;
		font-weight: 400;
	}

	.categorias-grid {
		display: grid;
		gap: var(--gap);
		padding: var(--gap);
		grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
		margin: 0 auto;
		max-width: 1400px;
	}
	.category-bloco {
		background: var(--surface);
		border-radius: var(--card-radius);
		box-shadow: var(--card-shadow);
		padding: 28px 24px 22px 24px;
		min-height: 220px;
		max-width: 430px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 8px;
		cursor: pointer;
		transition:
			background 0.2s,
			box-shadow 0.2s;
		position: relative;
		border: 1.5px solid var(--border-light);
		overflow: hidden;
	}
	.category-bloco:hover {
		background: var(--surface-hover);
		transform: translateY(-3px) scale(1.012);
		box-shadow: 0 12px 32px #0008;
	}
	.emoji {
		font-size: 2.1rem;
		margin-right: 14px;
		vertical-align: middle;
	}
	.category-header {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 6px;
	}
	.category-title {
		font-size: 1.14rem;
		font-weight: 700;
		color: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.prompt-preview-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.prompt-preview-list li {
		font-size: 1.02rem;
		color: #c7dafd;
		margin-bottom: 4px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		max-width: 98%;
		display: flex;
		align-items: center;
	}
	.bullet {
		width: 9px;
		height: 9px;
		background: var(--accent);
		border-radius: 50%;
		display: inline-block;
		margin-right: 10px;
		flex-shrink: 0;
	}
	.prompt-cta {
		align-self: flex-end;
		margin-top: 8px;
		background: var(--primary);
		color: #fff;
		font-weight: 600;
		font-size: 0.99rem;
		border-radius: 10px;
		border: none;
		padding: 7px 20px;
		cursor: pointer;
		box-shadow: 0 2px 18px #1976f766;
		transition: background 0.18s;
	}
	.prompt-cta:hover {
		background: var(--primary-hover);
	}
</style>
