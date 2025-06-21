<template>
  <Accordion :is-default-open="true">
    <template #title>
      <h2>RECENTS</h2>
    </template>
    <template #body>
      <ul class="recents-container">
        <li v-for="{ link, name, icon } in recentSubredditsData" :key="name">
          <LinkContainer :link="link">
            <div class="recents-container__inner-link">
              <img :src="icon" :alt="name" />
              <span> {{ `r/${name}` }}</span>
            </div>
          </LinkContainer>
        </li>
      </ul>
    </template>
  </Accordion>
</template>

<script setup lang="ts">
import Accordion from '@/components/ui/Accordion.vue'
import LinkContainer from '@/components/ui/LinkContainer.vue'

const recentSubredditsData = [
  {
    link: '/r/aww',
    name: 'aww',
    icon: 'https://a.thumbs.redditmedia.com/A71uOuvJLekakhm6d5jn3SPO2R7IezsXTT72Fq98J30.png',
  },
  {
    link: '/r/eyebleach',
    name: 'EyeBleach',
    icon: 'https://b.thumbs.redditmedia.com/MD9KQJnI4uIuXFUzA3DWabdGKJYceQ1uk2_ktRQXcgY.png',
  },
  {
    link: '/r/cats',
    name: 'Cats',
    icon: 'https://b.thumbs.redditmedia.com/tAT1hlAs4s7wGyszOHRrTVGNOnyZZWazTv6QEtlUHiQ.png',
  },
  {
    link: '/r/askreddit',
    name: 'AskReddit',
    icon: 'https://b.thumbs.redditmedia.com/LSHrisQApf1H5F8nWShTx3_KjTOMc3R_ss3kx3XAyXQ.png',
  },
]
</script>

<style scoped lang="scss">
h2 {
  font-size: 0.75rem;
  font-weight: normal;
  color: var(--reddit-weak-text);
}

.recents-container {
  display: flex;
  flex-direction: column;

  &__inner-link {
    display: flex;
    gap: 0.5rem;

    img {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
    }
  }
}
</style>
