<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useAppStore } from './stores/AppStore';
import DropDownsApp from './components/DropDownsApp.vue';
import CircularDiagramApp from './components/CircularDiagramApp.vue';
import CategoriesApp from './components/CategoriesApp.vue'
import FormApp from './components/FormApp.vue'
import CategoryItemsApp from './components/CategoryItemsApp.vue'
import NotificationsApp from './components/NotificationsApp.vue'
import MonthsDiagramsApp from './components/MonthsDiagramsApp.vue';


  const store = useAppStore()


  const updateMonthsDiagrams = () => {

    if(store.data.years[store.activeYearIndex]?.months) {
      const maxMonthSum = ref(0)
      for(let month of store.data.years[store.activeYearIndex].months) {
  
        let currentMonthSum = 0
  
        for(let category of month.month.categories) {
          currentMonthSum += category.sum
        }
  
        if(currentMonthSum > maxMonthSum.value) {
          maxMonthSum.value = currentMonthSum
        }
      }
  
  
      for(let month of store.data.years[store.activeYearIndex].months) {
  
        let currentMonthSum = 0
  
        for(let category of month.month.categories) {
          currentMonthSum += category.sum
        }
  
        month.month.heightPercent = (currentMonthSum * 100) / maxMonthSum.value
      }
    }
  }


  watch(store.data.years, () => {
    updateMonthsDiagrams()
    store.changeCircularDiagram()
    store.setCorrectInputs()
    store.sortCategoris()
  })

  watch(store.data.years[store.activeYearIndex].months, () => {
    store.checkMonthsDiagrams()
  })

  onMounted(() => {
    updateMonthsDiagrams()
})
</script>

<template>
  <div class="app" @click="store.resetAllDropDowns()">
    <div class="app__content">
      <div class="app__firstPartApp">
        <DropDownsApp/>
        <CircularDiagramApp/>
        <MonthsDiagramsApp/>
        <CategoriesApp/>
      </div>
    
      <div class="app__secondPartApp">
        <FormApp/>
        <CategoryItemsApp/>
      </div>
      <NotificationsApp/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  min-height: 100vh;

  .app__content {
    display: flex;
    gap: 40px;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    .app__firstPartApp {
      position: sticky;
      top: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 620px;
      height: fit-content;
    }
    .app__secondPartApp {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      max-width: 400px;
      width: 100%;
    }
  }
}
</style>