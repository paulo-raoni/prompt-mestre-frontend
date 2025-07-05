import { defineStore } from 'pinia'

export const useCategorias = defineStore('categorias', {
  state: () => ({
    categorias: [],
    carregando: false,
    erro: null
  }),
  actions: {
    async carregarCategorias() {
      this.carregando = true
      try {
        const res = await fetch('/prompts_database_final.json')
        this.categorias = await res.json()
        this.erro = null
      } catch (e) {
        this.erro = e
      } finally {
        this.carregando = false
      }
    }
  }
})
