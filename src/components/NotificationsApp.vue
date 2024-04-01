<script setup lang="ts">
  import { useAppStore } from '@/stores/AppStore';

  const store = useAppStore()
</script>

<template>
  <div class="notification" :class="{'active': store.notificationYear}">Выберите год</div>
  <div class="notification" :class="{'active': store.notificationMonth}">Выберите месяц</div>
  <div class="notification" :class="{'active': store.notificationCorrectForm}">Все поля должны быть заполнены</div>
  <div class="notification" :class="{'active': store.notificationYearAlready}">Такой год уже есть</div>
  <div class="notification" :class="{'active': store.notificationMonthAlready}">Такой месяц уже есть</div>
  <div class="notification" :class="{'active': store.notificationCategoryAlready}">Такая категория уже есть</div>
</template>

<style scoped lang="scss">
.notification {
  position: fixed;
  bottom: -80px;
  left: 50%;
  padding: 15px;
  visibility: hidden;
  transform: translateX(-50%);
  border-radius: 5px;
  background-color: rgb(204, 232, 255);
  box-shadow: 0px 4px 12px 17px rgb(155 155 155);
  text-align: center;
  font-weight: bold;
  transition: .3s;

  &.active {
    visibility: visible;
    bottom: 100px;
  }
}
</style>