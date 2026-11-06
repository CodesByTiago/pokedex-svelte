import { describe, expect, it, vi } from "vite-plus/test";
import { debounce } from "./debounce";

describe("debounce", () => {
  it("runs the callback after the delay", () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    debounce(callback, 300);
    vi.advanceTimersByTime(299);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  it("cancels the callback when a newer input replaces it", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const cancel = debounce(callback, 300);

    cancel();
    vi.advanceTimersByTime(300);

    expect(callback).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
