<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "#lib/shared/utils/cn.js";

  type Variant = "default" | "outline" | "ghost";
  type Size = "default" | "sm";

  let {
    children,
    class: className,
    variant = "default",
    size = "default",
    ...restProps
  }: HTMLButtonAttributes & {
    children?: Snippet;
    variant?: Variant;
    size?: Size;
  } = $props();

  const variants: Record<Variant, string> = {
    default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:translate-y-px",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const sizes: Record<Size, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
  };
</script>

<button
  class={cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</button>
