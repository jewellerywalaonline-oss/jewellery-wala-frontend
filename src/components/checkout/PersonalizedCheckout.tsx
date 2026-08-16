"use client";
import { useEffect, useState } from "react";
import { Gift, Check, AlertCircle, Type, ChevronDown } from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export interface PersonalizedCheckoutItem {
  /** Composite key: productId_colorId_sizeId */
  key: string;
  productId: string;
  colorId?: string;
  sizeId?: string;
  productName: string;
  image?: string;
}

export const PERSONALIZED_NAMES_STORAGE_KEY = "personalizedNames";

const MAX_LENGTH = 25;
const NAME_RE = /^[a-zA-Z0-9\s,.'&-]*$/;

function loadNames(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(PERSONALIZED_NAMES_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function saveNames(names: Record<string, string>) {
  try {
    sessionStorage.setItem(PERSONALIZED_NAMES_STORAGE_KEY, JSON.stringify(names));
  } catch {
    /* storage unavailable — ignore */
  }
}

/**
 * Accordion personalization for cart checkout. When multiple personalized
 * products are in the cart, the user enters a different engraved name for
 * each one. Names are persisted to sessionStorage so they survive a page
 * refresh, and read back at order time by the checkout page.
 */
export default function PersonalizedCheckout({
  items,
}: {
  items: PersonalizedCheckoutItem[];
}) {
  const [names, setNames] = useState<Record<string, string>>({});
  const [openItem, setOpenItem] = useState<string | undefined>(items[0]?.key);

  useEffect(() => {
    setNames(loadNames());
  }, []);

  if (!items || items.length === 0) return null;

  const updateName = (key: string, value: string) => {
    if (value.length > MAX_LENGTH) return;
    const next = { ...names, [key]: value };
    setNames(next);
    saveNames(next);
  };

  const isValid = (key: string) => {
    const value = names[key] ?? "";
    return value.length === 0 || NAME_RE.test(value);
  };

  const hasName = (key: string) => Boolean((names[key] ?? "").trim());

  const filledCount = items.filter((i) => hasName(i.key)).length;

  return (
    <div className="bg-background rounded-2xl p-6 sm:p-8 shadow-sm border border-brand-100 transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-7">
        <span className="w-8 h-8 rounded-full bg-brand-600 text-background flex items-center justify-center text-sm font-medium shadow-sm">
          <Gift size={16} />
        </span>
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Personalize Your Products
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Add an engraved name for each personalized product
            {filledCount > 0 && (
              <span className="text-brand-600 font-medium">
                {" "}
                · {filledCount}/{items.length} done
              </span>
            )}
          </p>
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        value={openItem}
        onValueChange={setOpenItem}
        className="w-full"
      >
        {items.map((item, index) => {
          const value = names[item.key] ?? "";
          const valid = isValid(item.key);
          const filled = hasName(item.key);
          return (
            <AccordionItem
              key={item.key}
              value={item.key}
              className="border-border first:border-t"
            >
              <AccordionTrigger className="hover:no-underline py-4 [&>svg]:hidden">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {item.image ? (
                    <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-border bg-muted">
                      <Image
                        src={item.image}
                        alt={item.productName}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center">
                      <Gift size={18} className="text-brand-600" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-sm font-medium text-foreground truncate">
                      {index + 1}. {item.productName}
                    </p>
                    {filled ? (
                      <p className="text-xs text-brand-600 flex items-center gap-1">
                        <Check size={12} /> “{value}”
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Add engraved name
                      </p>
                    )}
                  </div>
                  {filled ? (
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Check size={12} />
                    </span>
                  ) : (
                    <span
                      className="flex-shrink-0 text-destructive text-xl font-semibold leading-none"
                      title="Required"
                    >
                      *
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-1 pb-2">
                  <label
                    htmlFor={`personalizedName-${item.key}`}
                    className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
                  >
                    Your Message
                  </label>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id={`personalizedName-${item.key}`}
                      type="text"
                      maxLength={MAX_LENGTH}
                      value={value}
                      onChange={(e) => updateName(item.key, e.target.value)}
                      placeholder="Enter your personalization text..."
                      className={`w-full pl-9 pr-14 py-2.5 border-2 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all bg-background text-sm text-foreground ${
                        !valid && value ? "border-destructive/30" : "border-border"
                      }`}
                    />
                    <span
                      className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${
                        value.length >= MAX_LENGTH
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      {value.length}/{MAX_LENGTH}
                    </span>
                  </div>
                  {!valid && value && (
                    <p className="flex items-center gap-1.5 mt-2 text-xs text-destructive">
                      <AlertCircle size={13} />
                      Only letters, numbers, spaces and basic punctuation are
                      allowed
                    </p>
                  )}
                  {!filled && (
                    <p className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                      <ChevronDown size={13} className="rotate-180" />
                      Required before placing your order
                    </p>
                  )}
                  <p className="text-[11px] text-muted-foreground mt-3">
                    Hand-engraved and final sale — cannot be changed after
                    ordering.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}