<template>
  <section class="section pt-6">
    <button class="button is-link mb-4" @click="voltar">&larr; Voltar</button>
    <div class="box card-custom">
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
import { computed } from "vue";
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
</script>
