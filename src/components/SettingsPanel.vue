<template>
  <pop-up :is-open="value" title="Seetings" @close="close">
    <div class="settings-panel">
      <ul>
        <li>
          <div class="description">
            <h3>Hard Mode</h3>
            <h5>Any revealed hints must be used in subsequent guesses</h5>
          </div>
          <toggle-button
            v-model="store.hardMode"
            class="settings-toggle"
            :disabled="!store.hardMode && !canToggleHardMode"
          />
        </li>
        <li>
          <div class="description">
            <h3>Dark Theme</h3>
          </div>
          <toggle-button v-model="store.darkTheme" class="settings-toggle" />
        </li>
        <li>
          <div class="description">
            <h3>High Contrast</h3>
            <h5>For improved color vision</h5>
          </div>
          <toggle-button v-model="store.highContrast" class="settings-toggle" />
        </li>
        <li>
          <div class="description">
            <h3>Socials</h3>
          </div>
          <div class="socials">
            <a href="https://github.com/lol-iris" class="github">
              <mdicon name="github" />
            </a>
            <a href="https://twitter.com/lol_iris1" class="twitter">
              <mdicon name="twitter" />
            </a>
            <a
              href="https://www.linkedin.com/in/georgiageorgiev/"
              class="linkedin"
            >
              <mdicon name="linkedin" />
            </a>
          </div>
        </li>
      </ul>

      <footer>
        <p>@ 2022 Georgi Georgiev</p>
      </footer>
    </div>
  </pop-up>
</template>

<script setup lang="ts">
import { useVuerdleStore } from "@/stores/vuerdle";
import { computed } from "vue";
import PopUp from "./PopUp.vue";

const emit = defineEmits(["close"]);

defineProps({
  value: { type: Boolean, required: true },
});

const store = useVuerdleStore();

const canToggleHardMode = computed(() => store.guesses.length === 0);

const close = () => emit("close");
</script>

<style scoped>
.settings-panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
ul {
  padding: 0;
  width: 100%;
}
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-tone-4);
}
.settings-toggle {
  --toggle-width: 40px;
  --toggle-bg-on: var(--color-correct);
  --toggle-bg-off: var(--color-tone-3);
  --toggle-border-on: var(--color-correct);
  --toggle-border-off: var(--color-tone-3);
  --toggle-ring-color: transparent;
}
.description {
  display: flex;
  flex-direction: column;
  justify-content: start;
  text-align: start;
}
.description > h3,
.description > h5 {
  font-weight: normal;
}
.description > h5 {
  color: var(--color-tone-2);
}
.socials {
  display: flex;
}
.socials > a:not(:last-child) {
  margin-right: 5px;
}
.socials > a:visited,
.socials > a {
  color: var(--color-tone-2);
}
.socials > a.github:hover {
  color: var(--color-github);
}
.socials > a.twitter:hover {
  color: var(--color-twitter);
}
.socials > a.linkedin:hover {
  color: var(--color-linkedin);
}
</style>
