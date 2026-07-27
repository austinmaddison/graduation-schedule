import { computed, onMounted, onUnmounted, shallowRef, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

const DAY_IN_MS = 24 * 60 * 60 * 1000

export const useDaysUntil = (target: MaybeRefOrGetter<string | undefined>) => {
  const now = shallowRef(Date.now())

  const targetTime = computed(() => {
    const value = toValue(target)
    const time = value ? new Date(value).getTime() : Number.NaN

    return Number.isNaN(time) ? undefined : time
  })

  const daysRemaining = computed(() => {
    if (targetTime.value === undefined) return undefined

    return Math.max(0, Math.ceil((targetTime.value - now.value) / DAY_IN_MS))
  })

  let timeout: ReturnType<typeof setTimeout> | undefined
  let interval: ReturnType<typeof setInterval> | undefined

  const stop = () => {
    if (timeout) clearTimeout(timeout)
    if (interval) clearInterval(interval)
  }

  const update = () => {
    now.value = Date.now()
  }

  onMounted(() => {
    const time = targetTime.value
    if (time === undefined) return

    const remaining = Math.max(0, time - now.value)
    const timeUntilNextDay = remaining % DAY_IN_MS || DAY_IN_MS

    timeout = setTimeout(() => {
      update()
      interval = setInterval(update, DAY_IN_MS)
    }, timeUntilNextDay)
  })

  onUnmounted(stop)

  return { daysRemaining }
}
