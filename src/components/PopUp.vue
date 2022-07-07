<template>
  <transition name="slide">
    <div class="popup" v-if="isOpen">
      <header>
        <div class="spacer" />
        <h3>{{ title }}</h3>
        <mdicon class="icon-button" name="close" @click="close" />
      </header>
      <section class="content">
        <div class="container">
          <slot />
        </div>
      </section>
    </div>
  </transition>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);

defineProps({
  isOpen: { type: Boolean, required: true },
  title: { type: String, required: true },
});

const close = () => emit("close");
</script>

<style scoped>
.popup {
  width: 100vw;
  height: 100vh;
  background-color: var(--color-background);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
}
header {
  display: flex;
  justify-content: space-between;
}
.content {
  padding: 15px 0;
  display: flex;
  justify-content: center;
  flex: 1;
}
.container {
  width: 80%;
  max-width: 500px;
}
/* Animation */
.slide-enter-active {
  animation: slide 0.5s ease;
}
.slide-leave-active {
  animation: slide 0.5s ease reverse;
}
@keyframes slide {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
