// References: https://kentcdodds.com/blog/building-an-awesome-image-loading-experience
import type { TransformerOption } from "@cld-apis/types"
import { buildImageUrl } from "cloudinary-build-url"

type ImageUrlBuilder = {
  (transformations?: TransformerOption): string
  alt: string
  id: string
}

function getImageUrlBuilder(id: string, alt = ""): ImageUrlBuilder {
  function imageUrlBuilder(transformations?: TransformerOption) {
    return buildImageUrl(id, { transformations })
  }
  imageUrlBuilder.alt = alt
  imageUrlBuilder.id = id
  return imageUrlBuilder
}

// TODO: getImgPropsFromLocal

function getImgProps(
  imageUrlBuilder: ImageUrlBuilder,
  {
    widths,
    sizes,
    transformations,
  }: {
    widths: number[]
    sizes: string[]
    transformations?: TransformerOption
  },
) {
  const averageSize = Math.ceil(widths.reduce((a, s) => a + s) / widths.length)

  return {
    alt: imageUrlBuilder.alt,
    src: imageUrlBuilder({
      quality: "auto",
      format: "auto",
      ...transformations,
      resize: { width: averageSize, ...transformations?.resize },
      defaultImage: "placeholder_img.png",
    }),
    srcSet: widths
      .map(width =>
        [
          imageUrlBuilder({
            quality: "auto",
            format: "auto",
            ...transformations,
            resize: { width, ...transformations?.resize },
            defaultImage: "placeholder_img.png",
          }),
          `${width}w`,
        ].join(" "),
      )
      .join(", "),
    sizes: sizes.join(", "),
  }
}

function getBoringAvatar({
  name,
  alt,
  widths,
  sizes,
  colors = [
    "#125430",
    "#7B985E",
    "#E3DC8B",
    "#FF4F79",
    "#8B345A",
    "#42CAFD",
    "#17183B",
  ],
}: {
  name: string
  alt: string
  widths: number[]
  sizes: string[]
  colors?: string[]
}) {
  const averageSize = Math.ceil(widths.reduce((a, s) => a + s) / widths.length)

  return {
    alt,
    src: `https://source.boringavatars.com/beam/${averageSize}/${encodeURIComponent(
      name,
    )}?colors=${colors.map(color => color.replace("#", "")).join(",")}`,
    srcSet: widths
      .map(
        width =>
          `https://source.boringavatars.com/beam/${width}/${encodeURIComponent(
            name,
          )}?colors=${colors
            .map(color => color.replace("#", ""))
            .join(",")} ${width}w`,
      )
      .join(", "),
    sizes: sizes.join(", "),
  }
}

export { getBoringAvatar, getImageUrlBuilder, getImgProps }
