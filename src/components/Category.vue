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
        <!-- Emoji e título do prompt -->
        <strong>
          <span v-if="prompt.emoji" style="margin-right:6px">{{ prompt.emoji }}</span>
          {{ prompt.title }}
        </strong>
        <!-- Short description, ou início do long_description se short estiver vazio -->
        <div v-if="prompt.short_description || prompt.long_description" class="has-text-grey mt-1"
          style="font-size:0.97em; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; max-height:3em; text-overflow:ellipsis;">
          {{ prompt.short_description || prompt.long_description }}
        </div>
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

// Função utilitária para preview do teaser
function teaserPreview(teaser) {
  if (!teaser) return '';
  const firstLine = teaser.split('\n')[0];
  return firstLine.length > 120 ? firstLine.slice(0, 120) + '...' : firstLine;
}
</script>
