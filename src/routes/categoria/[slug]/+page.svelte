<script>
	import { goto } from '$app/navigation';
	export let data;
	const { category, prompts } = data;
</script>

<main>
	<a href="/" class="voltar-link">← Voltar</a>
	{#if category}
		<h2>{category.category_emoji} {category.category}</h2>
		<div class="prompts-grid">
			{#each prompts as prompt}
				<div class="prompt-bloco" on:click={() => goto(`/prompt/${prompt.slug}`)}>
					<span class="emoji">{prompt.emoji}</span>
					<span class="prompt-title">{prompt.title}</span>
					<div class="category-description">
						<span class="prompt-short">{prompt.short_description}</span>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p>Categoria não encontrada.</p>
	{/if}
</main>

<style>
	.voltar-link {
		display: inline-block;
		margin-bottom: 22px;
		color: var(--primary);
		font-weight: 600;
	}
	.prompts-grid {
		display: grid;
		gap: var(--gap);
		padding: var(--gap);
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		margin: 0 auto;
		max-width: 1400px;
	}
	.prompt-bloco {
		background: #23293a;
		border-radius: 1.2rem;
		box-shadow: 0 4px 30px #0005;
		padding: 2rem 2rem 1.2rem 2rem;
		margin: 1.2rem auto;
		min-width: 320px;
		max-width: 420px;
		min-height: 170px;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		cursor: pointer;
		align-items: flex-start;
		transition: transform 0.11s;
		overflow: hidden;
	}
	.prompt-bloco:focus,
	.prompt-bloco:hover {
		outline: none;
		background: #27344b;
		transform: scale(1.03);
	}
	.prompt-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: #fff;
		margin-bottom: 5px;
	}
	.prompt-short {
		color: #a8b6cc;
		font-size: 1.1rem;
		margin-top: 0.7rem;
		margin-bottom: 0.5rem;
		max-width: 95%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: pre-line;
		word-break: break-word;
	}
	.emoji {
		font-size: 1.65rem;
		margin-right: 9px;
		vertical-align: middle;
	}
</style>
