<script setup lang="ts">
import type { ChecklistItem } from '~/types/checklist'

interface Props {
  item: ChecklistItem
  categoryId: string
}

const props = defineProps<Props>()

const store = useChecklistStore()

const isChecked = computed({
  get: () => store.getProgress(props.categoryId, props.item.id),
  set: () => store.toggleItem(props.categoryId, props.item.id),
})
</script>

<template>
  <li>
    <UCheckbox
      :id="`checklist-item-${item.id}`"
      v-model="isChecked"
      variant="card"
      size="lg"
      :label="item.title"
      :ui="{
        root: 'rounded-2xl transition-colors',
        label: isChecked ? 'text-muted line-through' : 'text-highlighted font-bold',
        description: isChecked ? 'opacity-60' : '',
      }"
    >
      <template #description>
        <span class="mt-1 block leading-relaxed">{{ item.description }}</span>
        <span
          v-if="item.tip"
          class="mt-2.5 flex items-start gap-2.5 rounded-xl bg-elevated p-3 text-xs leading-relaxed text-toned"
        >
          <UIcon
            name="i-lucide-lightbulb"
            class="mt-0.5 size-4 shrink-0 text-primary"
          />
          <span>{{ item.tip }}</span>
        </span>
      </template>
    </UCheckbox>
  </li>
</template>
