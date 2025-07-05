<template>
  <section class="section pt-6">
    <button class="button is-link mb-4" @click="voltar">
      &larr; Voltar ao Menu
    </button>
    <h2 class="title is-3 mb-5">
      <template v-if="categoria">
        {{ categoria.category_emoji }} {{ categoria.category }}
      </template>
      <template v-else>
        Categoria não encontrada.
      </template>
    </h2>
    <div class="menu-grid">
      <div v-if="categoria && categoria.prompts" v-for="prompt in categoria.prompts" :key="prompt.slug"
        class="box card-custom" style="cursor:pointer" @click="irParaPrompt(prompt)">
        <strong>{{ prompt.title }}</strong>
        <div>{{ prompt.short_description }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCategorias } from '../stores/useCategorias';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const store = useCategorias();
const { categorias } = storeToRefs(store);

const categoria = computed(() => {
  if (!categorias.value) return null;
  return categorias.value.find(cat => cat.slug === route.params.slug);
});

function irParaPrompt(prompt) {
  router.push({
    name: "Prompt",
    params: {
      categorySlug: categoria.value.slug,
      promptSlug: prompt.slug
    }
  });
}

function voltar() {
  router.push({ name: 'Menu' })
}
</script>
