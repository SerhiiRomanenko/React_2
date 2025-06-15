import service from "../../utils/mockapi";

import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import useTrailersStore from "../../store/features/trailers";

export const useTrailerDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setSelectedTrailerInStore = useTrailersStore(
    (state) => state.setSelectedTrailer
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["trailer", id],
    queryFn: () => service.get("trailers", id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setSelectedTrailerInStore(data);
    } else if (!isLoading && !isError) {
      setSelectedTrailerInStore(null);
    }
  }, [data, isLoading, isError, setSelectedTrailerInStore]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    trailer: data,
    isLoading,
    isError,
    isModalOpen,
    openModal,
    closeModal,
  };
};
