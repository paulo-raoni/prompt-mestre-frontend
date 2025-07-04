<script>
    import { onMount } from 'svelte';
    import '../app.css';

    let dark = true;

    function toggleTheme() {
        dark = !dark;
        updateTheme();
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }

    function updateTheme() {
        document.documentElement.classList.toggle('dark', dark);
    }

    onMount(() => {
        const stored = localStorage.getItem('theme');
        dark = stored
            ? stored === 'dark'
            : window.matchMedia('(prefers-color-scheme: dark)').matches;
        updateTheme();
    });

    // Lógica opcional de busca para home
    let search = "";
    let formAction = "#";
    function handleSearch(e) {
        // Opcional: envie para uma página, filtro, etc.
        e.preventDefault();
        // Atualize para a ação desejada
    }
</script>

<svelte:head>
    <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 128 128%22><text y=%221.1em%22 font-size=%22108%22>🧠</text></svg>"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Nunito:wght@400;700&family=Space+Grotesk:wght@400;700&display=swap"
        rel="stylesheet"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Prompt Mestre AI</title>
</svelte:head>

<header class="pm-header">
    <div class="pm-header-left">
        <a href="/" class="pm-logo">🧠 Prompt Mestre <span class="pm-ai">AI</span></a>
    </div>
    <div class="pm-header-center">
        <!-- Barra de busca SEM slot! -->
        <form class="pm-search-form" on:submit|preventDefault={handleSearch} style="width:340px">
            <input
                class="pm-search-input"
                type="search"
                bind:value={search}
                placeholder="Buscar Prompt Mestre..."
            />
            <button class="pm-search-btn" type="submit" aria-label="Buscar">
                <span>🔍</span>
            </button>
        </form>
    </div>
    <div class="pm-header-right">
        <button class="pm-theme-btn" on:click={toggleTheme} aria-label="Alternar modo">
            <span>{dark ? '🌙' : '☀️'}</span>
            <span class="pm-theme-tooltip">Alternar modo</span>
        </button>
        <button class="pm-login-btn" disabled>Entrar</button>
    </div>
</header>

<slot />

<style>
	:global(html) {
		background: var(--bg-dark);
		color: var(--text);
		font-family: 'Inter', 'Nunito', 'Space Grotesk', Arial, sans-serif;
	}
	:global(.dark) {
		--bg-dark: #171c28;
		--surface: #1d2336;
		--surface-hover: #262c3e;
		--primary: #1976f7;
		--primary-hover: #0c52ba;
		--text: #dbeafe;
		--text-dim: #a1a7b8;
		--border-light: #273049;
		--accent: #41c8ee;
	}
	:global(:not(.dark)) {
		--bg-dark: #f7f8fa;
		--surface: #fff;
		--surface-hover: #f0f4ff;
		--primary: #1976f7;
		--primary-hover: #0c52ba;
		--text: #22334a;
		--text-dim: #5b6785;
		--border-light: #e5eaf5;
		--accent: #41c8ee;
	}
	/* (cole aqui o CSS do seu header e base, igual ao style.css, ou importe de um arquivo global) */
</style>
