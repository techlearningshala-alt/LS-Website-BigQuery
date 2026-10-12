"use client"

import React, { useState } from "react"
import { Controller } from "react-hook-form"
import { Check, ChevronDown, ChevronsDown, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function RHFCombobox({ name, control, items, placeholder = "Select...", className }) {
  const [open, setOpen] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="h-11">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn("w-full justify-between relative", className)}
            >
              {value ? items.find((item) => item.value === value)?.label : placeholder}
             
              <ChevronDown className="opacity-50 absolute right-2" />
            </Button>
          </PopoverTrigger>

          <PopoverContent  className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} className="h-9" />
              <CommandList  className="max-h-60 overflow-y-auto"  onWheelCapture={(e) => {
    e.stopPropagation()
  }}>
                <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
                <CommandGroup>
                  {items?.map((item) => (
                   <CommandItem
                   key={item.value}
                   value={item.search} // 🔥 searchable text
                   onSelect={() => {
                    onChange(item.value) // 🔥 sends NAME to form
                    setOpen(false)
                  }}
                  
                  
                 >
                   {item.label}
                   <Check
                     className={cn(
                       "ml-auto",
                       value === item.value ? "opacity-100" : "opacity-0"
                     )}
                   />
                 </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  )
}
