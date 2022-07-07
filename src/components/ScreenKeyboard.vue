<script lang="ts" setup>
import { useVuerdleStore } from "@/stores/vuerdle";
import { computed } from "vue";
import { storeToRefs } from "pinia";

const emit = defineEmits(["command"]);

const { guesses } = storeToRefs(useVuerdleStore());
const mappedGuesses = computed(() =>
  guesses.value.flatMap((guess) => guess.feedback)
);

const keys = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "\n",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "\n",
  "↵",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  "⌫",
];

const keysWithFeedback = computed(() => {
  return keys.map((key) => {
    return {
      key: key,
      feedback:
        mappedGuesses.value
          .filter((guess) => guess.letter === key)
          .map((guess) => guess.feedback)
          .sort()
          .at(0) ?? null,
    };
  });
});

function click(key: string) {
  if (key === "⌫") {
    emit("command", new KeyboardEvent("keydown", { key: "Backspace" }));
  } else if (key === "↵") {
    emit("command", new KeyboardEvent("keydown", { key: "Enter" }));
  } else {
    emit("command", new KeyboardEvent("keydown", { key: key }));
  }
}
</script>

<template>
  <div class="keyboard">
    <template v-for="key in keysWithFeedback" :key="key.key">
      <div v-if="key.key === '\n'" class="line-break" />
      <div
        v-else
        class="key"
        @click="click(key.key)"
        :class="{
          'control-key': key.key === '⌫' || key.key === '↵',
          [`feedback-${key.feedback}`]: key.feedback,
        }"
      >
        {{ key.key.toUpperCase() }}
      </div>
    </template>
  </div>
</template>

<style scoped>
.keyboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.line-break {
  flex-basis: 100%;
  width: 0px;
  height: 0px;
  overflow: hidden;
}
.key {
  height: 58px;
  width: 43px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 4px;

  background-color: var(--key-bg);
  color: var(--key-text-color);
  border-radius: 4px;

  cursor: pointer;
  font-size: calc(40px / 3);
  font-weight: bold;
}
.control-key {
  width: 65.406px;
  font-size: 1.2rem;
  font-weight: normal;
}
.feedback-b {
  background-color: var(--key-bg-correct);
}
.feedback-c {
  background-color: var(--key-bg-present);
}
.feedback-i {
  background-color: var(--key-bg-absent);
}

.feedback-b,
.feedback-c,
.feedback-i {
  color: var(--key-evaluated-text-color);
  transition-delay: 2.5s;
}
</style>
