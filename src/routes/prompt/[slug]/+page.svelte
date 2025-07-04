<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	let prompt = null;
	let category = null;
	let slug = '';

	$: slug = $page.params.slug;

	onMount(async () => {
		const res = await fetch('/prompts_database_final.json');
		const cats = await res.json();
		for (let cat of cats) {
			const found = cat.prompts.find((p) => p.slug === slug);
			if (found) {
				prompt = found;
				category = cat;
				break;
			}
		}
	});

	function copyPrompt() {
		const el = document.getElementById('prompt-long');
		if (el) {
			navigator.clipboard.writeText(el.innerText);
			const btn = document.getElementById('copy-btn');
			if (btn) {
				btn.innerText = 'Copiado!';
				setTimeout(() => (btn.innerText = 'Copiar Prompt'), 1200);
			}
		}
	}
</script>

<main>
	{#if prompt && category}
		<a href={`/categoria/${category.slug}`} class="voltar-link"
			>← Voltar para {category.category_emoji} {category.category}</a
		>
		<h2>{prompt.emoji} {prompt.title}</h2>
		{#if prompt.thumbnail}
			<img src={prompt.thumbnail} alt="Thumbnail do prompt" />
		{/if}
		<p class="short">{prompt.short_description}</p>
		<p class="long" id="prompt-long">{prompt.long_description}</p>
		<h4>Principais Benefícios</h4>
		<ul>
			{#each prompt.benefits as benefit}
				<li>{benefit}</li>
			{/each}
		</ul>
		<button class="prompt-cta" id="copy-btn" on:click={copyPrompt}>Copiar Prompt</button>
	{:else}
		<p>Prompt não encontrado.</p>
	{/if}
</main>
