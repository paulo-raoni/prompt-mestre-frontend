<template>
  <section class="section pt-6">
    <button class="button is-link mb-4" @click="voltar">&larr; Voltar</button>

    <!-- HEADER AJUSTADO -->
    <div class="pm-header-container">
      <div class="pm-header">
        <div class="pm-header-row">
          <span class="pm-header-emoji">{{ prompt.emoji }}</span>
          <h1 class="pm-header-title">{{ prompt.title }}</h1>
        </div>
        <div class="pm-desc-block">
          <div v-if="prompt.short_description" class="desc-faq-ui">
            <button class="desc-faq-title" @click="showShort = !showShort" :aria-expanded="showShort">
              <span class="desc-faq-label">Resumo</span>
              <span class="faq-arrow" :class="{ open: showShort }">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" stroke="currentColor" stroke-width="2.2" fill="none"
                    stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </button>
            <transition name="faq-slide">
              <div v-show="showShort" class="pm-header-lead" v-html="formatText(prompt.short_description)" />
            </transition>
          </div>
          <div v-if="prompt.long_description" class="desc-faq-ui">
            <button class="desc-faq-title" @click="showLong = !showLong" :aria-expanded="showLong">
              <span class="desc-faq-label">Detalhes</span>
              <span class="faq-arrow" :class="{ open: showLong }">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" stroke="currentColor" stroke-width="2.2" fill="none"
                    stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </button>
            <transition name="faq-slide">
              <div v-show="showLong" class="pm-header-desc" v-html="formatText(prompt.long_description)" />
            </transition>
          </div>
        </div>
      </div>
    </div>

    <!-- BLOCO: COMO USAR -->
    <BlockExtra v-if="prompt.how_to_use" emoji="🚀" label="Como Usar" :content="prompt.how_to_use" accent="#fa5a92"
      bgColor="rgba(40,24,60,0.35)" />

    <!-- PROMPT PREMIUM -->
    <div class="prompt-command-card">
      <div class="prompt-command-header">
        <span class="prompt-command-title">Prompt de Comando</span>
        <div class="prompt-copy-wrap">
          <button class="copy-button" @click="copiarPrompt">
            <svg width="19" height="19" fill="none" style="vertical-align: middle;margin-right:5px;">
              <rect x="5" y="4" width="10" height="11" rx="2" stroke="#d3d7e1" stroke-width="1.6" />
              <rect x="9" y="2.6" width="7" height="11.5" rx="2" stroke="#d3d7e1" stroke-width="1" fill="none" />
            </svg>
            Copiar
          </button>
          <span v-if="copiado" class="copiado-msg">
            <svg class="copiado-check" width="18" height="18" viewBox="0 0 24 24" fill="none"
              style="vertical-align:-3px;margin-right:5px;">
              <path d="M5 13l4 4L19 7" stroke="#7bf594" stroke-width="2.2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            Copiado!
          </span>
        </div>
      </div>
      <div class="prompt-command-body">
        <pre class="prompt-command-pre"><code>{{ prompt.prompt }}</code></pre>
      </div>
    </div>

    <!-- BLOCOS EXTRAS ORDENADOS -->
    <BlockExtra v-if="prompt.teaser" emoji="💡" label="Cenários de Uso & Exemplos"
      :content="formatTeaser(prompt.teaser)" accent="#ffd75f" bgColor="rgba(40,36,18,0.19)" />
    <BlockExtra v-if="prompt.persona" emoji="🧑‍💼" label="Persona Ideal" :content="prompt.persona" accent="#f0a600"
      bgColor="rgba(38,35,21,0.35)" />
    <BlockExtra v-if="prompt.best_practices" emoji="💡" label="Boas Práticas" :content="prompt.best_practices"
      accent="#31d0a7" bgColor="rgba(20,48,38,0.35)" />
    <BlockExtra v-if="prompt.metrics" emoji="📈" label="Como Medir Sucesso" :content="prompt.metrics" accent="#389eff"
      bgColor="rgba(22,38,57,0.35)" />
  </section>
</template>


<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCategorias } from '../../src/stores/useCategorias';
import { storeToRefs } from 'pinia';
import BlockExtra from './BlockExtra.vue';

const route = useRoute();
const router = useRouter();
const store = useCategorias();
const { categorias } = storeToRefs(store);
const showShort = ref(false);
const showLong = ref(false);


const prompt = computed(() => {
  const categorySlug = route.params.categorySlug;
  const promptSlug = route.params.promptSlug;
  const categoria = categorias.value.find(c => c.slug === categorySlug);
  if (!categoria) return {};
  return categoria.prompts.find(p => p.slug === promptSlug) || {};
});

function voltar() {
  router.push({ name: 'Category', params: { slug: route.params.categorySlug } });
}

function formatText(text) {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.*?)\*/g, "<i>$1</i>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br>");
}

function formatTeaser(teaser) {
  if (!teaser) return "";

  // Divide em linhas brutas
  let lines = teaser.split('\n');
  return lines.map(line => {
    // Remove todos os espaços, traços e dois-pontos à esquerda
    let clean = line.replace(/^\s*-\s*/, '').trim();

    // Aplica markdown (em cada linha)
    clean = clean
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/\*(.*?)\*/g, "<i>$1</i>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");

    // Centraliza e destaca os títulos dos cenários (mesmo se vierem com ou sem bold)
    if (/^<b>.*Cen[aá]rio\s?\d+.*?:<\/b>$/i.test(clean) || /^Cen[aá]rio\s?\d+.*?:$/i.test(clean)) {
      // Garante bold
      if (!/^<b>/.test(clean)) clean = `<b>${clean}</b>`;
      return `<div class="cenario-title">${clean}</div>`;
    }

    // Ignora linha vazia
    if (!clean) return '';

    // Resto: texto normal de cenário
    return `<div class="cenario-conteudo">${clean}</div>`;
  }).join('');
}



const copiado = ref(false);
function copiarPrompt() {
  const texto = prompt.value.prompt || ""; // <-- Só o prompt puro!
  if (texto) {
    navigator.clipboard.writeText(texto);
    copiado.value = true;
    setTimeout(() => copiado.value = false, 1800);
  }
}
</script>

<style scoped>
/* HEADER MODERNO */
.pm-header-container {
  max-width: 1100px;
  margin: 0 auto 1.5rem auto;
  padding: 0 1.3rem;
}

.pm-header {
  margin-bottom: 1.9rem;
  margin-top: 0.3rem;
}

.pm-header-row {
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: flex-end;
  gap: 17px;
  margin-bottom: 2.28em;
}

.pm-header-emoji {
  font-size: 2.6rem;
  filter: drop-shadow(0 2px 10px #161c2e40);
}

.pm-header-title {
  font-size: 2.64rem;
  font-weight: 900;
  color: #fff;
  line-height: 1.13;
  letter-spacing: -0.015em;
  margin-bottom: 0;
}

.pm-desc-block {
  max-width: 68rem;
  /* Igual ao BlockExtra */
  width: 100%;
  margin: 0 auto 2.1rem auto;
  /* Mesmo margin-bottom */
  padding: 0;
  /* Tirar padding da wrapper */
  border-radius: 0.7em;
  /* Igual ao BlockExtra, se quiser */
  background: none;
  /* Mantém transparente aqui */
}


.pm-header-lead,
.pm-header-desc {
  position: relative;
  z-index: 2;
  background: none;
  border-radius: 0;
  padding: 0;
  margin: 0;
  max-width: 100%;
}


.pm-header-lead {
  font-size: 1.12rem;
  color: #a9dcf8;
  font-style: italic;
  font-weight: 400;
  line-height: 1.51;
  margin-bottom: 0.15em;
}


.pm-header-desc {
  font-size: 1.13rem;
  color: #e7e8ec;
  font-weight: 400;
  line-height: 1.61;
}

.pm-desc-block-accent {
  position: relative;
  background: rgba(28, 30, 40, 0.62);
  /* vidro leve, ou transparente */
  border-radius: 0.8em;
  backdrop-filter: blur(9px) saturate(1.1);
  -webkit-backdrop-filter: blur(9px) saturate(1.1);
  padding: 1.6em 2.1em 1.2em 1.2em;
  margin-bottom: 2.1rem;
}

.pm-desc-block-accent::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0.36em;
  border-radius: 8px 0 0 8px;
  background: linear-gradient(180deg, #3B82F6 60%, #31d0a7 100%);
  opacity: 0.38;
  z-index: 1;
}



.desc-faq-ui {
  margin-bottom: 1.12rem;
  background: rgba(28, 30, 40, 0.62);
  border-radius: 0.8em;
  backdrop-filter: blur(9px) saturate(1.1);
  -webkit-backdrop-filter: blur(9px) saturate(1.1);
  box-shadow: none;
  padding: 0;
  overflow: hidden;
}

.desc-faq-title {
  display: flex;
  align-items: center;
  gap: 11px;
  font-size: 1.14rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #8bc3ff;
  background: none;
  border: none;
  width: 100%;
  padding: 1.1em 1.3em 1.1em 1.3em;
  cursor: pointer;
  outline: none;
  user-select: none;
  border-radius: 0.8em;
  transition: background 0.14s;
}

.desc-faq-title:hover {
  background: rgba(40, 120, 255, 0.10);
}

.desc-faq-label {
  font-size: 1.07em;
  font-weight: bold;
  margin-right: 3px;
}






/* Callout moderno (cenários de uso) */
.pm-callout {
  background: rgba(34, 36, 46, 0.19);
  border-left: 7px solid #ffd75f;
  border-radius: 20px;
  padding: 2rem 2.2rem 1.5rem 2.1rem;
  margin-top: 2.2rem;
  margin-bottom: 2.8rem;
  box-shadow: 0 8px 36px 0 rgba(40, 64, 140, 0.10);
  width: 100%;
  max-width: 100%;
  /* Para tirar qualquer restrição */
}


.pm-callout-title {
  font-size: 1.24rem;
  font-weight: 900;
  color: #ffd75f;
  margin-bottom: 0.65rem;
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: 0.015em;
}

.pm-callout-content {
  color: #fff4d7;
  font-size: 1.13rem;
  line-height: 1.67;
  font-weight: 500;
  letter-spacing: 0.006em;
}

.pm-callout-content .dialog-line {
  display: block;
  padding-left: 2.2em;
  text-indent: -1.6em;
  margin-bottom: 0.15em;
  position: relative;
  color: #ffe9a2;
}

.pm-callout-content .dialog-line strong {
  font-weight: bold;
  color: #ffd75f;
}

.pm-callout-content .dialog-line b {
  color: #ffe172;
  font-weight: 800;
  font-size: 1.08em;
}

.cenario-title {
  font-size: 1.32rem;
  font-weight: 800;
  text-align: center !important;
  margin: 1.6em 0 1.1em 0;
  color: #ffd75f;
  letter-spacing: 0.01em;
  font-family: 'Montserrat', 'Inter', Arial, sans-serif;
  line-height: 1.22;
  display: block;
  border-bottom: 1.5px solid #ffd75f33;
  padding-bottom: 0.12em;
  box-shadow: 0 1px 0 #ffd75f22;
}

.cenario-title b {
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
}

.cenario-conteudo {
  font-size: 1.07rem;
  font-weight: 400;
  color: #f8ecbf;
  text-align: left;
  line-height: 1.66;
  margin-bottom: 0.16em;
  font-family: 'Inter', Arial, sans-serif;
}



/* Prompt box com label/tabs */
.prompt-command-card {
  background: #22262d;
  border-radius: 1.2em;
  border: 1.5px solid #2e3440;
  margin: 2.3rem 0;
  box-shadow: 0 4px 24px 0 rgba(40, 50, 80, 0.11);
  overflow: hidden;
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
}

.prompt-command-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1em 2.1em 1.1em 2.1em;
  border-bottom: 1.5px solid #2e3440;
  color: #e7eaf0;
  background: #22262d;
  font-size: 1.09rem;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.prompt-command-title {
  font-size: 1.10rem;
  font-weight: 700;
  color: #dde2f2;
}

/* Wrapper para alinhar botão e copiado juntos */
.prompt-copy-wrap {
  display: flex;
  align-items: center;
  gap: 0.85em;
}

.copy-button {
  background: #2d323c;
  color: #e7eaf0;
  font-weight: bold;
  border-radius: 0.6em;
  padding: 0.44em 1.22em;
  font-size: 1em;
  border: none;
  transition: background .16s;
  cursor: pointer;
  margin-left: 1.3em;
  display: flex;
  align-items: center;
}

.copy-button:hover {
  background: #454c5a;
}

.copiado-msg {
  font-size: 0.98em;
  margin-left: 0;
  color: #7bf594;
  font-weight: 700;
  background: #202e1c;
  border-radius: 0.45em;
  padding: 0.22em 0.9em 0.22em 0.7em;
  box-shadow: 0 2px 8px #121 0.11;
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  animation: fadeInOut 1.7s forwards;
  position: relative;
  top: 1px;
}

.copiado-check {
  font-size: 1.14em;
  margin-right: 5px;
  animation: popIn 0.22s cubic-bezier(.59, 1.63, .36, .97);
}

.prompt-command-body {
  padding: 1.4em 2.1em 1.5em 2.1em;
  background: none;
}

.prompt-command-pre {
  font-family: 'Fira Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', monospace !important;
  font-size: 1.05rem;
  color: #e7eaf0;
  line-height: 1.7;
  margin: 0;
  background: none;
  border: none;
  white-space: pre-wrap;
  word-break: break-word;
  tab-size: 4;
}



@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(7px);
  }

  20% {
    opacity: 1;
    transform: translateY(0);
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(-8px);
  }
}

@keyframes popIn {
  0% {
    transform: scale(0.5);
  }

  80% {
    transform: scale(1.18);
  }

  100% {
    transform: scale(1);
  }
}



@media (max-width: 900px) {
  .pm-header-title {
    font-size: 2rem;
  }

  .pm-header-emoji {
    font-size: 2rem;
  }

  .pm-header-lead {
    font-size: 1.09rem;
  }

  .pm-header-desc {
    font-size: 0.97rem;
  }

  .pm-header-container {
    max-width: 100vw;
    padding: 0 10px;
  }
}

@media (max-width: 700px) {
  .pm-header-title {
    font-size: 1.5rem;
  }

  .pm-header-emoji {
    font-size: 1.3rem;
  }

  .pm-header-lead {
    font-size: 1.07rem;
  }
}
</style>
