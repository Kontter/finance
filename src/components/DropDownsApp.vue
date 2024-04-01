<script setup lang="ts">
  import { ref } from 'vue';
  import { useAppStore } from '@/stores/AppStore';
  import type { IMonthWrapper, IYear, ICategory } from '@/types/typyes';

  const store = useAppStore()

  // Для отображения в dropDown добавления ноового года
  const years = ref([
    {name: 2024, months: []},
    {name: 2025, months: []},
    {name: 2026, months: []},
    {name: 2027, months: []},
    {name: 2028, months: []},
    {name: 2029, months: []},
  ])

  // Для отображения в dropDown добавления ноового месяца
  const months = ref([ 
    {month: 
      {
        name: 'Декабрь',
        monthForDays: 'Декабря',
        sort: 12, 
        heightPercent: 0,
        sum: 0,
      }
    },
    {month: {
      name: 'Январь',
      monthForDays: 'Января',
      sort: 1, 
      heightPercent: 0,
      sum: 0,
    }},
    {month: {
      name: 'Февраль',
      monthForDays: 'Февраля',
      sort: 2, 
      heightPercent: 0,
      sum: 0,
    }},
    {month: {
      name: 'Март',
      monthForDays: 'Марта',
      sort: 3, 
      heightPercent: 0,
      sum: 0,
    }},
    {month: {
      name: 'Апрель',
      monthForDays: 'Апреля',
      sort: 4, 
      heightPercent: 0,
      sum: 0,
    }},
    {month: {
      name: 'Май',
      monthForDays: 'Мая',
      sort: 5, 
      heightPercent: 0,
      sum: 0,
    }},
    {month: {
      name: 'Июнь',
      monthForDays: 'Июня',
      sort: 6,
      heightPercent: 0,
      sum: 0, 
    }},
    {month: {
      name: 'Июль',
      monthForDays: 'Июля',
      sort: 7, 
      heightPercent: 0,
      sum: 0,
    }},
    {month: {
      name: 'Август',
      monthForDays: 'Августа',
      sort: 8, 
      heightPercent: 0,
      sum: 0,
    }},
    {month: {
      name: 'Сентябрь',
      monthForDays: 'Сентября',
      sort: 9, 
      heightPercent: 0,
      sum: 0,
    }},
    {month: {
      name: 'Октябрь',
      monthForDays: 'Октября',
      sort: 10, 
      heightPercent: 0,
      sum: 0,
    }},
    {month: {
      name: 'Ноябрь',
      monthForDays: 'Ноября',
      sort: 11, 
      heightPercent: 0,
      sum: 0,
    }},
  ])

  // Для отображения в dropDown добавления ноовой категории
  const categories = [
    {
      article: 'Магазины',
      articleColor: 'rgb(0, 175, 200)',
      sum: 0,
      icon: '/finance/src/icons/shoppingCart.svg',
    },
    {
      article: 'Кафе и рестораны',
      articleColor: 'rgb(56, 79, 172)',
      sum: 0,
      icon: '/finance/src/icons/restaurant.svg',
    },
    {
      article: 'ЖКХ',
      articleColor: 'rgb(241 71 241)',
      sum: 0,
      icon: '/finance/src/icons/house.svg',
    },
    {
      article: 'Красота и здоровье',
      articleColor: 'green',
      icon: '/finance/src/icons/health.svg',
      sum: 0,
    },
    {
      article: 'Транспорт',
      articleColor: 'rgb(240, 160, 53)',
      icon: '/finance/src/icons/transports.svg',
      sum: 0,
    },
    {
      article: 'Досуг и развлечения',
      articleColor: 'rgb(244, 55, 121)',
      icon: '/finance/src/icons/rest.svg',
      sum: 0,
    },
    {
      article: 'Аптека',
      articleColor: 'rgb(25 205 103)',
      icon: '/finance/src/icons/medication.svg',
      sum: 0,
    },
    {
      article: 'Питомцы',
      articleColor: 'rgb(221 81 33)',
      icon: '/finance/src/icons/pets.svg',
      sum: 0,
    },
    {
      article: 'Одежда и аксессуары',
      articleColor: 'rgb(23 126 217)',
      icon: '/finance/src/icons/clothes.svg',
      sum: 0,
    },
    {
      article: 'Телефон и интернет',
      articleColor: 'rgb(120 87 215)',
      icon: '/finance/src/icons/phone.svg',
      sum: 0,
    },
    {
      article: 'Сервис и услуги',
      articleColor: 'rgb(221 208 31)',
      icon: '/finance/src/icons/service.svg',
      sum: 0,
    },
    {
      article: 'Отели',
      articleColor: 'rgb(98 211 78)',
      icon: '/finance/src/icons/hotel.svg',
      sum: 0,
    },
    {
      article: 'Переводы',
      articleColor: 'rgb(151 201 217)',
      icon: '/finance/src/icons/transfer.svg',
      sum: 0,
    },
    {
      article: 'Онлайн-маркеты',
      articleColor: 'rgb(182 120 227)',
      icon: '/finance/src/icons/onlineStore.svg',
      sum: 0,
    },
    {
      article: 'Другое',
      articleColor: 'rgb(129, 91, 78)',
      icon: '/finance/src/icons/other.svg',
      sum: 0,
    },
  ]
  

  // Добавление нового года
  const addNewYear = (newYear: IYear) => {

    // Если среди годов пользоваетеля нет такого же года, который пользователь нажал, то добавляем его
    if(!store.data.years.some( year => year.name === newYear.name)) {
      store.data.years.push(newYear)

      store.data.years.sort((a, b) => a.name - b.name)
      store.activeYearIndex = store.data.years.findIndex( year => year.name === newYear.name)
      store.newYearDropDown = false
    } else {
      // В противном случаем показываем уведомление о том, что такой год уже есть
      store.notificationYearAlready = true
      setTimeout(() => {
        store.notificationYearAlready = false
      }, 2000);
    }
  }

  // Добавление нового месяца
  const addNewMonth = (newMonth: IMonthWrapper) => {
    if(!store.data.years[store.activeYearIndex]) {
      checkCorrectData()
    }
    // Если среди месяцев пользоваетеля нет такого же месяца, который пользователь нажал, то добавляем его
    if(!store.data.years[store.activeYearIndex]?.months.some( month => month.month.name === newMonth.month.name)) {
      store.data.years[store.activeYearIndex]?.months.push({month: {...newMonth.month, categories: []}})

      store.data.years[store.activeYearIndex]?.months.sort((a, b) => a.month.sort - b.month.sort)
      store.activeMonthIndex = store.data.years[store.activeYearIndex]?.months.findIndex( month => month.month.name === newMonth.month.name)
      store.activeCategoryIndex = 0
          
      store.newMonthDropDown = false
    } else {
      // В противном случае показываем уведомление о том, что такой месяц уже есть
      store.notificationMonthAlready = true
      setTimeout(() => {
        store.notificationMonthAlready = false
      }, 2000);
    }
  }

  // Добавление новой категории
  const addNewCategory = (newCategory: ICategory) => {
    checkCorrectData()

    // Если среди категорий пользоваетеля нет такой же категории, которую пользователь нажал, то добавляем её
    if(!store.data.years[store.activeYearIndex]?.months[store.activeMonthIndex]?.month.categories.some( (category: ICategory) => category.article === newCategory.article)) {
      store.data.years[store.activeYearIndex]?.months[store.activeMonthIndex]?.month.categories.push({...newCategory, id: Date.now(), days: [],})
      store.activeCategoryIndex = store.data.years[store.activeYearIndex]?.months[store.activeMonthIndex]?.month.categories.length - 1
      
      store.categoryDropDown = false
    } else {
      // В противном случае показываем уведомление о том, что такоая категория уже есть
      store.notificationCategoryAlready = true
      setTimeout(() => {
        store.notificationCategoryAlready = false
      }, 2000);
    }
  }


  // Установить другой год
  const setNewActiveYear = (newIndex: number) => {
    store.currentYearDropDown = false
    store.activeYearIndex = newIndex
    store.activeMonthIndex = 0
    store.setCorrectInputs()
  }

  // Установить другой месяц
  const setNewActiveMonthIndex = (newIndex: number = 0) => {
    store.currentMonthDropDown = false
    store.activeMonthIndex = newIndex
    store.activeCategoryIndex = 0
    store.sortCategoris()
    store.changeCircularDiagram()
    store.setCorrectInputs()
    store.checkMonthsDiagrams()
  }



  // Открытие и закрытие dropDown с выбором существующих годов
  const setCurrentYearDropDown = () => {
    // Если есть года, из которых можно выбрать
    if(store.data.years.length) {
      store.currentYearDropDown = !store.currentYearDropDown
    }
  }

  // Открытие и закрытие dropDown с выбором существующих месяцев
  const setCurrentMonthDropDown = () => {
    // Если есть месяца, из которых можно выбрать
    if(store.data.years[store.activeYearIndex]?.months.length) {
      store.currentMonthDropDown = !store.currentMonthDropDown
    }
  }


  // Проверка на наличие выбранного года и месяца
  const checkCorrectData = () => {
    // Если год не выбран, то показываем уведомление о необходимости выбора года
    if(store.data.years.length == 0) {
      store.notificationYear = true
      setTimeout(() => {
        store.notificationYear = false
      }, 2000);
      return
    }

    // Если месяц не выбран, то показываем уведомление о необходимости выбора месяца
    if(store.data.years[store.activeYearIndex].months.length == 0) {
      store.notificationMonth = true
      setTimeout(() => {
        store.notificationMonth = false
      }, 2000);
    }
  }
</script>

<template>
  <div class="currentDate">
    <div class="currentDate__DropDownWrapper">
      <div class="dropDownMainButtonWrapper">
        <button class="dropDownMainButton" @click.stop="setCurrentYearDropDown()">{{ store.data.years.length > 0 ? store.data.years[store.activeYearIndex]?.name : 'Нет данных' }} {{ store.data.years[store.activeYearIndex]?.months.length > 0 ? `(${store.data.years[store.activeYearIndex]?.months.length})` : '' }}</button>
        <div v-if="store.data.years.length > 0" @click.stop="setCurrentYearDropDown()" class="dropDownMainButton__arrow" :class="{'active': store.currentYearDropDown}"></div>
      </div>
      <div class="yearDropDown" :class="{'active': store.currentYearDropDown}">
        <button
          v-for="(year, index) in store.data.years" :key="year.name"  
          @click.stop="setNewActiveYear(index)"
          class="yearDropDown__button"
        >
          {{ year.name }}
        </button>
      </div>
    </div>
      <div class="currentDate__DropDownWrapper">
        <div class="dropDownMainButtonWrapper">
          <button class="dropDownMainButton" @click.stop="setCurrentMonthDropDown()">{{ store.data.years[store.activeYearIndex]?.months.length > 0 ? store.data.years[store.activeYearIndex]?.months[store.activeMonthIndex]?.month.name : 'Нет данных' }} {{ store.data.years[store.activeYearIndex]?.months[store.activeMonthIndex]?.month.categories.length > 0 ? `(${store.data.years[store.activeYearIndex]?.months[store.activeMonthIndex]?.month.categories.length})` : '' }}</button>
          <div v-if="store.data.years[store.activeYearIndex]?.months.length > 0" @click.stop="setCurrentMonthDropDown()" class="dropDownMainButton__arrow" :class="{'active': store.currentMonthDropDown}"></div>
        </div>
        <div class="monthDropDown" :class="{'active': store.currentMonthDropDown}">
          <button 
            v-for="(currentMonth, index) in store.data.years[store.activeYearIndex]?.months" :key="currentMonth.month.name" 
            @click.stop="setNewActiveMonthIndex(index)"
            class="monthDropDown__button"
          >
            {{ currentMonth.month.name }}
          </button>
        </div>
      </div>
  </div>
  
  
  
  
  
  <div class="dropDownMainButtonWrapper" style="width: 300px;">
    <button class="dropDownMainButton" @click.stop="store.newYearDropDown = !store.newYearDropDown">Добавить год</button>
    <div @click.stop="store.newYearDropDown = !store.newYearDropDown" class="dropDownMainButton__arrow" :class="{'active': store.newYearDropDown}"></div>
  </div>
  <div class="yearDropDown" :class="{'active': store.newYearDropDown}">
    <button class="yearDropDown__button" @click.stop="addNewYear(year)" v-for="year of years" :key="year.name">
      {{ year.name }}
    </button>
  </div>
  
  
  <div class="dropDownMainButtonWrapper" style="width: 300px;">
    <button class="dropDownMainButton" @click.stop="store.newMonthDropDown = !store.newMonthDropDown">Добавить месяц</button>
    <div @click.stop="store.newMonthDropDown = !store.newMonthDropDown" class="dropDownMainButton__arrow" :class="{'active': store.newMonthDropDown}"></div>
  </div>
  <div class="monthDropDown" :class="{'active': store.newMonthDropDown}">
    <button class="monthDropDown__button" @click.stop="addNewMonth(month)" v-for="month in months" :key="month.month.name">
      {{ month.month.name }}
    </button>
  </div>
  
  
  <div class="dropDownMainButtonWrapper" style="width: 300px;">
    <button class="dropDownMainButton" @click.stop="store.categoryDropDown = !store.categoryDropDown">Добавить категорию</button>
    <div  @click.stop="store.categoryDropDown = !store.categoryDropDown" class="dropDownMainButton__arrow" :class="{'active': store.categoryDropDown}"></div>
  </div>
  <div class="categoryDropDown" :class="{'active': store.categoryDropDown}">
    <button class="categoryDropDown__button" :style="`background: ${category.articleColor}`" @click.stop="addNewCategory(category)" v-for="category in categories" :key="category.articleColor">
      <img :src="category.icon" alt="Иконка">
      {{ category.article }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.currentDate {
  display: flex;
  max-width: 700px;
  width: 100%;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;

  .currentDate__DropDownWrapper {
    width: 300px;
  }
}

.dropDownMainButtonWrapper {
  position: relative;

  &:hover {
    .dropDownMainButton {
      background-color: rgb(123, 196, 255);
    }
  }
}


.dropDownMainButton {
  position: relative;
  z-index: 10;
  max-width: 300px;
  width: 100%;
  min-height: 40px;
  padding: 10px;
  background-color: rgb(204, 232, 255);
  text-align: left;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 16px;
  transition: .3s;
  cursor: pointer;
}


.dropDownMainButton__arrow {
    position: absolute;
    top: 50%;
    right: 10px;
    width: 20px;
    height: 20px;
    transform: translateY(-50%);
    background-image: url(@/icons/arrow.svg);
    background-repeat: no-repeat;
    background-size: 30px;
    background-position: center;
    z-index: 20;
    cursor: pointer;
    transition: .3s;

    &.active {
      transform: translateY(-50%) rotate(-180deg)
    }
  }
.categoryDropDown {
  position: relative;
  top: -35px;
  visibility: hidden;
  display: flex;
  flex-wrap: wrap;
  max-width: 302px; 
  margin-bottom: -450px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: rgb(204, 232, 255);
  opacity: 0;
  transition: .5s;

  &.active {
      visibility: visible;
      top: 5px;
      margin-bottom: 20px;
      opacity: 1;
    }

  .categoryDropDown__button {
    display: flex; 
    flex-direction: column;
    align-items: center; 
    justify-content: center; 
    gap: 5px;
    width: 100px; 
    padding: 15px; 
    border: none; 
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: .2s;

    &:hover {
      filter: saturate(300%);
    }
  }
}




.monthDropDown {
  position: relative;
  top: -35px;
  visibility: hidden;
  display: flex;
  flex-wrap: wrap;
  max-width: 300px; 
  width: 100%;
  padding: 2px;
  margin-bottom: -170px;
  opacity: 0;
  transition: .3s;

  &.active {
    visibility: visible;
    opacity: 1;
    top: 5px;
    margin-bottom: 20px;
  }

  .monthDropDown__button {
    width: 98px;
    padding: 15px;
    background-color: rgb(204, 232, 255);
    border: 1px solid black;
    cursor: pointer;
    transition: .3s;

    &:hover {
      background-color: rgb(123, 196, 255);
    }
  }
}


.yearDropDown {
  position: relative;
  top: -35px;
  visibility: hidden;
  display: flex;
  flex-wrap: wrap;
  max-width: 300px; 
  width: 100%;
  padding: 2px;
  margin-bottom: -80px;
  opacity: 0;
  transition: .3s;

  &.active {
    visibility: visible;
    opacity: 1;
    top: 5px;
    margin-bottom: 20px;
  }

  .yearDropDown__button {
    width: 98px;
    padding: 15px;
    background-color: rgb(204, 232, 255);
    border: 1px solid black;
    cursor: pointer;
    transition: .3s;

    &:hover {
      background-color: rgb(123, 196, 255);
    }
  }
}
</style>