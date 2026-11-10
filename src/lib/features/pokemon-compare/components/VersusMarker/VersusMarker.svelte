<script lang="ts">
  import styles from "./VersusMarker.module.css";
</script>

<svg
  class={styles.marker}
  viewBox="0 0 64 64"
  role="img"
  aria-label="versus"
  focusable="false"
>
  <circle class={styles.circle} cx="32" cy="32" r="30" />
  <text class={styles.text} x="32" y="33" text-anchor="middle" dominant-baseline="central">VS</text>
</svg>
