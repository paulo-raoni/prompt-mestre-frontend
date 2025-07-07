Aqui está um **resumão fluido, estratégico e direto**, para você colar no próximo chat e dar contexto instantâneo ao novo assistente sobre todo o planejamento, branding e estrutura de dev/migração do projeto. Juntei suas anotações e acrescentei explicações, com as decisões já tomadas e os próximos passos.

---

## **Resumo Estratégico – Brazilian Dev / propt.ai / garimpo.ai**

### **Visão Geral**

Você está estruturando um **ecossistema de produtos de IA** sob a marca **Brazilian Dev**. O objetivo é criar uma plataforma central (guarda-chuva) com produtos independentes, cada um com identidade própria, mas todos integrados pelo branding principal.

---

### **1. Marca & Naming**

* **Brazilian Dev** é a marca principal/institucional (site institucional, portfólio, blog).
* **propt.ai** será a nova versão da antiga “Prompt Mestre AI”: catálogo de prompts mestres, criação/edição, scraping de concorrentes, tudo gratuito no MVP.
* **garimpo.ai** será um agregador/buscador de ferramentas de IA (feature a ser desenvolvida depois, placeholder por enquanto).

**Nomes Alternativos Considerados:** PromptCraft, PromptLab, PromptForge, PromptPro, PromptFlow, PromptHub, PromptWizard, etc.
**Decisão:** propt.ai (catálogo/gerador de prompts) + garimpo.ai (busca de IAs).

---

### **2. Estrutura de Domínios e Navegação**

```ascii
BRAZILIANDEV.COM/.DEV (Landing institucional)
│
├── propt.ai     (Landing e app de prompts, branding próprio)
├── garimpo.ai   (Landing/app de busca de IAs, branding próprio)
└── [futuras ferramentas]
```

* Usuário pode chegar pelo guarda-chuva ou direto no produto (cada domínio tem menu discreto de volta para a marca-mãe).

---

### **3. MVP & Roadmap**

* **Prioridade 1:** propt.ai – catálogo de prompts + criador/editor + scraping de sites concorrentes.
* **Prioridade 2:** garimpo.ai – buscador/curadoria de ferramentas IA (placeholder por enquanto).
* **Portal Brazilian Dev:** landing institucional, blog, links para produtos, branding unificado.

---

### **4. Features-Diferencial**

* Propt.ai: Biblioteca de prompts, criação/edição (visual builder no futuro), playground para testar, onboarding didático, contexto BR, curadoria local, login social, favoritos.
* Garimpo.ai: Agregador de IAs, busca por nome/função, destaques mensais, comunidade BR, possibilidade de submissão de novas IAs.
* Diferencial estratégico: Foco em português/BR, onboarding guiado, tutoriais, bundles/setores específicos (ex: para dev, jurídico, marketing), conteúdo educativo, blog.

---

### **5. Benchmark – Concorrentes**

* **PromptHub:** UX madura, marketplace, curadoria, busca poderosa, perfis, editoriais, integração com ChatGPT.
* **PromptForge:** Builder visual (drag & drop), galeria, parametrização, integração, experiência focada em dev/automação.
* **Conclusão:** Ambos são globais, maduros e possuem comunidades fortes. Oportunidade para diferenciação local/educativa/contextual.

---

### **6. Estrutura do Monorepo**

Você **vai usar monorepo** (por facilidade e agilidade, já que trabalha solo), provavelmente com TurboRepo, Nx, pnpm workspaces, ou manual.

```ascii
/braziliandev-monorepo/
│
├── apps/
│   ├── propt-ai-frontend        # Frontend do Propt.ai (React/Svelte/etc)
│   ├── propt-ai-backend         # Backend/API do Propt.ai (Node/FastAPI/etc)
│   ├── garimpo-ai-frontend      # Placeholder/landing do Garimpo.ai
│   ├── braziliandev-frontend    # Portal institucional
│   └── braziliandev-backend     # (opcional, para SSO/admin/blog/etc)
│
├── scripts/
│   └── scraping/                # Scrapers Python (Playwright) para prompts
│
├── packages/  (opcional)
│   ├── ui/        # Design system compartilhado (botão, input, etc)
│   ├── utils/     # Funções JS/TS/Python compartilhadas
│   └── types/     # Tipos TypeScript/JSONSchemas
│
├── .gitignore
├── package.json / requirements.txt
├── turbo.json / nx.json (opcional)
└── README.md
```

* Scripts de scraping (Python, Playwright) ficam em `/scripts/scraping` e geram arquivos para o backend indexar.
* Propt.ai consome esses dados para exibir a biblioteca de prompts.
* Brazilian Dev landing une tudo.

---

### **7. Migração do “prompt-mestre-frontend”**

* Criar `/apps/propt-ai-frontend`.
* Copiar o projeto atual (prompt-mestre-frontend) para lá, trocar branding, assets, cores, favicon, logo, etc.
* Criar `/apps/propt-ai-backend`, conectar aos dados gerados pelo scraping.

---

### **8. Boas práticas e fluxo de dev**

* Use PRs atômicos (front+back juntos quando fizer sentido).
* Documente endpoints, formatos de dados, padrões de prompt.
* Compartilhe componentes em `/packages/` se começar a duplicar código.
* Mantenha um README claro no monorepo explicando apps, scripts, fluxo, e como rodar localmente.

---

### **9. Checklist dos Próximos Passos**

1. Estruturar monorepo: raiz + `apps/` + `scripts/` (pelo menos).
2. Migrar prompt-mestre-frontend para propt-ai-frontend e aplicar rebranding.
3. Criar backend do propt.ai, consumir os dados dos scripts de scraping.
4. Criar landing institucional Brazilian Dev.
5. Subir placeholder do garimpo.ai.
6. Testar tudo localmente, subir para o GitHub.
7. Configurar deploy (Vercel/Netlify pro front, Railway/Fly.io pro backend).
8. Registrar domínios e lançar MVP.

---

### **10. Decisões já tomadas**

* Nome do produto: **propt.ai** (para prompts), **garimpo.ai** (busca IA).
* Tudo em **monorepo** para facilitar dev solo, code sharing, refatoração.
* Marca principal: **Brazilian Dev**.
* Foco inicial no MVP do propt.ai (catálogo + scraping + CRUD básico de prompt).

---

**Resumo:**

> O projeto está numa fase estratégica: organizar tudo no monorepo, rebrandear o prompt-mestre para propt.ai, montar backend/API com dados dos scripts de scraping, criar uma landing institucional unindo tudo e preparar um placeholder para o garimpo.ai.
> Próximo passo: continuar o setup do monorepo, refatoração do frontend, integração do scraping e API, e estruturação do lançamento MVP.
