<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { LetterFeedback } from "../stores/vuerdle";

const props = defineProps({
  letter: { type: String, required: true },
  feedback: { type: String as () => LetterFeedback, required: false },
  flipDelay: { type: Number, required: false },
  size: { type: String, required: false, default: "62.5px" },
});

const card = ref<HTMLDivElement>();

onMounted(() => {
  if (props.feedback) {
    setTimeout(() => {
      if (card.value) {
        card.value.classList.toggle("flip");
        card.value.classList.toggle(`feedback-${props.feedback}`);
      }
    }, (props.flipDelay ?? 0) * 500);
  }
});
</script>

<template>
  <div class="card" :class="letter !== ' ' ? 'filled ' : ''" ref="card">
    {{ letter.toUpperCase() }}
  </div>
</template>

<style scoped>
.card {
  width: v-bind(size);
  height: v-bind(size);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
  font-weight: bold;
  margin: 2.5px;
  border: 2px solid var(--color-tone-4);
}
.filled {
  border: 2px solid var(--color-tone-3);
}
.feedback-b {
  background-color: var(--color-correct);
}
.feedback-c {
  background-color: var(--color-present);
}
.feedback-i {
  background-color: var(--color-absent);
}
.feedback-b,
.feedback-c,
.feedback-i {
  border: none;
  color: var(--tile-text-color);
}
/* Animations */
.filled {
  animation: fill 0.25s ease-in;
}
@keyframes fill {
  0% {
    transform: scale(0.975);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}
.flip {
  animation: flip 0.5s ease-in-out;
  animation-delay: var(--animation-delay);
}
@keyframes flip {
  0% {
    transform: rotateX(90deg);
  }
}
</style>
