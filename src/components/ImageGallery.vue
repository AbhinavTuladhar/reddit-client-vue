<template>
  <div class="image-gallery">
    <Swiper
      :modules="modules"
      navigation
      :pagination="{ clickable: true }"
      :slides-per-view="1"
      :slides-per-group="1"
      :allow-touch-move="false"
    >
      <SwiperSlide v-for="{ u, x, y } in images" :key="u">
        <SingleImage
          :image="{
            height: y,
            width: x,
            url: u,
          }"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import type { GalleryImage } from '@/types/media'
import SingleImage from './SingleImage.vue'
defineProps<{ images: GalleryImage[] }>()

const modules = [Navigation, Pagination]
</script>

<style lang="scss">
.image-gallery {
  max-width: 37.5rem;
  img {
    max-width: 40rem;
  }
}

.swiper-button-prev,
.swiper-button-next {
  color: white;
  border-color: white;
}
</style>
