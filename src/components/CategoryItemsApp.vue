<script setup lang="ts">
  import RemoveIcon from '@/icons/remove.svg'
  import { useAppStore } from '@/stores/AppStore';

  const store = useAppStore()



  
  // Удаление расходов
  const removeExpensesItem = (itemIndex: string, dayIndex: number) => {
    // Сохраняем название активной категории, чтобы использовать это для нахождения индекса той категории, у которой такое же название, после сортировки массива - sortCategoris()
    const currentCategoryArticle = store.data.years[store.activeYearIndex]?.months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].article

    // Находим индекс того расхода, который собираемся удалить
    const expensesItemIndex = store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].days[dayIndex].expenses.findIndex( (el, index) => el.title + index === itemIndex)
    
    // Уменьшение общего расхода в текущей категории
    store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].sum -= store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].days[dayIndex].expenses[expensesItemIndex]?.price
    // Уменьшение общей суммы за месяц
    store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.sum -= store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].days[dayIndex].expenses[expensesItemIndex].price
    // Уменьшение общего расхода за этот день
    store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].days[dayIndex].sum -= store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].days[dayIndex].expenses[expensesItemIndex].price


    store.sortCategoris()

    // Находим индекс обновленной категории после сортировки массива и заменяем индекс активной категории на индекс обновленной категории, чтобы не сломалась логика удаления нового расхода. Это делается потому что после сортировки массива(сортируем для того, чтобы отображение категорий на странице автоматически перестроилось) все категории могут поменяться местами, а значит и индекс той категории, которая была активна
    const changedActiveCategoryIndex = store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories.findIndex( category => category.article === currentCategoryArticle)
    store.activeCategoryIndex = changedActiveCategoryIndex


    // Если в активной категории есть всего один день и в нем всего один расход, то удаляем эту категорию
    if(store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].days[dayIndex].expenses.length === 1 && store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].days.length === 1) {

      // Если активная категория последняя в списке категорий
      if(store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories.length - 1 === store.activeCategoryIndex) {
        store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories.splice(store.activeCategoryIndex, 1)
        // Изменяем индекс активной категории, чтобы отображалась та категория, что была выше
       store.activeCategoryIndex = store.activeCategoryIndex - 1
      } else {
        store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories.splice(store.activeCategoryIndex, 1)
      }

      // Если в активном месяце нет категорий, то удаляем этот месяц
      if(store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories.length === 0) {
        store.data.years[store.activeYearIndex].months.splice(store.activeMonthIndex, 1)
        store.activeCategoryIndex = 0
        store.activeMonthIndex = 0
      }

      // Если в активном году нет месяцев, то удаляем этот год
      if(store.data.years[store.activeYearIndex].months.length === 0) {
        store.data.years.splice(store.activeYearIndex, 1)
        // Переключаем индекс активного года, чтобы отобразить самый первый 
        store.activeYearIndex = 0
      }
      return
    }
    
    // Если в активной категории в дне, в котором проивзодится удаление расхода, есть всего лишь один расход(длина массива расходов равна 1)
    if(store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].days[dayIndex].expenses.length === 1) {
      // То удаляем весь этот день(т.к в нем и так оставался лишь один расход, который пользователь удалает)
      store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].days.splice(dayIndex, 1)
    } else {
      // В противном случае просто удаляем выбранный расход
      store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].days[dayIndex].expenses = store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].days[dayIndex].expenses.filter( (el, index) => el.title + index !== itemIndex)
    }
  }
</script>

<template>
  <div class="categoryItems" v-if="store.data.years[store.activeYearIndex]?.months[store.activeMonthIndex]?.month.categories[store.activeCategoryIndex]">
    <div class="categoryItems__title">
      <div style="display: flex; gap: 10px; align-items: center; align-self: flex-start;">
        <div class="categoryItems__icon" :style="`background-color: ${store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].articleColor}`">
          <img :src="store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].icon" alt="">
        </div>
        <h3>
          {{ store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex]?.article }}
        </h3>
      </div>
      <h3 style="overflow-wrap: anywhere;">
        {{ store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex]?.sum.toLocaleString() }}
      </h3>
    </div>
    <TransitionGroup name="categoryItemsAnimation">
      <div class="categoryItems__item" :style="`border: 2px solid ${store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].articleColor}`" v-for="(day, dayIndex) in store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex]?.days.sort( (a,b) => a.day - b.day)" :key="day.day">
        <div class="categoryItems__itemTitle">
          <h3 style="flex-shrink: 0;">{{ day.day }} {{ store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.monthForDays }}</h3>
          <h3 style="overflow-wrap: anywhere;">{{ day.sum.toLocaleString() }}</h3>
        </div>
        <TransitionGroup name="categoryItemAnimation">
          <div class="categoryItems__article" v-for="(expensesItem, index) in day.expenses" :key="expensesItem.id">
            <button class="categoryItems__removeExpensesItemButton" @click="removeExpensesItem(expensesItem.title + index, dayIndex)">
              <RemoveIcon/>
            </button>
            <div style="display: flex; justify-content: space-between; gap: 20px;">
              <span style="overflow-wrap: anywhere; min-width: 200px;">
                {{ expensesItem.title }}
              </span>
              <span style="overflow-wrap: anywhere;">
                {{ expensesItem.price.toLocaleString() }}
              </span>
            </div>
        </div>
      </TransitionGroup>
      </div>
  </TransitionGroup>
</div>
</template>

<style scoped lang="scss">
.categoryItems {
display: flex;
flex-direction: column;
gap: 10px;
max-width: 400px;
width: 100%;

.categoryItems__title {
display: flex;
align-items: center;
justify-content: space-between;
gap: 20px;

.categoryItems__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px; 
  height: 35px;
  border: none;
  border-radius: 100%; 
}
}
.categoryItems__item {
display: flex;
flex-direction: column;
gap: 10px;
padding: 10px;

.categoryItems__itemTitle {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
}

.categoryItems__article {
display: flex;
align-items: center;
gap: 10px;

div {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
}

.categoryItems__removeExpensesItemButton {
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover, &:focus {
    svg {
      fill: red;
      transition: .3s;
    }
  }
}
}
}




.categoryItemsAnimation-enter-active,
.categoryItemsAnimation-leave-active {
  transition: all 0.4s ease;
}
.categoryItemsAnimation-enter-from,
.categoryItemsAnimation-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.categoryItemsAnimation-move {     
  transition: all 0.4s ease;
}


.categoryItemAnimation-enter-active,
.categoryItemAnimation-leave-active {
  transition: all .4s ease;
}
.categoryItemAnimation-enter-from,
.categoryItemAnimation-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.categoryItemAnimation-move {     
  transition: all .4s ease;
}
</style>