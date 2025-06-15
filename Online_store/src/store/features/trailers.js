import { create } from "zustand";

const useTrailersStore = create((set) => ({
  trailers: [],
  selectedTrailer: null,

  setTrailers: (newTrailers) => set({ trailers: newTrailers }),

  addTrailer: (trailer) =>
    set((state) => ({ trailers: [...state.trailers, trailer] })),

  updateTrailer: (updatedTrailer) =>
    set((state) => ({
      trailers: state.trailers.map((item) =>
        item.id === updatedTrailer.id ? updatedTrailer : item
      ),
      selectedTrailer:
        state.selectedTrailer?.id === updatedTrailer.id
          ? updatedTrailer
          : state.selectedTrailer,
    })),

  removeTrailer: (id) =>
    set((state) => ({
      trailers: state.trailers.filter((item) => item.id !== id),
      selectedTrailer:
        state.selectedTrailer?.id === id ? null : state.selectedTrailer,
    })),

  setSelectedTrailer: (trailer) => set({ selectedTrailer: trailer }),

  clearTrailers: () => set({ trailers: [], selectedTrailer: null }),
}));

export default useTrailersStore;
