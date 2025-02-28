import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { PopoverClose } from "@radix-ui/react-popover";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

interface Props<T extends object> {
  title?: string;
  value?: T;
  renderText: (value: T) => string;
  valueKey: keyof T;
  disabled?: boolean;
  onChange?: (value: T) => void;
  searchFn: (search: string) => Promise<T[]>;
}
const ComboBox = <T extends object>({
  title,
  value,
  valueKey,
  renderText,
  disabled = false,
  onChange,
  searchFn,
}: Props<T>) => {
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = useState<T[]>([]);
  const debouncedsearch = useDebounce<string>(search, 500);

  const getOptions = useCallback(async () => {
    const searchResult = await searchFn(debouncedsearch || "");
    setOptions(searchResult);
  }, [debouncedsearch, searchFn]);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground",
          )}
          disabled={disabled}
        >
          <div className="truncate">
            {value ? renderText(value) : `Pilih ${title}`}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="PopoverContent p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={`Search ${title}...`}
            value={typeof search === "string" ? search : ""}
            onValueChange={(value) => setSearch(value)}
          />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <PopoverClose asChild>
              <CommandGroup className="max-h-60 overflow-y-auto">
                {options.map((option) => (
                  <CommandItem
                    value={option[valueKey] as string}
                    key={option[valueKey] as string}
                    onSelect={() => onChange?.(option)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        option[valueKey] ===
                          value?.[valueKey]
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {renderText(option)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </PopoverClose>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;