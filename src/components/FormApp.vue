<script setup lang="ts">
  import { useAppStore } from '@/stores/AppStore';
import type { IDay, IExpense } from '@/types/typyes';

  const store = useAppStore()



  // Проверка правильности заполнения формы
  const checkCorrectForm = () => {
    store.notificationCorrectForm = true
    setTimeout(() => {
      store.notificationCorrectForm = false
    }, 2000);

    store.dayInput === null || store.dayInput === 0 ? store.isCorrectDayInput = false : store.isCorrectDayInput = true
    store.expensesItemInput.length === 0 ? store.isCorrectExpensesItemInput = false : store.isCorrectExpensesItemInput = true
    store.priceInput === null || store.dayInput === 0 ? store.isCorrectPriceInput = false : store.isCorrectPriceInput = true
  }


  // Добавление новых расходов
  const addNewExpensesItem = () => {
  // Если какое-либо поле добавления расхода не заполнено
  if((store.dayInput === 0 || store.dayInput === null) || store.expensesItemInput.length === 0 || (store.priceInput === 0 || store.priceInput === null)) {
    checkCorrectForm()
    return
  }
  // Сохраняем название активной категории, чтобы использовать это для нахождения индекса той категории, у которой такое же название, после сортировки массива - sortCategoris()
  const currentCategoryArticle = store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].article

  // Увеличиваем общую сумму расходов sum за месяц
  store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.sum += store.priceInput
  // Увеличение sum - всех расходов за этот месяц в этой категории
  store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].sum += store.priceInput


  // Еслт уже ЕСТЬ такой день, который ввел пользователь в инпуте
  if(store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].days.some( day => day.day === store.dayInput)) {
      
    // Находим индекс того дня, который уже СОЗДАН ранее, чтобы потом, используя этот индекс, найти нужный день в массиве дней и добавить в него новый расход
    const dayIndex = store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].days.findIndex( day => day.day === store.dayInput)

    // Новый расход
    const newExpensesItem: IExpense = {
      title: store.expensesItemInput,
      price: store.priceInput,
      id: Date.now()
    }

    // Увеличение общего расхода в этот день
    store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].days[dayIndex].sum += store.priceInput
    // Добавление нового расхода в уже СОЗДАННЫЙ ранее день
    store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].days[dayIndex].expenses.push(newExpensesItem)


    store.sortCategoris()

    // Находим индекс обновленной категории после сортировки массива и заменяем индекс активной категории на индекс обновленной категории, чтобы не сломалась логика добавления нового дня/расхода. Это делается потому что после сортировки массива(сортируем для того, чтобы отображение категорий на странице автоматически перестроилось) все категории могут поменяться местами, а значит и индекс той категории, которая была активна
    const changedActiveCategoryIndex = store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories.findIndex( category => category.article === currentCategoryArticle)
    store.activeCategoryIndex = changedActiveCategoryIndex

  } else {
      const newDay: IDay = {
        day: store.dayInput,
        sum: store.priceInput,
        expenses: [{
          title: store.expensesItemInput,
          price: store.priceInput,
          id: Date.now(),
        }]
      }

      // Добавление нового дня в дни расходов
      store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories[store.activeCategoryIndex].days.push(newDay)
      
      
      store.sortCategoris()

      // Находим индекс обновленной категории после сортировки массива и заменяем индекс активной категории на индекс обновленной категории, чтобы не сломалась логика добавления нового дня/расхода. Это делается потому что после сортировки массива(сортируем для того, чтобы отображение категорий на странице автоматически перестроилось) все категории могут поменяться местами, а значит и индекс той категории, которая была активна
      const changedActiveCategoryIndex = store.data.years[store.activeYearIndex].months[store.activeMonthIndex].month.categories.findIndex( category => category.article === currentCategoryArticle)
      store.activeCategoryIndex = changedActiveCategoryIndex
    }
  }
</script>

<template>
  <form v-if="store.data.years[store.activeYearIndex]?.months[store.activeMonthIndex]?.month.categories.length > 0" class="form">
    <h3>Добавить новый расход</h3>
    <input class="input" :class="{'wrong': !store.isCorrectDayInput}" v-model="store.dayInput" type="number" placeholder="День">
    <input class="input" :class="{'wrong': !store.isCorrectExpensesItemInput}" v-model="store.expensesItemInput" type="text" placeholder="Название расхода">
    <input class="input" :class="{'wrong': !store.isCorrectPriceInput}" v-model="store.priceInput" type="number" placeholder="Цена">
    <button @click.prevent="addNewExpensesItem()">Добавить</button>
  </form>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 300px;
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  background-color: rgb(204, 232, 255);
  text-align: center;

  .input {
    padding: 10px;
    font-size: 16px;

    &.wrong {
      border: 2px solid red;
    }
  }

  button {
    padding: 10px;
    margin-top: 10px;
    background-color: white;
    border: 1px solid black;
    font-size: 16px;
    cursor: pointer;
    transition: .3s;

    &:hover {
      background-color: rgb(123, 196, 255);
    }
  }
}
</style>