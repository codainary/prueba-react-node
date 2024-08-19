"use client";

import { useState } from "react";
import { CardWrapper } from "@/components/card-wrapper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { CustomField } from "@/components/custom-field";
import { SubmitButton } from "@/components/submit-button";

// Define the validation schema with Zod
const formSchema = z.object({
  email: z.string().email({
    message: "¡Faltó tu correo!",
  }),
  password: z.string().min(1, {
    message: "¡Tu contraseña es clave!",
  }),
});

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Define the submit handler
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <CardWrapper
      headerLabel="Bienvenido de vuelta"
      backButtonLabel="¿No estas registrado?"
      backButtonHref="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomField
            fieldType="INPUT"
            control={form.control}
            name="email"
            label="Correo electrónico"
            placeholder="konecta@mail.com"
          />

          <CustomField
            fieldType="INPUT"
            control={form.control}
            name="password"
            label="Contraseña"
            placeholder="************"
          />
          <SubmitButton isLoading={isLoading}>Iniciar Sesión</SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
};
