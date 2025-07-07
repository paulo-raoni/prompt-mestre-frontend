<template>
    <div class="block-extra-ui glass-fade-in" :style="`background:${bgColor};`">
        <button class="block-extra-title-ui" @click="toggle" :aria-expanded="open">
            <span class="block-extra-emoji-ui emoji-shine" :style="`color: ${accent}`">{{ emoji }}</span>
            <span class="block-extra-label-ui" :style="`color:${accent}`">{{ label }}</span>
            <span class="faq-arrow" :class="{ open }">
                <!-- Seta SVG bonitinha -->
                <svg width="21" height="21" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9" stroke="currentColor" stroke-width="2.4" fill="none"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </span>
        </button>
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
    background: var(--bg, rgba(34, 36, 46, 0.01));
    border-radius: 0;
    /* quase flat, ou 0 */
    box-shadow: none;
    /* ou um shadow super leve: 0 2px 12px #2232  */
    margin-bottom: 2.1rem;
    min-width: 0;
    max-width: 68rem;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    backdrop-filter: blur(13px) saturate(1.2);
    -webkit-backdrop-filter: blur(13px) saturate(1.2);
    transition: background .22s, filter .22s;
    opacity: 0;
    animation: fadeInBlock 0.85s cubic-bezier(.62, .14, .31, .99) forwards;
    padding: 0;
    /* O padding entra só no conteúdo para ficar igual FAQ */
    overflow: hidden;
}


/* Fade in */
@keyframes fadeInBlock {
    0% {
        opacity: 0;
        transform: translateY(26px) scale(0.99);
        filter: blur(4px);
    }

    70% {
        opacity: 1;
        filter: blur(0.5px);
    }

    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
    }
}

.block-extra-title-ui {
    display: flex;
    align-items: center;
    width: 100%;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1.17rem;
    font-weight: 900;
    padding: 1.05em 1.1em;
    gap: 13px;
    letter-spacing: 0.04em;
    transition: background .17s;
    border-radius: 0;
    user-select: none;
}

.block-extra-title-ui:hover {
    background: rgba(255, 255, 255, 0.025);
}

/* Shine animado no emoji */
.emoji-shine {
    font-size: 1.35em;
    margin-right: 6px;
    animation: shineEmoji 1.15s cubic-bezier(.71, .09, .27, .98) 0.14s 1;
    filter: drop-shadow(0 0 9px #fff9);
}

.block-extra-emoji-ui {
    font-size: 1.35em;
    margin-right: 6px;
    transition: filter .28s cubic-bezier(.62, .14, .31, .99), color .18s;
    filter: none;
}

.block-extra-ui:hover .block-extra-emoji-ui {
    filter: brightness(1.35) drop-shadow(0 0 14px #fff6) drop-shadow(0 0 8px var(--accent, #9df3a7));
    color: var(--accent, #44e77a);
    /* Opcional: muda levemente o tom no hover */
}

@keyframes shineEmoji {
    0% {
        filter: brightness(0.55) drop-shadow(0 0 0 #fff0);
    }

    50% {
        filter: brightness(1.5) drop-shadow(0 0 13px #fff7);
    }

    82% {
        filter: brightness(1.13) drop-shadow(0 0 3px #fff7);
    }

    100% {
        filter: none;
    }
}

.faq-arrow {
    display: flex;
    align-items: center;
    margin-left: auto;
    transition: transform .3s cubic-bezier(.72, .1, .18, .93);
    color: #b3b8cc;
}

.faq-arrow.open {
    transform: rotate(180deg);
}

.block-extra-label-ui {
    text-transform: uppercase;
    font-size: 1.1em;
    letter-spacing: 0.03em;
    font-weight: bold;
    margin-left: 2px;
    color: inherit;
}

.block-extra-content-ui {
    padding: 1.2em 1.3em 1.3em 2.0em;
    /* Mantém estilo glass */
    font-size: 1.15rem;
    color: #e9f1fb;
    font-weight: 500;
    line-height: 1.67;
    letter-spacing: 0.01em;
}

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

@media (max-width: 600px) {
    .block-extra-ui {
        padding: 1.1em 0.9em 0.8em 0.7em;
        font-size: 0.98rem;
    }

    .block-extra-title-ui {
        font-size: 1.08rem;
    }

    .block-extra-content-ui {
        font-size: 0.99rem;
    }
}
</style>
