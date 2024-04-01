import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { ICategory, IData } from '@/types/typyes'

export const useAppStore = defineStore('appStore', () => {
  
  const data = reactive<IData>({
    years: 
      [
        {
          name: 2024, 
          months:
              [
                {month: 
                  {
                    name: 'Январь',
                    monthForDays: 'Января', 
                    sort: 1,
                    heightPercent: 0,
                    sum: 5645,
                    categories: 
                      [
                        {
                          article: 'Кафе и рестораны',
                          articleColor: 'rgb(56, 79, 172)',
                          sum: 4350,
                          icon: '/src/icons/restaurant.svg',
                          id: 13242352,
                          days:
                          [
                            {
                              day: 1, 
                              sum: 2300,
                              expenses: [{title: 'Расход 1', price: 2050, id: 13123}, {title: 'Расход 2', price: 250, id: 123}]
                            },
                            {
                              day: 25, 
                              sum: 2050,
                              expenses: [{title: 'Расход 1', price: 1500, id: 31241542}, {title: 'Расход 2', price: 100, id: 5434776}, {title: 'Расход 3', price: 450, id: 567812}]
                            },
                          ] 
                        },
                        {
                          article: 'Магазины',
                          articleColor: 'rgb(0, 175, 200)',
                          sum: 1295,
                          icon: '/src/icons/shoppingCart.svg',
                          id: 3652652,
                          days:
                          [
                            {
                              day: 5,
                              sum: 380, 
                              expenses: [{title: 'Расход 1', price: 50, id: 454353}, {title: 'Расход 2', price: 65, id: 2485824}, {title: 'Расход 3', price: 265, id: 489174135}]
                            },
                            {
                              day: 17, 
                              sum: 915,
                              expenses: [{title: 'Расход 1', price: 150, id: 25909417}, {title: 'Расход 2', price: 465, id: 385969071}, {title: 'Расход 3', price: 300, id: 586929742}]
                            },
                          ] 
                        },
                      ],
                  }
                },
    
                {month:
                  {
                    name: 'Февраль',
                    monthForDays: 'Февраля', 
                    sort: 2,
                    heightPercent: 0,
                    sum: 11320,
                    categories: 
                      [
                        {
                          article: 'ЖКХ',
                          articleColor: 'rgb(241 71 241)',
                          sum: 5000,
                          icon: '/src/icons/house.svg',
                          id: 4679268972,
                          days:
                          [
                            {
                              day: 6, 
                              sum: 5000,
                              expenses: [{title: 'Расход 1', price: 5000, id: 34847654}]
                            },
                          ] 
                        },
                        {
                          article: 'Красота и здоровье',
                          articleColor: 'green',
                          sum: 1250,
                          icon: '/src/icons/health.svg',
                          id: 7923569392,
                          days:
                          [
                            {
                              day: 8, 
                              sum: 1050,
                              expenses: [{title: 'Расход 1', price: 1050, id: 847823}]
                            },
                            {
                              day: 15, 
                              sum: 200,
                              expenses: [{title: 'Расход 1', price: 200, id: 3859213125}]
                            },
                          ] 
                        },
                        {
                          article: 'Транспорт',
                          articleColor: 'rgb(240, 160, 53)',
                          icon: '/src/icons/transports.svg',
                          id: 324287597246,
                          sum: 5070,
                          days:
                          [
                            {
                              day: 16, 
                              sum: 5000,
                              expenses: [{title: 'Расход 1', price: 2000, id: 4875725}, {title: 'Расход 2', price: 3000, id: 347634742}]
                            },
                            {
                              day: 24, 
                              sum: 70,
                              expenses: [{title: 'Расход 1', price: 40, id: 34766724}, {title: 'Расход 2', price: 30, id: 6435234}]
                            },
                          ] 
                        },
                      ],
                  }
                }
              ]
        },
      ]
  })

  const activeYearIndex = ref(0)
  const activeMonthIndex = ref(0)
  const activeCategoryIndex = ref(0)

  const newYearDropDown = ref(false)
  const newMonthDropDown = ref(false)
  const categoryDropDown = ref(false)

  const currentYearDropDown = ref(false)
  const currentMonthDropDown = ref(false)

  const dayInput = ref<number | null>(null)
  const isCorrectDayInput = ref(true)
  const expensesItemInput = ref('')
  const isCorrectExpensesItemInput = ref(true)
  const priceInput = ref<number | null>(null)
  const isCorrectPriceInput = ref(true)

  const notificationYear = ref(false)
  const notificationMonth = ref(false)
  const notificationCorrectForm = ref(false)

  const notificationYearAlready = ref(false)
  const notificationMonthAlready = ref(false)
  const notificationCategoryAlready = ref(false)

  const background = ref('background: conic-gradient(')
  const prevStart = ref('')

  const start = ref(0)
  const end = ref(5)





  
  const setCorrectInputs = () => {
    // Убираем у всех инпутов красную обводку
    isCorrectDayInput.value = true
    isCorrectExpensesItemInput.value = true
    isCorrectPriceInput.value = true

    // Обнуляем все инпуты
    dayInput.value = null
    expensesItemInput.value = ''
    priceInput.value = null
  }


   // Отображение кружочка - диаграммы
   const changeCircularDiagram = () => {
    background.value = 'background: conic-gradient('
    prevStart.value = ''

    for(let i = 0; i < data.years[activeYearIndex.value]?.months[activeMonthIndex.value]?.month.categories.length; i++) {
      if(data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[i].article === data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[0].article) {
        background.value += `${data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[i].articleColor} 0deg calc(3.6deg * ${(data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[i].sum * 100) / data.years[activeYearIndex.value].months[activeMonthIndex.value].month.sum}) `
      } else if(data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[i].article === data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories.length - 1].article) {
          if(data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories.length == 2) {
            prevStart.value += ` 3.6deg * ${(data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[i - 1].sum * 100) / data.years[activeYearIndex.value].months[activeMonthIndex.value].month.sum}`
            background.value += `, ${data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[i].articleColor} calc(${prevStart.value}) calc(3.6deg * 100)`
          } else {
            prevStart.value += ` + 3.6deg * ${(data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[i - 1].sum * 100) / data.years[activeYearIndex.value].months[activeMonthIndex.value].month.sum}`
            background.value += `, ${data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[i].articleColor} calc(${prevStart.value}) calc(3.6deg * 100)`
          }
      } else {
          if(data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[i - 1].article === data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[0].article) {
            prevStart.value += ` 3.6deg * ${(data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[i - 1].sum * 100) / data.years[activeYearIndex.value].months[activeMonthIndex.value].month.sum} `
            background.value += `, ${data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[i].articleColor} calc(${prevStart.value}) calc(${prevStart.value} + 3.6deg * ${(data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[i].sum * 100) / data.years[activeYearIndex.value].months[activeMonthIndex.value].month.sum}) `
          } else {
            prevStart.value += ` + 3.6deg * ${(data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[i - 1].sum * 100) / data.years[activeYearIndex.value].months[activeMonthIndex.value].month.sum} `
            background.value += `, ${data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[i].articleColor} calc(${prevStart.value}) calc(${prevStart.value} + 3.6deg * ${(data.years[activeYearIndex.value].months[activeMonthIndex.value].month.categories[i].sum * 100) / data.years[activeYearIndex.value].months[activeMonthIndex.value].month.sum}) `
          }
      }
    }
  } 


  const checkMonthsDiagrams = () => {
    if(start.value - activeMonthIndex.value === 1) {
      start.value -= 1
      end.value -= 1
    }
    if(activeMonthIndex.value < start.value && start.value - activeMonthIndex.value !== 1) {
      const currentStart = start.value
      start.value = start.value - (start.value - activeMonthIndex.value)
      end.value = end.value - (currentStart - activeMonthIndex.value)
    }

    if(activeMonthIndex.value > end.value) {
      start.value = start.value + activeMonthIndex.value - end.value + 1
      end.value = activeMonthIndex.value + 1
    }
    if(activeMonthIndex.value === end.value) {
      end.value += 1
      start.value += 1
    }
  }

  const sortCategoris = () => {
    data.years[activeYearIndex.value]?.months[activeMonthIndex.value]?.month.categories.sort( (a: ICategory,b: ICategory) => b.sum - a.sum)
  }


  // Закрываем все dropdown
  const resetAllDropDowns = () => {
    newYearDropDown.value = false
    newMonthDropDown.value = false
    categoryDropDown.value = false 
    currentYearDropDown.value = false
    currentMonthDropDown.value = false
  }

  return { 
    data, 
    activeCategoryIndex, 
    activeMonthIndex, 
    activeYearIndex,
    newYearDropDown,
    newMonthDropDown,
    categoryDropDown,
    currentYearDropDown,
    currentMonthDropDown,
    dayInput,
    isCorrectDayInput,
    expensesItemInput,
    isCorrectExpensesItemInput,
    priceInput,
    isCorrectPriceInput,
    notificationYear,
    notificationMonth,
    notificationCorrectForm,
    notificationYearAlready,
    notificationMonthAlready,
    notificationCategoryAlready,
    background,
    prevStart,
    start,
    end,
    setCorrectInputs,
    changeCircularDiagram,
    checkMonthsDiagrams,
    sortCategoris,
    resetAllDropDowns
  }
})
