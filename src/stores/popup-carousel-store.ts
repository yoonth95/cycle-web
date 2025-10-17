"use client";

import { create } from "zustand";

interface PopupCarouselState {
  total: number;
  currentIndex: number;
  autoplayPlaying: boolean;
  autoplayReady: boolean;
  scrollTo: ((index: number) => void) | null;
  startAutoplay: (() => void) | null;
  stopAutoplay: (() => void) | null;
  forcedStop: boolean;
  setTotal: (total: number) => void;
  setCurrentIndex: (index: number) => void;
  setScrollTo: (handler: ((index: number) => void) | null) => void;
  setAutoplayControllers: (start: (() => void) | null, stop: (() => void) | null) => void;
  toggleAutoplay: () => void;
  reset: () => void;
}

const initialState = {
  total: 0,
  currentIndex: 0,
  autoplayPlaying: true,
  autoplayReady: false,
  scrollTo: null,
  startAutoplay: null,
  stopAutoplay: null,
  forcedStop: false,
} satisfies Pick<
  PopupCarouselState,
  | "total"
  | "currentIndex"
  | "autoplayPlaying"
  | "autoplayReady"
  | "scrollTo"
  | "startAutoplay"
  | "stopAutoplay"
  | "forcedStop"
>;

const usePopupCarouselStore = create<PopupCarouselState>((set) => ({
  ...initialState,
  setTotal: (total) =>
    set((state) => {
      const update: Partial<PopupCarouselState> = { total };

      if (total <= 1) {
        if (state.autoplayPlaying) {
          state.stopAutoplay?.();
        }
        update.autoplayPlaying = false;
        update.forcedStop = true;
      } else if (state.forcedStop && state.autoplayReady) {
        state.startAutoplay?.();
        update.autoplayPlaying = true;
        update.forcedStop = false;
      }

      return update;
    }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  setScrollTo: (handler) => set({ scrollTo: handler }),
  setAutoplayControllers: (start, stop) =>
    set({
      startAutoplay: start,
      stopAutoplay: stop,
      autoplayReady: Boolean(start && stop),
    }),
  toggleAutoplay: () =>
    set((state) => {
      if (!state.autoplayReady) return {};

      const next = !state.autoplayPlaying;
      if (next) {
        state.startAutoplay?.();
      } else {
        state.stopAutoplay?.();
      }

      return { autoplayPlaying: next, forcedStop: false };
    }),
  reset: () =>
    set((state) => {
      state.stopAutoplay?.();
      return { ...initialState };
    }),
}));

export default usePopupCarouselStore;
