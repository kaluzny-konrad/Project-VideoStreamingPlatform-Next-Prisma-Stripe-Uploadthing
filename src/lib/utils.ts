import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";
import { Photo, Prisma } from "@prisma/client";
import { PHOTO_REPLACEMENT_URL } from "@/config/photo";
import { DEFAULT_PRICE_CURRENCY } from "@/config/price";

import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
}

export function getPublicPrice(price: Prisma.Decimal): string {
  if(price.toNumber() === 0) return "Free";
  return formatPrice(price, { currency: DEFAULT_PRICE_CURRENCY });
}

export function formatPrice(
  price: Prisma.Decimal | string,
  options: {
    currency?: "PLN" | "USD" | "EUR" | "GBP";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "PLN", notation = "standard" } = options;

  const numericPrice =
    typeof price === "string"
      ? new Prisma.Decimal(price).toNumber()
      : price.toNumber();

  const locales =
    currency === "PLN"
      ? "pl-PL"
      : currency === "USD"
      ? "en-US"
      : currency === "EUR"
      ? "de-DE"
      : "en-GB";

  return new Intl.NumberFormat(locales, {
    style: "currency",
    currency,
    notation,
  }).format(numericPrice);
}

export function getPriceSum(prices: Prisma.Decimal[]) {
  return prices.reduce((acc, curr) => acc.add(curr), new Prisma.Decimal(0));
}

export function getDecimalPrice(price: string) {
  return new Prisma.Decimal(price).toDecimalPlaces();
}

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;
      return result + " ago";
    }
  }

  return result;
}

export function formatTimeToNow(date: Date): string {
  try {
    return formatDistanceToNowStrict(date, {
      addSuffix: true,
      locale: {
        ...locale,
        formatDistance,
      },
    });
  } catch (error) {}
  return "";
}

export function shrinkDescription(description: string, maxLength: number) {
  if (description.length <= maxLength) return description;

  // split to max length, but not in the middle of the word
  const words = description.split(" ");
  let result = "";
  for (const word of words) {
    if (result.length + word.length > maxLength) break;
    result += word + " ";
  }
  return result.trim() + "...";
}

export function constructMetadata({
  title = "Video Streaming Marketplace",
  description = "Watch and learn from the best video tutorials on the internet.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@tutorialfromyt",
    },
    icons,
    metadataBase: new URL(
      "https://video-streaming-platform-on-next.vercel.app/"
    ),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export function getPublicPhotoUrl(photos: Photo[]): string {
  if (photos.length === 0) return PHOTO_REPLACEMENT_URL;

  let mainPhoto = photos.find((photo) => photo.isMainPhoto === true);
  if (mainPhoto) return mainPhoto.url;

  return photos[0].url;
}
