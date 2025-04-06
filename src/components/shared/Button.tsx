import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/helpers/utils";
import { Spinner } from "../../../public/icons/iconsExport";

const buttonVariants = cva(
  "inline-flex justify-center items-center gap-3 rounded transition-all duration-500 ease-in-out text-base rounded-full hover:bg-gray-100",
  {
    variants: {
      variant: {
        default: "bg-white text-bkGray400",
        outline: "border border-gray-100",
      },
      size: {
        default: "h-[40px] w-[112px]",
        fit: "h-[36px] w-fit px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button = ({
  className,
  size,
  icon,
  endIcon,
  variant,
  loading,
  disabled,
  ...props
}: ButtonProps) => {
  const isDisabled = loading || disabled;

  return (
    <button
      disabled={isDisabled}
      className={cn(
        buttonVariants({ variant, size }),
        className,
        "relative overflow-hidden",
        isDisabled && "cursor-not-allowed hover:cursor-not-allowed"
      )}
      aria-busy={loading ? "true" : undefined}
      {...props}
    >
      {loading ? (
        <Spinner className={cn("h-[35px] w-[35px] text-bkBlack")} />
      ) : (
        <div className="flex gap-2 items-center">
          {icon && icon}
          {props.children}
          {endIcon && endIcon}
        </div>
      )}
      {isDisabled && (
        <div className="absolute inset-0 bg-white bg-opacity-40 z-10" />
      )}
    </button>
  );
};

export { Button, buttonVariants };
