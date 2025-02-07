"use client"

import * as ReactAria from "react-aria-components"
import {
  UiSelectButton,
  UiSelectDialog,
  UiSelectIcon,
} from "@/components/ui/Select"
import {
  UiCheckbox,
  UiCheckboxBox,
  UiCheckboxIcon,
  UiCheckboxLabel,
} from "@/components/ui/Checkbox"
import { UiDialogTrigger } from "@/components/Dialog"

export const CollectionFilter: React.FC<{
  collections: Record<string, string>
  collection?: string[]
  setQueryParams: (name: string, value: string[]) => void
}> = ({ collection, collections, setQueryParams }) => (
  <UiDialogTrigger>
    <UiSelectButton className="w-35">
      <span>Collection</span>
      <UiSelectIcon />
    </UiSelectButton>
    <ReactAria.Popover className="w-64" placement="bottom left">
      <UiSelectDialog>
        <ReactAria.CheckboxGroup
          value={collection ?? []}
          onChange={(value) => {
            setQueryParams("collection", value)
          }}
        >
          {Object.entries(collections).map(([key, value]) => (
            <UiCheckbox value={key} className="py-3 px-4" key={key}>
              <UiCheckboxBox>
                <UiCheckboxIcon />
              </UiCheckboxBox>
              <UiCheckboxLabel>{value}</UiCheckboxLabel>
            </UiCheckbox>
          ))}
        </ReactAria.CheckboxGroup>
      </UiSelectDialog>
    </ReactAria.Popover>
  </UiDialogTrigger>
)
