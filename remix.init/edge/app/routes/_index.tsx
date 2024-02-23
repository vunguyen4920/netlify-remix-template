import type { MetaFunction } from "@remix-run/node"
import { useRive } from "@rive-app/react-canvas"
import type { TrackProps } from "@vidstack/react"
import { motion } from "framer-motion"
import { useIntl } from "react-intl"
import { Accordion } from "~/components/accordion"
import { Player } from "~/components/player"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ]
}

export function SimpleRive() {
  const { rive, RiveComponent } = useRive({
    src: "/new_file.riv",
    stateMachines: "bumpy",
    autoplay: false,
  })

  return (
    <RiveComponent
      style={{
        height: "150px",
      }}
      onMouseEnter={() => rive && rive.play()}
      onMouseLeave={() => rive && rive.pause()}
    />
  )
}

const sampleTextTracks: TrackProps[] = [
  // Subtitles
  {
    src: "https://media-files.vidstack.io/sprite-fight/subs/english.vtt",
    label: "English",
    language: "en-US",
    kind: "subtitles",
    default: true,
  },
  {
    src: "https://media-files.vidstack.io/sprite-fight/subs/spanish.vtt",
    label: "Spanish",
    language: "es-ES",
    kind: "subtitles",
  },
  // Chapters
  {
    src: "https://media-files.vidstack.io/sprite-fight/chapters.vtt",
    kind: "chapters",
    language: "en-US",
    default: true,
  },
] as const

export default function Index() {
  const intl = useIntl()

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix (SPA Mode)</h1>
      <p>
        {intl.formatNumber(5_000_000, {
          notation: "compact",
          compactDisplay: "short",
        })}
      </p>
      <div className="size-6 bg-emerald-400"></div>
      <SimpleRive />
      <motion.div
        style={{
          height: "50px",
          background: "red",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <Accordion />
      <div className="mx-auto mt-5 w-full max-w-5xl items-center justify-center p-0">
        <Player
          className="aspect-video w-full"
          src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4"
          textTracks={sampleTextTracks}
          thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt"
        />
      </div>
      <div className="mx-auto w-full max-w-5xl items-center justify-center p-0">
        <Player
          className="h-[120px] w-full"
          src="https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"
        />
      </div>
      <ul>
        <button className="btn btn-primary rounded-full">Amen</button>
        <li>
          <a
            target="_blank"
            href="https://remix.run/future/spa-mode"
            rel="noreferrer"
          >
            SPA Mode He
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  )
}
