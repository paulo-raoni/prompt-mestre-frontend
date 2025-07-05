<script>
	import { marked } from 'marked';
	import { goto } from '$app/navigation';
	import '../app.css';
	
	export let data;
	const { prompt, category } = data;

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
	<a href={`/categoria/${category.slug}`} class="voltar-link">
		← Voltar para {category.category_emoji}
		{category.category}
	</a>

	<h2>{prompt.emoji} {prompt.title}</h2>
	{#if prompt.thumbnail}
		<img src={prompt.thumbnail} alt="Thumbnail do prompt" />
	{/if}
	<p class="short">{prompt.short_description}</p>

	<!-- Markdown para o long_description -->
	<div class="long" id="prompt-long">
		{@html marked.parse(prompt.long_description)}
	</div>

	<h4>Principais Benefícios</h4>
	<ul>
		{#each prompt.benefits as benefit}
			<li>{@html marked.parse(benefit)}</li>
		{/each}
	</ul>
	<button class="prompt-cta" id="copy-btn" on:click={copyPrompt}>Copiar Prompt</button>
</main>

<style>
	.voltar-link {
		display: inline-block;
		margin-bottom: 22px;
		color: var(--primary);
		font-weight: 600;
	}
	.short {
		font-size: 1.09rem;
		color: var(--text-dim);
		margin-bottom: 14px;
		word-break: break-word;
	}
	.long {
		color: #fff;
		line-height: 1.68;
		font-size: 1.12rem;
		margin-bottom: 20px;
		overflow-wrap: break-word;
		word-break: break-word;
	}
	ul {
		margin-top: 18px;
		margin-bottom: 20px;
	}
	li {
		color: #dbeafe;
		font-size: 1rem;
		margin-bottom: 8px;
		overflow-wrap: break-word;
	}
	.prompt-cta {
		margin-top: 18px;
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
