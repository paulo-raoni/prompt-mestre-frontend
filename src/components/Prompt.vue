<template>
  <section class="section pt-6">
    <button class="button is-link mb-4" @click="voltar">&larr; Voltar</button>
    <div class="box card-prompt" style="position:relative;">
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

      <div style="font-size:2rem;" class="mb-2">{{ prompt.emoji }}</div>
      <h2 class="title is-4 mb-2">{{ prompt.title }}</h2>
      <div v-if="prompt.short_description" class="mb-3 is-size-6" v-html="formatText(prompt.short_description)"></div>
      <div v-if="prompt.long_description" class="mb-4 is-size-6" v-html="formatText(prompt.long_description)"></div>
      <div v-if="prompt.benefits && prompt.benefits.length">
        <div class="is-size-6 mb-2" style="font-weight:600;">Destaques:</div>
        <ul class="pl-4" style="text-align:left;">
          <li v-for="(item, i) in prompt.benefits" :key="i" v-html="formatText(item)" class="mb-2"></li>
        </ul>
      </div>
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

// Converter markdown simples para HTML (parcial)
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
  // Escolha o texto principal do prompt (exemplo: long_description ou o que quiser copiar)
  const texto = prompt.value.long_description || prompt.value.short_description || prompt.value.title || "";
  if (texto) {
    navigator.clipboard.writeText(texto);
    copiado.value = true;
    setTimeout(() => copiado.value = false, 1800);
  }
}
</script>
