import { useEffect, useState } from "react"
import * as Slider from "@radix-ui/react-slider"
import {
  formatTime,
  Thumbnail,
  TimeSlider,
  useMediaRemote,
  useMediaState,
  useSliderPreview,
} from "@vidstack/react"

export function Volume() {
  const volume = useMediaState("volume"),
    canSetVolume = useMediaState("canSetVolume"),
    remote = useMediaRemote()

  if (!canSetVolume) return null

  return (
    <Slider.Root
      className="group relative inline-flex h-10 w-full max-w-[80px] cursor-pointer touch-none select-none items-center outline-none"
      value={[volume * 100]}
      onValueChange={([value]) => {
        remote.changeVolume(value / 100)
      }}
    >
      <Slider.Track className="relative h-[5px] w-full rounded-sm bg-white/30">
        <Slider.Range className="absolute h-full rounded-sm will-change-[width]" />
      </Slider.Track>
      <Slider.Thumb
        aria-label="Volume"
        className="group-hocus:opacity-100 block size-[15px] rounded-full border border-[#cacaca] bg-white opacity-0 outline-none ring-white/40 transition-opacity will-change-[left] focus:opacity-100 focus:ring-4"
      />
    </Slider.Root>
  )
}

export interface TimeSliderProps {
  thumbnails?: string
}

export function Time({ thumbnails }: TimeSliderProps) {
  const time = useMediaState("currentTime"),
    canSeek = useMediaState("canSeek"),
    duration = useMediaState("duration"),
    seeking = useMediaState("seeking"),
    remote = useMediaRemote(),
    step = (1 / duration) * 100,
    [value, setValue] = useState(0),
    { previewRootRef, previewRef, previewValue } = useSliderPreview({
      clamp: true,
      offset: 6,
      orientation: "horizontal",
    }),
    previewTime = (previewValue / 100) * duration

  // Keep slider value in-sync with playback.
  useEffect(() => {
    if (seeking) return
    setValue((time / duration) * 100)
  }, [time, duration, seeking])

  return (
    <Slider.Root
      className="group relative inline-flex h-9 w-full cursor-pointer touch-none select-none items-center outline-none"
      value={[value]}
      disabled={!canSeek}
      step={Number.isFinite(step) ? step : 1}
      ref={previewRootRef}
      onValueChange={([value]) => {
        setValue(value)
        remote.seeking((value / 100) * duration)
      }}
      onValueCommit={([value]) => {
        remote.seek((value / 100) * duration)
      }}
    >
      <Slider.Track className="relative h-[5px] w-full rounded-sm bg-white/30">
        <Slider.Range className="absolute h-full rounded-sm will-change-[width]" />
      </Slider.Track>

      <Slider.Thumb
        aria-label="Current Time"
        className="group-hocus:opacity-100 block size-[15px] rounded-full border border-[#cacaca] bg-white opacity-0 outline-none ring-white/40 transition-opacity will-change-[left] focus:opacity-100 focus:ring-4"
      />

      {/* Preview */}
      <div
        className="pointer-events-none absolute flex flex-col items-center opacity-0 transition-opacity duration-200 will-change-[left] data-[visible]:opacity-100"
        ref={previewRef}
      >
        {thumbnails ? (
          <Thumbnail.Root
            src={thumbnails}
            time={previewTime}
            className="mb-2 block h-[var(--thumbnail-height)] max-h-[160px] min-h-[80px] w-[var(--thumbnail-width)] min-w-[120px] max-w-[180px] overflow-hidden border border-white bg-black"
          >
            <Thumbnail.Img />
          </Thumbnail.Root>
        ) : null}
        <span className="text-[13px]">{formatTime(previewTime)}</span>
      </div>
    </Slider.Root>
  )
}

export function TimeAndChapters({ thumbnails }: TimeSliderProps) {
  return (
    <TimeSlider.Root className="group relative mx-[7.5px] inline-flex h-10 w-full cursor-pointer touch-none select-none items-center outline-none">
      <TimeSlider.Chapters className="relative flex size-full items-center rounded-[1px]">
        {(cues, forwardRef) =>
          cues.map(cue => (
            <div
              className="last-child:mr-0 relative mr-0.5 flex size-full items-center rounded-[1px]"
              style={{ contain: "layout style" }}
              key={cue.startTime}
              ref={forwardRef}
            >
              <TimeSlider.Track className="relative z-0 h-[5px] w-full rounded-sm bg-white/30 group-data-[focus]:ring-[3px]">
                <TimeSlider.TrackFill className="absolute h-full w-[var(--chapter-fill)] rounded-sm will-change-[width]" />
                <TimeSlider.Progress className="absolute z-10 h-full w-[var(--chapter-progress)] rounded-sm bg-white/50 will-change-[width]" />
              </TimeSlider.Track>
            </div>
          ))
        }
      </TimeSlider.Chapters>

      <TimeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 z-20 size-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity will-change-[left] group-data-[active]:opacity-100 group-data-[dragging]:ring-4" />

      <TimeSlider.Preview className="pointer-events-none flex flex-col items-center opacity-0 transition-opacity duration-200 data-[visible]:opacity-100">
        {thumbnails ? (
          <TimeSlider.Thumbnail.Root
            src={thumbnails}
            className="block h-[var(--thumbnail-height)] max-h-[160px] min-h-[80px] w-[var(--thumbnail-width)] min-w-[120px] max-w-[180px] overflow-hidden border border-white bg-black"
          >
            <TimeSlider.Thumbnail.Img />
          </TimeSlider.Thumbnail.Root>
        ) : null}

        <TimeSlider.ChapterTitle className="mt-2 text-sm" />

        <TimeSlider.Value className="text-[13px]" />
      </TimeSlider.Preview>
    </TimeSlider.Root>
  )
}
