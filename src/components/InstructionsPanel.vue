<template>
  <pop-up :is-open="value" title="How To Play">
    <section>
      <p>Guess the <strong>VUERDLE</strong> in six tries.</p>
      <p>
        Each guess must be a valid five-letter word. Hit the enter button to
        submit.
      </p>
      <p>
        After each guess, the color of the tiles will change to show how close
        your guess was to the word.
      </p>
    </section>

    <section>
      <p><strong>Examples</strong></p>
      <word-line
        :word="firstExample.word"
        :feedback="firstExample.feedback"
        size="40px"
        alignment="start"
      />
      <p>
        The letter <strong>W</strong> is in the word and in the correct spot.
      </p>
      <word-line
        :word="secondExample.word"
        :feedback="secondExample.feedback"
        size="40px"
        alignment="start"
      />
      <p>The letter <strong>I</strong> is in the word but in the wrong spot.</p>
      <word-line
        :word="thirdExample.word"
        :feedback="thirdExample.feedback"
        size="40px"
        alignment="start"
      />
      <p>The letter <strong>U</strong> is not in the word in any spot.</p>
    </section>

    <section>
      <p>
        <strong>
          A new VUERDLE will be available with each refresh of the page (or when
          you press
          <div class="shortcut"><kbd>Ctrl</kbd>+<kbd>R</kbd></div>
          )!
        </strong>
      </p>
    </section>
  </pop-up>
</template>

<script setup lang="ts">
import type { Feedback } from "@/stores/vuerdle";
import PopUp from "./PopUp.vue";
import WordLine from "./WordLine.vue";

defineProps({
  value: { type: Boolean, required: true },
});

const firstExample = {
  word: "weary",
  feedback: [
    { letter: "w", feedback: "b" },
    { letter: "e", feedback: null },
    { letter: "a", feedback: null },
    { letter: "r", feedback: null },
    { letter: "y", feedback: null },
  ] as Array<Feedback>,
};

const secondExample = {
  word: "pills",
  feedback: [
    { letter: "p", feedback: null },
    { letter: "i", feedback: "c" },
    { letter: "l", feedback: null },
    { letter: "l", feedback: null },
    { letter: "s", feedback: null },
  ] as Array<Feedback>,
};

const thirdExample = {
  word: "vague",
  feedback: [
    { letter: "v", feedback: null },
    { letter: "a", feedback: null },
    { letter: "g", feedback: null },
    { letter: "u", feedback: "i" },
    { letter: "e", feedback: null },
  ] as Array<Feedback>,
};
</script>

<style scoped>
section:not(:last-child) {
  border-bottom: 1px solid var(--color-tone-4);
}
p {
  text-align: start;
  font-size: 14px;
  margin: 14px 0;
}
</style>
