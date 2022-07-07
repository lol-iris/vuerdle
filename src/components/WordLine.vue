<script setup lang="ts">
import type { PropType } from "vue";
import type { Feedback } from "@/stores/vuerdle";
import LetterCard from "./LetterCard.vue";

defineProps({
  word: { type: String, required: true },
  feedback: { type: Array as PropType<Feedback[]>, required: false },
  size: { type: String, required: false, default: "62.5px" },
  alignment: { type: String, required: false, default: "center" },
});
</script>

<template>
  <div class="line">
    <template v-if="!feedback">
      <letter-card
        v-for="(letter, index) of word"
        :key="index"
        :letter="letter"
        :size="size"
      />
    </template>
    <template v-else>
      <letter-card
        v-for="(entry, index) in feedback"
        :key="index"
        :letter="entry.letter"
        :feedback="entry.feedback"
        :flip-delay="index"
        :size="size"
      />
    </template>
  </div>
</template>

<style scoped>
.line {
  display: flex;
  justify-content: v-bind(alignment);
}
.flip-enter-active {
  animation: flip 1s;
}
@keyframes flip {
  0% {
    transform: rotateX(180deg);
  }

  100% {
    transform: rotateX(0deg);
  }
}
</style>
