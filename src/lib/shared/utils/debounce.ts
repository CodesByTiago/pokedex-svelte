export function debounce(callback: () => void, delay: number): () => void {
  const timeout = setTimeout(callback, delay);
  return () => clearTimeout(timeout);
}
