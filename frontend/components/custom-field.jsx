"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormFieldType = {
  INPUT: "input",
  PASSWORD: "password",
};

// RenderField Component
const RenderField = ({ field, fieldType, placeholder }) => {
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
      );
      case FormFieldType.PASSWORD:
        return (
          <FormControl>
            <Input placeholder={placeholder} {...field} type={fieldType} />
          </FormControl>
        );

    default:
      break;
  }
};

export const CustomField = ({
  control,
  fieldType,
  name,
  label,
  placeholder,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <RenderField
            field={field}
            fieldType={fieldType}
            placeholder={placeholder}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
