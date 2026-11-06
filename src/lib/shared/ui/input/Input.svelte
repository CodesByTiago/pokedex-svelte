<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "#lib/shared/utils/cn.js";

  let { class: className, ...restProps }: HTMLInputAttributes = $props();
</script>

<input
  class={cn(
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background transition placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    className,
  )}
  {...restProps}
/>
