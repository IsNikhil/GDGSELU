type LoaderArgs = { src: string; width: number; quality?: number };

// Maps "/images/name.png" to the pre-built "/images/name-<width>.webp".
// Any other source (remote URLs, SVGs) is returned unchanged.
export default function imageLoader({ src, width }: LoaderArgs) {
  if (src.startsWith("/images/") && /\.png$/i.test(src)) {
    return src.replace(/\.png$/i, `-${width}.webp`);
  }
  return src;
}
