import { IKImage } from "imagekitio-react";

import { BASE_IMG_URL } from "../../content";

export interface StaysImgProps {
  src: string;
  alt: string;
  width?: number | string;
  mode?: string;
  height?: number | string;
  blur?: boolean;
  quality?: number;
  loading?: string;
  className?: string;
}

export default function StaysImage(props: any) {
  return (
    <IKImage
      margin={props.margin}
      className={props.className}
      urlEndpoint={BASE_IMG_URL}
      path={props.src.replace(BASE_IMG_URL, "")}
      alt={props.alt}
      loading={props.loading}
      lqip={{ active: true, quality: 5 }}
      transformation={[
        {
          height: props.height,
          width: props.width,
          quality: props.quality,
          crop: props.mode
        }
      ]}
    />
  );
}
