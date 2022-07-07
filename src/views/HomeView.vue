<script setup lang="ts">
import { ref, watch } from "vue";
import { useVuerdleStore } from "@/stores/vuerdle";
import WordLine from "../components/WordLine.vue";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useToast } from "vue-toastification";
import ScreenKeyboard from "../components/ScreenKeyboard.vue";

const store = useVuerdleStore();
const { result, guesses, WORD_LENGTH, MAX_GUESSES } = storeToRefs(store);

const toast = useToast();

const EMPTY_WORD = " ".repeat(WORD_LENGTH.value);

const padLines = computed(() => {
  return MAX_GUESSES.value - guesses.value.length - (result.value ? 0 : 1);
});

const currentGuess = ref("");

const currentGuessPadded = computed(() => {
  return currentGuess.value.padEnd(WORD_LENGTH.value, " ");
});

const shake = ref(false);

window.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "r") {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    fetchWord();
  }
});

const shakeTimeout = ref();

async function triggerShake() {
  if (shakeTimeout.value) return;

  shake.value = true;

  shakeTimeout.value = setTimeout(() => {
    shakeTimeout.value = null;
    shake.value = false;
  }, 1000);
}

const isProcessingInput = ref(false);

async function inputHandler(event: KeyboardEvent) {
  if (isProcessingInput.value) return;
  isProcessingInput.value = true;
  if (event.key === "Enter") {
    if (currentGuess.value.length === WORD_LENGTH.value) {
      try {
        await store.addGuess(currentGuess.value);
        currentGuess.value = "";
      } catch (err) {
        triggerShake();
        toast.error(err instanceof Error ? err.message : "Unknwon error");
      }
    } else {
      triggerShake();
      toast.error("Not enough letters");
    }
  } else if (event.key === "Backspace" || event.key === "Delete") {
    if (currentGuess.value.length > 0) {
      currentGuess.value = currentGuess.value.substring(
        0,
        currentGuess.value.length - 1
      );
    }
  } else if (event.key >= "a" && event.key <= "z") {
    if (currentGuess.value.length < WORD_LENGTH.value) {
      currentGuess.value += event.key;
    }
  }
  isProcessingInput.value = false;
}

watch(
  result,
  (newValue) => {
    if (newValue) {
      window.removeEventListener("keydown", inputHandler);
    } else {
      window.removeEventListener("keydown", inputHandler);
      window.addEventListener("keydown", inputHandler);
    }
  },
  {
    immediate: true,
  }
);

const hasLoaded = ref(false);

async function fetchWord() {
  if (hasLoaded.value) toast.success("New word fetched.");
  else hasLoaded.value = true;
  await store.fetchWord();
  currentGuess.value = "";
}

if (store.word?.length === 0) await fetchWord();
</script>

<template>
  <div class="wrapper">
    <div class="guesses">
      <div v-if="result">
        <h2>The word was</h2>
        <word-line :word="store.word" />
        <transition name="bounce">
          <h2 class="result">{{ result }}</h2>
        </transition>
      </div>
      <word-line
        v-for="guess in guesses"
        :key="guess.word"
        :word="guess.word"
        :feedback="guess.feedback"
      />
      <word-line
        v-if="!result"
        :word="currentGuessPadded"
        :class="{ shake: shake }"
      />
      <template v-if="padLines > 0">
        <word-line
          v-for="padLine in padLines"
          :key="padLine"
          :word="EMPTY_WORD"
        />
      </template>
    </div>

    <screen-keyboard @command="inputHandler" />
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.result {
  margin: 15px 0;
}
.guesses {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  flex-grow: 1;
}
.guesses > h2 {
  font-family: "Quicksand";
}
/* Animation */
.bounce-enter-active {
  animation: bounce 0.5s;
}

.bounce-leave-active {
  animation: bounce 0.5s reverse;
}

@keyframes bounce {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

.shake {
  animation: shake 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
