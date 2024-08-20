"use client";

import { useState } from "react";
import { CardWrapper } from "@/components/card-wrapper";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormDescription } from "@/components/ui/form";
import { CustomField } from "@/components/custom-field";
import { SubmitButton } from "@/components/submit-button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import useLogin from "@/hooks/useLogin";
import { createSolicitudSchema } from "@/schemas";
import { useAuth } from "@/contexts/AuthContext";

export const CreateSolicitudForm = () => {
  const { login, isLoading, error, success } = useAuth();

  const form = useForm({
    resolver: zodResolver(createSolicitudSchema),
    defaultValues: {
      codigo: "",
      empleadoId: "",
      descripcion: "",
    },
  });

  const employees = [
    { value: "1", label: "John Doe" },
    { value: "2", label: "Jane Smith" },
    { value: "3", label: "Alice Johnson" },
  ];

  // Define the submit handler
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField
          fieldType="input"
          control={form.control}
          name="codigo"
          label="Código"
          placeholder="Asigne un código a la solicitud"
        />
        <CustomField
          control={form.control}
          fieldType="select"
          name="empleadoId"
          label="Seleccionar Empleado"
          placeholder="Escoge un empleado"
          options={employees}
        />

        <CustomField
          control={form.control}
          fieldType="textarea"
          name="descripcion"
          label="Descripción"
          placeholder="Ingresar descripcion aquí..."
        />

        <FormError message={error} />
        {/* <FormSuccess message={success} /> */}
        <FormDescription className="text-center">
          {/* *La cuenta de admin está en el placeholder.* */}
        </FormDescription>
        <SubmitButton isLoading={isLoading}>Crear solicitud</SubmitButton>
      </form>
    </Form>
  );
};
