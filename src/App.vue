<template>
  <div class="app-bg" style="min-height:100vh;">
    <!-- Aurora BG -->
    <div class="aurora aurora-1"></div>
    <div class="aurora aurora-2"></div>
    <div class="aurora aurora-3"></div>
    <div class="container mt-4">
      <router-view :categorias="categorias" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCategorias } from './stores/useCategorias'

const store = useCategorias()
onMounted(() => {
  store.carregarCategorias()
})
</script>
