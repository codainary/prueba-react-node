import { Button } from "@/components/ui/button";
import Image from "next/image";

export const SubmitButton = ({
  isLoading,
  className,
  children,
}) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          Cargando...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};