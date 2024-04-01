<script setup lang="ts">
  import RemoveIcon from '@/icons/remove.svg'
  import { useAppStore } from '@/stores/AppStore';

  const store = useAppStore()



  // Установить новую активную категорию
  const setNewActiveCategory = (index: number) => {
    store.activeCategoryIndex = index
    store.setCorrectInputs()
  }

  // Удалить категорию
  const removeCategory = (index: number) => {
    store.resetAllDropDowns()

    // Уменьшение общего расхода за текущий месяц
    store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.sum -= store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[index].sum

    // Если есть всего одна категория, то удаляем активный месяц
    if(store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories.length === 1) {
      store.data.years[store.activeYearIndex].months.splice(store.activeMonthIndex, 1)
      store.activeMonthIndex = 0
      store.activeCategoryIndex = 0

      // Если нет месяцев в году, то удаляем этот год
      if(store.data.years[store.activeYearIndex].months.length === 0) {
        store.data.years.splice(store.activeYearIndex, 1)
        store.activeYearIndex = 0
      } 
      return
    } 

    // Если активная категория и та, которую удаляем, одна и та же
    if(store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].article === store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[index].article) {
      
      // Если активная категория последня в списке
      if(store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories.length - 1 === store.activeCategoryIndex) {
        store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories.splice(index, 1)
        // Изменяем индекс активной категории, чтобы отображалась та категория, что была выше
        store.activeCategoryIndex = store.activeCategoryIndex - 1
      } else {
        store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories.splice(index, 1)
      }
    } else {
      if(index < store.activeCategoryIndex) {
        store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories.splice(index, 1)
        // Изменяем индекс активной категории, чтобы отображалась та категория, что была выше
        store.activeCategoryIndex = store.activeCategoryIndex - 1
      } else {
        store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories.splice(index, 1)
      }
    }


  }
</script>

<template>
  <TransitionGroup name="categoryAnimation">
    <div class="category" v-for="(category, index) in store.data.years[store.activeYearIndex]?.months[store.activeMonthIndex]?.month.categories" :key="category.id" @click="setNewActiveCategory(index)">
      <button class="category__removeBtn" @click.stop="removeCategory(index)">
        <div class="category__iconBlock" :style="`background-color: ${category.articleColor}`">
          <img :src="category.icon" alt="">
        </div>
        <RemoveIcon class="category__removeBtnIcon"/>
      </button>
      <div class="category__article">
        <h3>{{ category.article }}</h3>
        <h3 style="overflow-wrap: anywhere;">{{ category.sum.toLocaleString() }}</h3>
        <div class="category__gprogressBar">
          <div :style="`height: 5px; width: ${(category.sum * 100) / store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.sum}%; background-color: ${category.articleColor}; transition: .3s`"></div>
          <span class="category__gprogressBarPercent" :style="`color: ${category.articleColor}`">{{ category.sum == 0 ? '0' : Math.round((category.sum * 100) / store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.sum) }}%</span>
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>

<style scoped lang="scss">
.category {
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 400px;
  width: 100%;
  padding: 10px 5px;
  margin-bottom: 10px;
  border-bottom: 1px solid black;
  cursor: pointer;
  transition: .3s;

  &:hover {
    background-color: rgb(204, 232, 255);
  }

  .category__removeBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px; 
    height: 35px;
    border: none;
    border-radius: 100%; 
    background-color: transparent;
    cursor: pointer;
    .category__iconBlock {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px; 
      height: 35px;
      border: none;
      border-radius: 100%; 
    }

    .category__removeBtnIcon {
      display: none;
    }

    &:hover, &:focus {
      border-radius: 0px;
      .category__iconBlock {
        display: none;
      }
      .category__removeBtnIcon {
        display: block;
        fill: red;
        transform: scale(1.4);
      }
    }
  }

  .category__article {
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-grow: 1;
    align-items: center;
    .category__gprogressBar {
      position: absolute;
      bottom: -13px;
      display: flex;
      align-items: center;
      gap: 5px;
      width: 100%;

      .category__gprogressBarPercent {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}


.categoryAnimation-enter-active,
.categoryAnimation-leave-active {
  transition: all 0.4s ease;
}
.categoryAnimation-enter-from,
.categoryAnimation-leave-to {
  opacity: 0;
  transform: translateX(-130px);
}
.categoryAnimation-move {     
  transition: all 0.4s ease;
}
</style>