<template>
  <section class="section pt-6">
    <button class="button is-link mb-4" @click="voltar">&larr; Voltar</button>

    <!-- Header: Emoji + Título -->
    <div class="mb-2" style="display:flex; align-items:center;">
      <span style="font-size:2.3rem; margin-right:10px;">{{ prompt.emoji }}</span>
      <h2 class="title is-2 mb-0" style="line-height:1.15;">{{ prompt.title }}</h2>
    </div>

    <!-- Short Description -->
    <div
      v-if="prompt.short_description"
      class="mb-2"
      style="font-size:1.17rem; font-style:italic; color:#E0E7EF; font-weight:400;"
      v-html="formatText(prompt.short_description)">
    </div>
    <!-- Long Description -->
    <div
      v-if="prompt.long_description"
      class="mb-3"
      style="font-size:1.05rem; font-weight:600; color:#b9c4d6; letter-spacing:0.01em;"
      v-html="formatText(prompt.long_description)">
    </div>

    <!-- Teaser/Cenários -->
    <div v-if="prompt.teaser" class="mb-5" style="background:rgba(30,32,46,0.80); border-left:5px solid #ffd75f; border-radius:7px; padding:15px 22px;">
      <div style="font-weight:600; color:#ffd75f; font-size:1.07rem; margin-bottom:3px;">
        💡 Cenários de Uso & Exemplos
      </div>
      <div style="color:#f3e6b0;" v-html="formatText(prompt.teaser)"></div>
    </div>

    <!-- Prompt Mestre -->
    <div class="mb-2 mt-6" style="display:flex; align-items:center;">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3f6ae5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:10px;">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M8 12h8M12 8v8"/>
      </svg>
      <h3 class="title is-4 mb-0" style="color:#3f6ae5; text-transform:uppercase; letter-spacing:0.05em;">O Prompt Mestre</h3>
    </div>
    <div class="box card-prompt" style="position:relative; margin-bottom: 1.7rem;">
      <div class="copy-btn-sticky">
        <button class="copy-btn" @click="copiarPrompt">
          <svg class="copy-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c7d0e2"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copiar
        </button>
        <span v-if="copiado" class="copiado-msg"><span class="copiado-check">✅</span> Copiado!</span>
      </div>
      <pre class="prompt-puro" style="white-space:pre-line;">{{ prompt.prompt }}</pre>
    </div>

    <!-- Restante dos blocos em formato "feature" -->
    <div v-if="prompt.how_to_use" class="feature-block">
      <div class="feature-title"><span>🚀</span> Como Usar</div>
      <div v-html="formatText(prompt.how_to_use)"></div>
    </div>

    <div v-if="prompt.persona" class="feature-block">
      <div class="feature-title"><span>🧑‍💼</span> Persona Ideal</div>
      <div v-html="formatText(prompt.persona)"></div>
    </div>

    <div v-if="prompt.best_practices" class="feature-block">
      <div class="feature-title"><span>💡</span> Boas Práticas</div>
      <div v-html="formatText(prompt.best_practices)"></div>
    </div>

    <div v-if="prompt.metrics" class="feature-block">
      <div class="feature-title"><span>📈</span> Como Medir Sucesso</div>
      <div v-html="formatText(prompt.metrics)"></div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCategorias } from '../../src/stores/useCategorias';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const store = useCategorias();
const { categorias } = storeToRefs(store);

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
.feature-block {
  background: rgba(36, 39, 53, 0.92);
  border-left: 4px solid #3f6ae5;
  border-radius: 6px;
  margin-bottom: 1.4rem;
  padding: 1.05rem 1.45rem 1rem 1.2rem;
}
.feature-title {
  color: #3f6ae5;
  font-weight: bold;
  margin-bottom: 0.45rem;
  font-size: 1.04rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
