import { useObservatoryStore } from '../store'
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { HelpCircle } from 'lucide-react'

export const ObserverControls = () => {
  const setUseRawOnly = useObservatoryStore((state) => state.setUseRawOnly)
  const setUseSanitizeHtml = useObservatoryStore(
    (state) => state.setUseSanitizeHtml,
  )
  const useRawOnly = useObservatoryStore((state) => state.useRawOnly)
  const useSanitizeHtml = useObservatoryStore((state) => state.useSanitizeHtml)
  const setTab = useObservatoryStore((state) => state.setTab)

  return (
    <div className="ch-border-outline p-4">
      <div>
        <h2 className="font-bold text-white">Observer Controls</h2>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="useRawOnly"
            checked={useRawOnly}
            onCheckedChange={(value) => {
              setUseRawOnly(value)
              // If the user checks the switch, set the tab to raw
              if (value) {
                setTab('raw')
              }
            }}
          />
          <div className="flex items-center space-x-2">
            <label className="text-sm text-white" htmlFor="useRawOnly">
              View Raw Data Only
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 hover:text-yellow-500" />
                </TooltipTrigger>
                <TooltipContent className="sm:max-w-[425px]">
                  <p className="ch-body ch-muted ">
                    Disabling the preview can help with responses that have
                    weird CSS or JS rules that break the app. This option is
                    only available when using the self hosted version of the
                    app.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="mt-2 flex items-center space-x-2">
          <Switch
            id="sanitizeHtml"
            checked={useSanitizeHtml}
            onCheckedChange={setUseSanitizeHtml}
          />
          <div className="flex items-center space-x-2">
            <label className="text-sm text-white" htmlFor="sanitizeHtml">
              Sanitize HTML
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 hover:text-yellow-500" />
                </TooltipTrigger>
                <TooltipContent className="sm:max-w-[425px]">
                  <p className="ch-body ch-muted ">
                    Reduce the risk of XSS attacks by sanitizing the HTML. This
                    option is only available when using the self hosted version
                    of the app.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
