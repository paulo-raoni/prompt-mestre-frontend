<script>
	import { onMount } from 'svelte';
	import '../app.css';
	let dark = true;
	let search = ''

	function toggleTheme() {
		dark = !dark;
		updateTheme();
		localStorage.setItem('theme', dark ? 'dark' : 'light');
	}

	function updateTheme() {
		// Garanta que está assim:
		document.documentElement.classList.toggle('dark', dark);
	}

	onMount(() => {
		const stored = localStorage.getItem('theme');
		dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
		updateTheme();
	});
</script>


<div class="aurora aurora-1"></div>
<div class="aurora aurora-2"></div>
<div class="aurora aurora-3"></div>

<header class="pm-header">
	<div class="pm-header-left">
		<a href="/" class="pm-logo">🧠 Prompt Mestre <span class="pm-ai">AI</span></a>
	</div>
	<div class="pm-header-center">
		
	</div>
	<div class="pm-header-right">
		<button class="pm-theme-btn" on:click={toggleTheme}>
			{dark ? '🌙' : '☀️'}
		</button>
		<button class="pm-login-btn">Entrar</button>
	</div>
</header>

<slot />
