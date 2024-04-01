<script setup lang="ts">
  import { useAppStore } from '@/stores/AppStore';

  const store = useAppStore()
</script>

<template>
  <div v-if="store.data.years[store.activeYearIndex]?.months[store.activeMonthIndex]" class="diagram" :style="store.background" :class="{'none': store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.sum == 0}">
    <div class="diagram__inside">
    <div>{{ Number(String(store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.sum).slice(0,9)).toLocaleString() }}</div>
    <div>{{ store.data.years[store.activeYearIndex]?.months[store.activeMonthIndex]?.month.name }}</div>
    <div>{{ store.data.years[store.activeYearIndex]?.name }}</div></div> 
  </div>
</template>

<style scoped lang="scss">
.diagram {
  position: relative;
  width: 220px;
  height: 220px;  
  border-radius: 50%;

  &.none {
    background-color: grey;
  }
  .diagram__inside {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 170px;
    height: 170px;
    border-radius: 50%;
    background-color: white;
    transform: translateX(-50%) translateY(-50%);
    font-size: 25px;
    font-weight: bold;
  }
}
</style>