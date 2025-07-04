<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	let prompts = [];
	let category = null;
	let slug = '';

	$: slug = $page.params.slug;

	onMount(async () => {
		const res = await fetch('/prompts_database_final.json');
		const cats = await res.json();
		category = cats.find((cat) => cat.slug === slug);
		prompts = category?.prompts ?? [];
	});
</script>

<main>
	<a href="/" class="voltar-link">← Voltar</a>
	{#if category}
		<h2>{category.category_emoji} {category.category}</h2>
		<div class="prompts-grid">
			{#each prompts as prompt}
				<div
					class="prompt-bloco"
					<div on:click={() => goto(`/prompt/${prompt.slug}`)}>
				>
					<span class="emoji">{prompt.emoji}</span>
					<span class="prompt-title">{prompt.title}</span>
					<span class="prompt-short">{prompt.short_description}</span>
				</div>
			{/each}
		</div>
	{:else}
		<p>Categoria não encontrada.</p>
	{/if}
</main>
