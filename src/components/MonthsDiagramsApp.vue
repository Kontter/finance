<script setup lang="ts">
  import { useAppStore } from '@/stores/AppStore';
  import arrowIcon from '../icons/arrow.svg'
  import type { IMonthWrapper } from '@/types/typyes';

  const store = useAppStore()


  const setPrevElement = () => {
    if(store.start !== 0) {
      store.start -= 1
      store.end -= 1
    }
  }
  const setNextElement = () => {
    if(store.end !== store.data.years[store.activeYearIndex]?.months.length) {
      store.start += 1
      store.end += 1
    }
  }

  // Установить выбранный месяц
  const setActiveMonth = (pickedMonth: IMonthWrapper) => {
    const correctActiveMonthIndex = store.data.years[store.activeYearIndex].months.findIndex( month => month.month.name === pickedMonth.month.name)
    store.activeMonthIndex = correctActiveMonthIndex
    store.activeCategoryIndex = 0
    store.changeCircularDiagram()
    store.sortCategoris()
    store.setCorrectInputs()
}
</script>

<template>
  <div class="monthsDiagrams">
    <button v-if="store.data.years[store.activeYearIndex]?.months.length >= 6" class="monthsDiagrams__prevBtn" @click="setPrevElement()"><arrowIcon class="monthsDiagrams__arrowBtn"/></button>
    <button v-if="store.data.years[store.activeYearIndex]?.months.length >= 6" class="monthsDiagrams__nextBtn" @click="setNextElement()"><arrowIcon class="monthsDiagrams__arrowBtn"/></button>
    <div class="monthsDiagrams__month" v-for="month in store.data.years[store.activeYearIndex]?.months.slice(store.start, store.end)" :key="month.month.name">
      <div class="monthsDiagrams__dataWrapper">
        <div class="monthsDiagrams__sum" :style="`bottom: ${month.month.heightPercent}%`">{{ Number(String(month.month.sum).slice(0,9)).toLocaleString() }}</div>
        <button @click="setActiveMonth(month)" class="monthsDiagrams__diagram" :class="{'active': month.month.name === store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.name}" :style="`height: ${month.month.heightPercent}%;`"></button>
      </div>
      <div>{{ month.month.name }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.monthsDiagrams {
  position: relative;
  display: flex; 
  justify-content: center;
  gap: 20px; 
  align-items: end;
  width: 100%; 
  height: 150px; 
  padding: 10px; 
  margin-top: 40px;
  margin-bottom: 20px;
  font-weight: bold;

  .monthsDiagrams__prevBtn {
    position: absolute;
    left: 0;
    top: 50%;
    display: flex;
    padding: 2px;
    border: none;
    background-color: transparent;
    cursor: pointer;  
    transform: translateY(-50%) rotate(90deg);

    &:hover{
      .monthsDiagrams__arrowBtn {
        fill: red;
      }
    }
  }

  .monthsDiagrams__nextBtn {
    position: absolute;
    right: 0;
    top: 50%;
    display: flex;
    padding: 2px;
    border: none;
    background-color: transparent;
    cursor: pointer;  
    transform: translateY(-50%) rotate(-90deg);

    &:hover{
      .monthsDiagrams__arrowBtn{
        fill: red;
      }
    }
  }

  .monthsDiagrams__arrowBtn {
    transform: scale(1.3);
    transition: .3s;
  }
  .monthsDiagrams__month {
    display: flex; 
    flex-direction: column; 
    gap: 5px; 
    width: 80px; 
    height: 100%; 
    text-align: center;
    
    .monthsDiagrams__dataWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: end;
      height: 100%;
  
      .monthsDiagrams__sum {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
      }
  
      .monthsDiagrams__diagram {
        transform: rotate(180deg);
        background-color: rgb(204, 232, 255);
        border: none;
        cursor: pointer;
        transition: .3s;

        &:hover, &:focus {
          background-color: rgb(123, 196, 255);
        }

        &.active {
          background-color: rgb(123, 196, 255);
        }
      }
    }
  }
}
</style>