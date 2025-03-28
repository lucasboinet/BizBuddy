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
  value?: any;
  renderText: (value: T) => string;
  valueKey: keyof T;
  labelKey: keyof T;
  disabled?: boolean;
  items?: T[];
  onChange?: (value: T | T[keyof T]) => void;
  searchFn?: (search: string) => Promise<T[]>;
  complete?: boolean
}
const ComboBox = <T extends object>({
  title,
  value,
  labelKey,
  valueKey,
  renderText,
  disabled = false,
  complete = false,
  onChange,
  searchFn,
  items = [],
}: Props<T>) => {
  const [selectedValue, setSelectedValue] = useState<T>();
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = useState<T[]>([]);
  const debouncedsearch = useDebounce<string>(search, 500);

  useEffect(() => {
    if (value) {
      const valueCompare = complete ? value[valueKey] : value;
      const selected = options.find((option) => option[valueKey] === valueCompare);
      setSelectedValue(selected)
    }
  }, [options, value, valueKey, complete])

  const getOptions = useCallback(async () => {
    if (searchFn) {
      const searchResult = await searchFn(debouncedsearch || "");
      setOptions(searchResult);
      return;
    }

    setOptions(items);
  }, [debouncedsearch, searchFn, items]);

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
          <div className="truncate font-normal">
            {selectedValue ? renderText(selectedValue) : `Select ${title}`}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="PopoverContent p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={`Search ${title}...`}
            value={typeof search === "string" ? search : ""}
            onValueChange={(v) => setSearch(v)}
          />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <PopoverClose asChild>
              <CommandGroup className="max-h-60 overflow-y-auto">
                {options.map((option) => (
                  <CommandItem
                    value={option[labelKey] as string}
                    key={option[labelKey] as string}
                    onSelect={() => {
                      if (!complete && option[valueKey] !== value) {
                        setSelectedValue(option)
                        onChange?.(option?.[valueKey])
                      }

                      if (complete && option[valueKey] !== value?.[valueKey]) {
                        setSelectedValue(option)
                        onChange?.(option)
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        option[labelKey] ===
                          selectedValue?.[labelKey]
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