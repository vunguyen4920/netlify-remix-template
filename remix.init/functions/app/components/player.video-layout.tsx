import * as Tooltip from "@radix-ui/react-tooltip"
import { Captions, Controls, Gesture } from "@vidstack/react"
import * as Buttons from "./player.buttons"
import captionStyles from "./player.captions.module.css"
import * as Menus from "./player.menus"
import * as Sliders from "./player.sliders"
import { TimeGroup } from "./player.time-group"
import { Title } from "./player.title"
import classNames from "classnames"

// Offset tooltips/menus/slider previews in the lower controls group so they're clearly visible.
const popupOffset = 30

export interface VideoLayoutProps {
  className?: string
  thumbnails?: string
}

export function VideoLayout({ className, thumbnails }: VideoLayoutProps) {
  return (
    <div className={classNames(className)}>
      <Gestures />
      <Captions
        className={`${captionStyles.captions} absolute inset-0 bottom-2 z-10 select-none break-words opacity-0 transition-[opacity,bottom] duration-300 media-captions:opacity-100 media-controls:bottom-[85px] media-preview:opacity-0`}
      />
      <Controls.Root className="absolute inset-0 z-10 flex size-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity media-controls:opacity-100">
        <Tooltip.Provider>
          <div className="flex-1" />
          <Controls.Group className="flex w-full items-center px-2">
            <Sliders.TimeAndChapters thumbnails={thumbnails} />
          </Controls.Group>
          <Controls.Group className="-mt-0.5 flex w-full items-center px-2 pb-2">
            <Buttons.Play tooltipAlign="start" tooltipOffset={popupOffset} />
            <Buttons.Mute tooltipOffset={popupOffset} />
            <Sliders.Volume />
            <TimeGroup />
            <Title />
            <div className="flex-1" />
            <Menus.Captions offset={popupOffset} tooltipOffset={popupOffset} />
            <Buttons.PIP tooltipOffset={popupOffset} />
            <Buttons.Fullscreen
              tooltipAlign="end"
              tooltipOffset={popupOffset}
            />
          </Controls.Group>
        </Tooltip.Provider>
      </Controls.Root>
    </div>
  )
}

function Gestures() {
  return (
    <>
      <Gesture
        className="absolute inset-0 z-0 block size-full"
        event="pointerup"
        action="toggle:paused"
      />
      <Gesture
        className="absolute inset-0 z-0 block size-full"
        event="dblpointerup"
        action="toggle:fullscreen"
      />
      <Gesture
        className="absolute left-0 top-0 z-10 block h-full w-1/5"
        event="dblpointerup"
        action="seek:-10"
      />
      <Gesture
        className="absolute right-0 top-0 z-10 block h-full w-1/5"
        event="dblpointerup"
        action="seek:10"
      />
    </>
  )
}
