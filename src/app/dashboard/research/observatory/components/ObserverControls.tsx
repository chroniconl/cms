import { useObservatoryStore } from '../store'
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { HelpCircle } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export const ObserverControls = () => {
  const setContentPreviewType = useObservatoryStore(
    (state) => state.setContentPreviewType,
  )

  return (
    <div className="ch-border-outline p-4">
      <div>
        <h2 className="font-bold text-white">Observer Controls</h2>
      </div>

      <div className="mt-4 space-y-2">
        <div className="mb-2 flex items-center space-x-2">
          <p className="text-sm text-white">Content Preview Type</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 hover:text-yellow-500" />
              </TooltipTrigger>
              <TooltipContent className="sm:max-w-[425px]">
                <p className="ch-body ch-color-secondary ">
                  View the full HTML or only the head or body of the page.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <RadioGroup
          defaultValue="default"
          onValueChange={setContentPreviewType}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="default" />
            <Label htmlFor="default">Default (Full HTML)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="head" id="head" />
            <Label htmlFor="head">Head only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="body" id="body" />
            <Label htmlFor="body">Body only</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
