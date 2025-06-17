"use client";

import React, { createContext, useContext } from "react";

const RadioGroupContext = createContext();

const RadioGroup = React.forwardRef(
  ({ className, value, onValueChange, ...props }, ref) => {
    return (
      <RadioGroupContext.Provider value={{ value, onValueChange }}>
        <div
          ref={ref}
          className={`grid gap-2 ${className || ""}`}
          role="radiogroup"
          {...props}
        />
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef(
  ({ className, value, id, ...props }, ref) => {
    const context = useContext(RadioGroupContext);
    const isChecked = context?.value === value;

    const handleChange = () => {
      if (context?.onValueChange) {
        context.onValueChange(value);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={isChecked}
        className={`aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          isChecked ? "bg-primary" : "bg-background"
        } ${className || ""}`}
        onClick={handleChange}
        {...props}
      >
        {isChecked && (
          <div className="flex items-center justify-center">
            <div className="h-2.5 w-2.5 rounded-full bg-current" />
          </div>
        )}
      </button>
    );
  },
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
