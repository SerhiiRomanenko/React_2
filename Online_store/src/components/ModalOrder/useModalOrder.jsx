import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import service from "../../utils/mockapi";

import { STATUS_MESSAGES } from "../../utils/constants";

import useTrailersStore from "../../store/features/trailers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const schema = zod.object({
  name: zod.string().min(3),
  phoneNumber: zod.string().min(7),
  city: zod.string().min(3),
  email: zod.string().email().optional().or(zod.literal("")),
  paymentMethod: zod.string().min(1),
  deliveryMethod: zod.string().min(1),
  comments: zod.string().optional(),
});

export const useModalOrder = (trailer, onClose) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const updateTrailerInStore = useTrailersStore((state) => state.updateTrailer);

  const orderMutation = useMutation({
    mutationFn: async (data) => {
      const serviceId = "service_ofl5lph";
      const templateId = "template_bk7qet8";
      const publicKey = "qQGABM2Wj9sjgRw40";

      const templateParams = {
        name: data.name,
        phoneNumber: data.phoneNumber,
        city: data.city,
        email: data.email,
        trailer: trailer.name,
        paymentMethod: data.paymentMethod,
        deliveryMethod: data.deliveryMethod,
        comments: data.comments,
        to_email: "romanenko13n@gmail.com",
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      if (trailer.quantity > 0) {
        const updatedTrailerData = {
          ...trailer,
          quantity: trailer.quantity - 1,
        };
        const response = await service.put(
          "trailers",
          trailer.id,
          updatedTrailerData
        );
        return response;
      }
      return null;
    },
    onSuccess: (updatedTrailerFromServer) => {
      queryClient.invalidateQueries({ queryKey: ["trailers"] });
      queryClient.invalidateQueries({ queryKey: ["trailer", trailer.id] });

      if (updatedTrailerFromServer) {
        updateTrailerInStore(updatedTrailerFromServer);
      }

      alert("Ваше замовлення успішно надіслано!");
      reset();
      onClose();
    },
    onError: (error) => {
      console.error(STATUS_MESSAGES.ERROR, error);
    },
  });

  const onSubmit = (data) => {
    orderMutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    isPending: orderMutation.isPending,
    errors,
  };
};
