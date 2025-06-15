<template>
  <div class="accordion" :class="{ active: isActive, hoverable: hasBody }">
    <div class="accordion__title" @click="handleAccordionClick">
      <slot name="title" />
      <div v-if="hasBody" class="caret"></div>
    </div>
    <div v-if="hasBody" class="accordion__body">
      <div>
        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlots } from 'vue'
import { ref } from 'vue'

const isActive = ref(false)

// For checking if the accordion has a body content or not. If not, hide the caret and body.
const slots = useSlots()
const hasBody = computed(() => !!slots.body)

const handleAccordionClick = () => {
  isActive.value = !isActive.value
}
</script>

<style scoped lang="scss">
.accordion {
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    transition: background 0.4s ease-out;
  }

  .caret {
    width: 8px;
    height: 8px;
    min-width: 8px;
    min-height: 8px;
    border: 1px solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    transition: all 0.4s ease-out;
  }

  &__body {
    display: grid;
    grid-template-rows: 0fr;
    transition: all 0.4s ease-out;

    > div {
      overflow: hidden;
    }
  }

  &.active {
    .accordion__body {
      grid-template-rows: 1fr;
      padding-block: 0.5rem;
    }

    .caret {
      transform: rotate(-135deg);
    }
  }

  &.hoverable &__title {
    cursor: pointer;

    &:hover {
      background: var(--reddit-gray);
    }
  }
}
</style>
