"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DateRange, SelectRangeEventHandler } from "react-day-picker"

export function DatePickerWithRange({
  className,
  period,
  setPeriod,
}: {
  className?: string, 
  period?: DateRange, 
  setPeriod: SelectRangeEventHandler
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[230px] justify-start text-left font-normal",
              !period && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {period?.from ? (
              period.to ? (
                <>
                  {format(period.from, "LLL dd, y")} -{" "}
                  {format(period.to, "LLL dd, y")}
                </>
              ) : (
                format(period.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={period?.from}
            selected={period}
            onSelect={setPeriod}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
