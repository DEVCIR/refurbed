"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const SelectContext = React.createContext();

const Select = ({ children, value, onValueChange, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    value || defaultValue || "",
  );
  const selectRef = useRef(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
    setIsOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{
        isOpen,
        setIsOpen,
        selectedValue,
        handleValueChange,
      }}
    >
      <div ref={selectRef} className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { isOpen, setIsOpen, selectedValue } =
      React.useContext(SelectContext);

    return (
      <button
        ref={ref}
        type="button"
        className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
    );
  },
);
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = ({ placeholder }) => {
  const { selectedValue } = React.useContext(SelectContext);
  return <span>{selectedValue || placeholder}</span>;
};

const SelectContent = ({ className, children, ...props }) => {
  const { isOpen } = React.useContext(SelectContext);

  if (!isOpen) return null;

  return (
    <div
      className={`absolute top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

const SelectItem = ({ className, children, value, ...props }) => {
  const { handleValueChange, selectedValue } = React.useContext(SelectContext);

  return (
    <div
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
        selectedValue === value ? "bg-accent" : ""
      } ${className || ""}`}
      onClick={() => handleValueChange(value)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
