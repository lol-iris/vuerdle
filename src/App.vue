<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import InstructionsPanel from "./components/InstructionsPanel.vue";
import SettingsPanel from "./components/SettingsPanel.vue";
import { useVuerdleStore } from "./stores/vuerdle";

const main = ref();

onMounted(() => main.value.focus());

const isInstructionsPanelOpen = ref(false);
const isSettingsPanelOpen = ref(false);

const { darkTheme, highContrast } = storeToRefs(useVuerdleStore());
</script>

<template>
  <div :class="{ dark: darkTheme, colorblind: highContrast }" id="theme">
    <header>
      <mdicon
        class="icon-button"
        name="help-circle-outline"
        @click="isInstructionsPanelOpen = true"
      />
      <instructions-panel
        :value="isInstructionsPanelOpen"
        @close="isInstructionsPanelOpen = false"
      />
      <h1>Vuerdle</h1>
      <div class="settings">
        <mdicon
          class="icon-button"
          name="cog"
          @click="isSettingsPanelOpen = true"
        />
        <settings-panel
          :value="isSettingsPanelOpen"
          @close="isSettingsPanelOpen = false"
        />
      </div>
    </header>
    <main ref="main">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <Transition name="slide-fade">
            <Suspense>
              <!-- main content -->
              <component :is="Component" />

              <!-- loading state -->
              <template #fallback> Loading... </template>
            </Suspense>
          </Transition>
        </template>
      </router-view>
    </main>
  </div>
</template>

<style src="@vueform/toggle/themes/default.css" />
<style>
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap");

:root {
  --green: #6aaa64;
  --darkendGreen: #538d4e;
  --yellow: #c9b458;
  --darkendYellow: #b59f3b;
  --lightGray: #d3d6da;
  --gray: #86888a;
  --gray-2: #dcdcdc;
  --gray-3: #dfdfdf;
  --darkGray: #939598;
  --white: #fff;
  --black: #212121;
  --black-2: #121212;
  --black-3: #363636;
  --orange: #f5793a;
  --blue: #85c0f9;

  --color-tone-1: #000000;
  --color-tone-2: #787c7e;
  --color-tone-3: #878a8c;
  --color-tone-4: #d3d6da;
  --color-tone-5: #edeff1;
  --color-tone-6: #f6f7f8;
  --color-tone-7: #ffffff;
  --color-tone-8: #121212;
  --color-tone-9: #dfdfdf;
  --color-tone-10: #000000;
  --color-tone-11: #787c7e;
  --color-tone-12: #363636;
  --color-nav-hover: #f4f4f4;
  --opacity-50: rgba(255, 255, 255, 0.5);
  --error-background: #e3e3e1;
  --icon-disabled: #a6a6a6;
}
:root {
  --color-present: var(--yellow);
  --color-correct: var(--green);
  --color-absent: var(--color-tone-2);
  --tile-text-color: var(--color-tone-7);
  --key-text-color: var(--color-tone-1);
  --key-evaluated-text-color: var(--color-tone-7);
  --key-bg: var(--color-tone-4);
  --key-bg-present: var(--color-present);
  --key-bg-correct: var(--color-correct);
  --key-bg-absent: var(--color-absent);
  --modal-content-bg: var(--color-tone-7);
  --color-background: var(--color-tone-7);
  --color-github: #171515;
  --color-twitter: #1da1f2;
  --color-linkedin: #0a66c2;
}
.dark {
  --color-tone-1: #ffffff;
  --color-tone-2: #818384;
  --color-tone-3: #565758;
  --color-tone-4: #3a3a3c;
  --color-tone-5: #272729;
  --color-tone-6: #1a1a1b;
  --color-tone-7: #121213;
  --color-tone-8: #ffffff;
  --color-tone-9: #424242;
  --color-tone-10: #dfdfdf;
  --color-tone-11: #dfdfdf;
  --color-tone-12: #dfdfdf;
  --color-nav-hover: #2f2f31;
  --opacity-50: rgba(0, 0, 0, 0.5);
  --error-background: var(--color-tone-7);
  --color-background: var(--color-tone-7);
  --icon-disabled: #59595a;
}
.dark {
  --color-present: var(--darkendYellow);
  --color-correct: var(--darkendGreen);
  --color-absent: var(--color-tone-4);
  --tile-text-color: var(--color-tone-1);
  --key-text-color: var(--color-tone-1);
  --key-evaluated-text-color: var(--color-tone-1);
  --key-bg: var(--color-tone-2);
  --key-bg-present: var(--color-present);
  --key-bg-correct: var(--color-correct);
  --key-bg-absent: var(--color-absent);
  --modal-content-bg: var(--color-tone-7);
  --color-github: #e8eaea;
  --color-twitter: #1da1f2;
  --color-linkedin: #0a66c2;
}
.colorblind {
  --color-correct: var(--orange);
  --color-present: var(--blue);
  --tile-text-color: var(--white);
  --key-bg-present: var(--color-present);
  --key-bg-correct: var(--color-correct);
  --key-bg-absent: var(--color-absent);
}
#theme {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;

  background-color: var(--color-background);
  color: var(--color-tone-1);
}
* {
  margin: 0;
  box-sizing: border-box;
}
body {
  overflow: hidden;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-tone-4);
  padding: 0 16px;
  height: 50px;
}
header h1 {
  font-size: 37px;
  font-weight: normal;
  font-family: "Alfa Slab One", cursive;
}
footer {
  padding: 5px 0;
}
header,
footer {
  text-align: center;
}
main {
  flex: 1;
  display: flex;
  justify-content: center;

  padding: 15px 0;
}
.icon-button {
  cursor: pointer;
}
.shortcut {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.shortcut > kbd {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5px 10px;

  border: 2px solid var(--color-tone-4);
  border-radius: 5px;
}
.shortcut > kbd:not(:last-child) {
  margin-right: 5px;
}
.shortcut > kbd:not(:first-child) {
  margin-left: 5px;
}
/* Animation */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
</style>
