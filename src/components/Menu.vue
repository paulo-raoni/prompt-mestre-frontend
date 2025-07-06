<template>
  <section class="container" style="padding-top: 44px;">
    <div class="header">
      <h1>Prompt Mestre AI</h1>
      <p>Seu arsenal completo de prompts de IA. Use a busca ou navegue pelas categorias.</p>
    </div>

    <!-- BARRA DE PESQUISA + DROPDOWN -->
    <div class="menu-search">
      <div class="menu-search-wrapper">
        <input type="text" v-model="busca" placeholder="Buscar por prompts, técnicas, ferramentas..."
          @focus="showDropdown = true" @blur="onBlurDropdown" />
        <ul v-if="busca && resultadosBusca.length && showDropdown" class="search-dropdown">
          <li v-for="item in resultadosBusca" :key="item.id + item.title" @mousedown.prevent="irParaPrompt(item)">
            <div class="dropdown-title">{{ item.title }}</div>
            <div class="dropdown-category">Categoria: {{ item.category }}</div>
          </li>
        </ul>
      </div>
    </div>


    <div class="menu-grid">
      <div v-for="cat in categoriasFiltradas" :key="cat.slug" class="card-custom" @click="irParaCategoria(cat)"
        style="cursor:pointer">
        <div class="card-header">
          <span class="icon" style="font-size:2.2rem;">{{ cat.category_emoji }}</span>
          <span class="title" style="margin-left:0.7rem;">{{ cat.category }}</span>
        </div>
        <ul class="prompt-list" v-if="cat.prompts && cat.prompts.length">
          <li v-for="p in cat.prompts.slice(0, 4)" :key="p.title">
            {{ p.title }}
          </li>
        </ul>
        <span v-if="cat.prompts && cat.prompts.length > 4" class="has-text-grey-light">
          e mais {{ cat.prompts.length - 4 }} prompt{{ cat.prompts.length > 5 ? 's' : '' }}...
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useCategorias } from '../../src/stores/useCategorias'   // Caminho correto!
import { storeToRefs } from "pinia";

const store = useCategorias();
const { categorias } = storeToRefs(store);

const busca = ref("");
const categoriasFiltradas = computed(() => {
  const termo = busca.value.trim().toLowerCase();
  if (!termo) return categorias.value || [];
  return (categorias.value || []).filter(cat => {
    const matchCategoria = cat.category.toLowerCase().includes(termo);
    const matchPrompt = cat.prompts.some(p =>
      (p.title || '').toLowerCase().includes(termo) ||
      (p.short_description || '').toLowerCase().includes(termo)
    );
    return matchCategoria || matchPrompt;
  });
});


const showDropdown = ref(false);

const resultadosBusca = computed(() => {
  if (!busca.value) return [];
  const results = [];
  (categorias.value || []).forEach(cat => {
    (cat.prompts || []).forEach(p => {
      if (
        (p.title || '').toLowerCase().includes(busca.value.toLowerCase()) ||
        (p.short_description || '').toLowerCase().includes(busca.value.toLowerCase())
      ) {
        results.push({ ...p, category: cat.category, categorySlug: cat.slug, promptSlug: p.slug, id: cat.slug + '-' + p.slug });
      }
    });
  });
  return results;
});

const router = useRouter();

function irParaCategoria(cat) {
  router.push({ name: "Category", params: { slug: cat.slug } });
}

function irParaPrompt(item) {
  router.push({
    name: "Prompt",
    params: {
      categorySlug: item.categorySlug,
      promptSlug: item.slug
    }
  });
}
</script>
