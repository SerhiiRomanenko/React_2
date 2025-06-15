import service from "../../utils/mockapi";

import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import useTrailersStore from "../../store/features/trailers";

export const useTrailersList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrailerForModal, setSelectedTrailerForModal] = useState(null);

  const searchQuery =
    new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

  const setTrailersInStore = useTrailersStore((state) => state.setTrailers);

  const {
    data: fetchedTrailers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trailers", { search: searchQuery }],
    queryFn: () => service.get("trailers"),
  });

  useEffect(() => {
    if (fetchedTrailers) {
      setTrailersInStore(fetchedTrailers);
    }
  }, [fetchedTrailers, setTrailersInStore]);

  const openModal = useCallback((trailer) => {
    setSelectedTrailerForModal(trailer);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTrailerForModal(null);
  }, []);

  const handleCardClick = useCallback(
    (event, id) => {
      if (!event.target.closest("button")) {
        navigate(`/trailer/${id}`);
      }
    },
    [navigate]
  );

  const filteredTrailers =
    fetchedTrailers?.filter((trailer) =>
      trailer.name.toLowerCase().includes(searchQuery)
    ) || [];

  return {
    filteredTrailers,
    isLoading,
    isError,
    isModalOpen,
    selectedTrailerForModal,
    openModal,
    closeModal,
    handleCardClick,
    searchQuery,
  };
};
