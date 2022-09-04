<template>
  <div>
    <div class="mx-5 mt-2 mb-0 flex justify-space-between">
      <h2 class="secondary-title mb-4">{{ $t('weekDays.workHoursTitle') }}</h2>
    </div>

    <div>

      <div
          v-for="(workHour, i) in workHoursComputed"
          :key="`workHour-${i}`"
          :class="[{'active': i === today}]"
          class="workScheduleContainer px-5 flex justify-space-between">
        <div>{{ $t(`weekDays.${workHour.name}`) }}</div>
        <div>{{ workHour.hours }}</div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: "WorkHours",
  props: {
    workHours: {type: String, required: false},
  },
  data() {
    return {

    }
  },
  computed: {
    workHoursComputed() {
      if (!!this.workHours) {
        const workHours = this.workHours.replace(/^"|"$/g,"")

        return JSON.parse(workHours)
      }

      return [
        {name: 'monday', hours: '1:10 - 11:01'},
        {name: 'tuesday', hours: '08:30 - 21:00'},
        {name: 'wednesday', hours: '08:30 - 21:00'},
        {name: 'thursday', hours: '08:30 - 21:00'},
        {name: 'friday', hours: '08:30 - 21:00'},
        {name: 'saturday', hours: '08:30 - 21:00'},
        {name: 'sunday', hours: '08:30 - 21:00'},
      ]
    },
    today() {
      return this.$dayjs().day() - 1
    }
  },
}
</script>

<style scoped>
.secondary-title {
  font-family: 'Nunito';
  font-size: 22px;
  line-height: 30px;
  font-weight: 700;
  color: #121420;
}

.active {
  background: #3675EE;
  color: #ffffff;
}
</style>
