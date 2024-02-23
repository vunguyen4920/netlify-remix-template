import * as React from "react"
import * as RadixAccordion from "@radix-ui/react-accordion"
import classNames from "classnames"
import { ChevronDownIcon } from "@radix-ui/react-icons"

export const Accordion = () => (
  <RadixAccordion.Root
    className="w-[300px] rounded-md shadow-[0_2px_10px] shadow-black/5"
    type="single"
    defaultValue="item-1"
    collapsible
  >
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2">
      <AccordionTrigger>Is it unstyled?</AccordionTrigger>
      <AccordionContent>
        Yes. It&apos;s unstyled by default, giving you freedom over the look and
        feel.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-3">
      <AccordionTrigger>Can it be animated?</AccordionTrigger>
      <AccordionContent>
        Yes! You can animate the Accordion with CSS or JavaScript.
      </AccordionContent>
    </AccordionItem>
  </RadixAccordion.Root>
)

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  RadixAccordion.AccordionItemProps & {
    children?: React.JSX.Element | React.JSX.Element[]
    className?: string
  }
>(function AccordionItem({ children, className, ...props }, forwardedRef) {
  return (
    <RadixAccordion.Item
      className={classNames(
        "focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]",
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </RadixAccordion.Item>
  )
})

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  RadixAccordion.AccordionTriggerProps & {
    children?: React.JSX.Element | React.JSX.Element[] | string
    className?: string
  }
>(function AccordionTrigger({ children, className, ...props }, forwardedRef) {
  return (
    <RadixAccordion.Header className="flex">
      <RadixAccordion.Trigger
        className={classNames(
          "text-violet11 shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon
          className="text-violet-100 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  )
})

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  RadixAccordion.AccordionContentProps & {
    children?: React.JSX.Element | React.JSX.Element[] | string
    className?: string
  }
>(function AccordionContent({ children, className, ...props }, forwardedRef) {
  return (
    <RadixAccordion.Content
      className={classNames(
        "text-mauve11 bg-mauve2 overflow-hidden text-[15px] data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown",
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="px-5 py-[15px]">{children}</div>
    </RadixAccordion.Content>
  )
})
