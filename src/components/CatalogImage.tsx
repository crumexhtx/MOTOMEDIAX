import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "src"> & {
  src: string;
};

/**
 * Catalog photos often come from Wikimedia. Next's image optimizer proxies
 * those URLs and quickly hits HTTP 429. Local `/catalog/*` and `/brands/*`
 * assets stay optimized; remote URLs skip the optimizer.
 */
export function CatalogImage({ src, alt, ...rest }: Props) {
  const isRemote = /^https?:\/\//i.test(src);
  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={isRemote}
      {...rest}
    />
  );
}
