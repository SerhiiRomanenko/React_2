import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = zod.object({
  username: zod.string().min(3, "Некоректне ім'я користувача"),
  password: zod.string().min(6, "Некоректний пароль"),
});

export const useLoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    // TODO: зробити реальну логіку аутентифікації

    if (data.username === "test" && data.password === "password") {
      localStorage.setItem("authToken", "fake-token");
      navigate("/");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};
