"use client";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import {
  MediaPlayer,
  MediaProvider,
  type MediaPlayerInstance,
} from "@vidstack/react";
import { useRef } from "react";

type Props = {
  props: {
    title: string;
    url: string;
  };
};

export default function VideoPlayer({ props }: Props) {
  const { url, title } = props;

  const ref = useRef<MediaPlayerInstance>(null);

  function handleTouch() {
    if (ref.current?.paused) ref.current?.play();
    else ref.current?.pause();
  }

  return (
    <div>
      <MediaPlayer
        src={url}
        title={title}
        onTouchStart={handleTouch}
        ref={ref}
      >
        <MediaProvider />
        <DefaultAudioLayout icons={defaultLayoutIcons} />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </div>
  );
}
