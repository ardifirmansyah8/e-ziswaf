import * as React from "react";

import { cn } from "@/utils/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, ...props }, ref) => {
    return (
      <div className="w-full relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-grey-5 disabled:placeholder:text-grey-5 disabled:bg-grey-3",
            className,
            leftIcon ? "pl-11" : "pl-3"
          )}
          ref={ref}
          {...props}
        />
        {leftIcon && leftIcon}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
