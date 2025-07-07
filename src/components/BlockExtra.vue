<template>
    <div class="block-extra-ui glass-fade-in" :style="`background:${bgColor};`">
        <button class="block-extra-title-ui" @click="toggle" :aria-expanded="open">
            <span class="block-extra-emoji-ui emoji-shine" :style="`color: ${accent}`">{{ emoji }}</span>
            <span class="block-extra-label-ui" :style="`color:${accent}`">{{ label }}</span>
            <span class="faq-arrow" :class="{ open }">
                <svg width="21" height="21" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9" stroke="currentColor" stroke-width="2.4" fill="none"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </span>
        </button>
        <div v-if="open" class="block-extra-divider"></div>
        <transition name="faq-slide">
            <div v-show="open" class="block-extra-content-ui" v-html="formatText(content)" />
        </transition>
    </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(['emoji', 'label', 'content', 'accent', 'bgColor']);
const open = ref(false);
function toggle() {
    open.value = !open.value;
}
function formatText(text) {
    if (!text) return "";
    return text
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
        .replace(/\*(.*?)\*/g, "<i>$1</i>")
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\n/g, "<br>");
}
</script>

<style scoped>
.block-extra-ui {
    max-width: 68rem;
    width: 100%;
    margin: 0 auto 2.1rem auto;
}

/* Centralização absoluta usando flex e alinhamento baseline: */
.block-extra-title-ui {
    display: flex;
    align-items: center;
    /* Centraliza verticalmente */
    width: 100%;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1.17rem;
    font-weight: 900;
    padding: 1.07em 1.3em;
    gap: 10px;
    letter-spacing: 0.04em;
    transition: background .15s;
    border-radius: 0;
    user-select: none;
    position: relative;
    line-height: 1.2;
    min-height: 48px;
    text-align: left;
    justify-content: flex-start
}

/* Shine animado no emoji */
.emoji-shine {
    font-size: 1.4em;
    margin-right: 2px;
    animation: shineEmoji 1.15s cubic-bezier(.71, .09, .27, .98) 0.14s 1;
    filter: drop-shadow(0 0 9px #fff9);
}

.block-extra-emoji-ui {
    font-size: 1.4em;
    transition: filter .28s cubic-bezier(.62, .14, .31, .99), color .18s;
    filter: none;
    line-height: 1;
}

.block-extra-title-ui:hover .block-extra-emoji-ui {
    filter: brightness(1.35) drop-shadow(0 0 14px #fff6) drop-shadow(0 0 8px var(--accent, #9df3a7));
    color: var(--accent, #44e77a);
}

/* Seta */
.faq-arrow {
    display: flex;
     margin: 0 0 0 2px;
    align-items: center;
    transition: transform .3s cubic-bezier(.72, .1, .18, .93);
    color: #b3b8cc;
    height: 21px;
}

.faq-arrow.open {
    transform: rotate(180deg);
}

/* Label */
.block-extra-label-ui {
    text-transform: uppercase;
    font-size: 1.1em;
    letter-spacing: 0.03em;
    font-weight: bold;
    margin-left: 2px;
    color: inherit;
    line-height: 1.1;
}

/* Conteúdo */
.block-extra-content-ui {
    padding: 1.2em 1.3em 1.3em 2.0em;
    font-size: 1.15rem;
    color: #e9f1fb;
    font-weight: 500;
    line-height: 1.67;
    letter-spacing: 0.01em;
}

.block-extra-divider {
    border-bottom: 1.2px solid rgba(255, 255, 255, 0.08);
    margin: 0 1.3em 0.1em 1.3em;
}

/* FAQ animação */
.faq-slide-enter-active,
.faq-slide-leave-active {
    transition: max-height 0.35s cubic-bezier(.72, .1, .18, .93), opacity 0.18s;
    overflow: hidden;
}

.faq-slide-enter-from,
.faq-slide-leave-to {
    max-height: 0;
    opacity: 0;
}

.faq-slide-enter-to,
.faq-slide-leave-from {
    max-height: 500px;
    opacity: 1;
}

/* Responsivo */
@media (max-width: 600px) {
    .block-extra-ui {
        padding-left: 0;
        padding-right: 0;
        font-size: 0.98rem;
    }

    .block-extra-title-ui {
        font-size: 1.08rem;
        padding: 1.08em 0.6em;
    }

    .block-extra-content-ui {
        font-size: 0.99rem;
        padding: 1em 0.6em 1.2em 1.4em;
    }

    .block-extra-divider {
        margin: 0 0.6em 0.1em 0.6em;
    }
}
</style>
