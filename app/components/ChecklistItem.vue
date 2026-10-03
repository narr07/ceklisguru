<script setup lang="ts">
import type { Topik } from '~/composables/useCeklis'

const props = defineProps<{
  topik: string
  butir: Topik['butir'][number]
}>()

const store = useChecklistStore()
const contohOpen = ref(false)
const canHover = ref(true)
onMounted(() => {
  canHover.value = window.matchMedia('(hover: hover)').matches
})

const checked = computed({
  get: () => store.isChecked(props.topik, props.butir.kunci),
  set: value => store.setChecked(props.topik, props.butir.kunci, value === true),
})

// Clicking anywhere on the card ticks it. The checkbox, its label, and the example
// button handle their own clicks, and selecting text should not tick anything
function onCardClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (target.closest('button, a, label')) return
  if (window.getSelection()?.toString()) return
  checked.value = !checked.value
}
</script>

<template>
  <li
    class="cursor-pointer rounded-2xl border p-4 transition-colors sm:p-5"
    :class="checked ? 'border-primary/40 bg-primary/5' : 'border-default bg-default hover:border-accented'"
    @click="onCardClick"
  >
    <UCheckbox
      :id="`butir-${butir.kunci}`"
      v-model="checked"
      size="lg"
      :label="butir.judul"
      :description="butir.penjelasan"
      :ui="{
        label: checked ? 'text-muted line-through' : 'text-highlighted font-bold',
        description: 'mt-1 leading-relaxed',
      }"
    />

    <div
      v-if="butir.catatan || butir.contoh"
      class="mt-3 space-y-3 ps-8"
    >
      <p
        v-if="butir.catatan"
        class="flex items-start gap-2 rounded-xl bg-elevated p-3 text-sm leading-relaxed text-toned"
      >
        <UIcon
          name="i-lucide-bookmark"
          class="mt-0.5 size-4 shrink-0 text-primary"
        />
        <span>{{ butir.catatan }}</span>
      </p>

      <!-- Hover where a pointer can hover, tap elsewhere; keyed because UPopover picks its mode once, at setup -->
      <UPopover
        v-if="butir.contoh"
        :key="canHover ? 'hover' : 'click'"
        v-model:open="contohOpen"
        :mode="canHover ? 'hover' : 'click'"
        :open-delay="150"
        :close-delay="150"
        :content="{ side: 'top', align: 'start', collisionPadding: 16 }"
      >
        <UButton
          color="neutral"
          variant="soft"
          size="sm"
          icon="i-lucide-eye"
          label="Lihat contoh"
          :aria-expanded="contohOpen"
        />

        <template #content>
          <div class="max-w-sm p-4 text-sm leading-relaxed text-toned">
            <p class="mb-1 font-semibold text-highlighted">
              Contoh di kelas
            </p>
            <p>{{ butir.contoh }}</p>
          </div>
        </template>
      </UPopover>
    </div>
  </li>
</template>
