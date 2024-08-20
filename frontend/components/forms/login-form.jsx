"use client";

import { useState } from "react";
import { CardWrapper } from "@/components/card-wrapper";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormDescription } from "@/components/ui/form";
import { CustomField } from "@/components/custom-field";
import { SubmitButton } from "@/components/submit-button";
import { FormError } from "./form-error";
import { formSchema } from "@/schemas";
import { useAuth } from "@/contexts/AuthContext";

export const LoginForm = () => {
  const { login, isLoading, error, success } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      correo: "admin@admin.com",
      contrasena: "admin123",
    },
  });

  const onSubmit = (values) => {
    login(values.correo, values.contrasena);
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
            fieldType="input"
            control={form.control}
            name="correo"
            label="Correo electrónico"
            placeholder="correo@example.com"
          />

          <CustomField
            fieldType="password"
            control={form.control}
            name="contrasena"
            label="Contraseña"
            placeholder="***************"
          />
          <FormError message={error} />
          <SubmitButton isLoading={isLoading}>Iniciar Sesión</SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
};
