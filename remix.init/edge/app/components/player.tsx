import type {
  MediaPlayerInstance,
  MediaProviderAdapter,
  PlayerSrc,
  TrackProps,
} from "@vidstack/react"
import {
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  isHLSProvider,
} from "@vidstack/react"
import classNames from "classnames"
import { useEffect, useRef } from "react"
import { AudioLayout } from "./player.audio-layout"
import { VideoLayout } from "./player.video-layout"

export function Player({
  src,
  className,
  textTracks,
  thumbnails,
}: {
  src?: PlayerSrc
  className?: string
  textTracks?: TrackProps[]
  thumbnails?: string
}) {
  const player = useRef<MediaPlayerInstance>(null)

  useEffect(() => {
    // Subscribe to state updates.
    // return player.current!.subscribe(({ paused, viewType }) => {
    //   // console.log('is paused?', '->', state.paused);
    //   // console.log('is audio view?', '->', state.viewType === 'audio');
    // })
  }, [])

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    // nativeEvent: MediaProviderChangeEvent,
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {}
    }
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay() {
    // detail: MediaCanPlayDetail,
    // nativeEvent: MediaCanPlayEvent,
    // ...
  }

  return (
    <MediaPlayer
      className={classNames(
        "ring-media-focus group overflow-hidden rounded-md bg-slate-900 font-sans text-white data-[focus]:ring-4",
        className,
      )}
      title="Sprite Fight"
      crossOrigin
      playsInline
      onProviderChange={onProviderChange}
      onCanPlay={onCanPlay}
      src={src}
      ref={player}
    >
      <MediaProvider>
        <Poster
          className="absolute inset-0 block size-full rounded-md object-cover opacity-0 transition-opacity data-[visible]:opacity-100 group-data-[view-type=audio]:hidden"
          src="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=1200"
          alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
        />
        {textTracks?.map(track => <Track {...track} key={track.src} />)}
      </MediaProvider>

      <AudioLayout className="hidden group-data-[view-type=audio]:inline-flex" />
      <VideoLayout
        className="hidden group-data-[view-type=video]:inline-flex"
        thumbnails={thumbnails}
      />
    </MediaPlayer>
  )
}
