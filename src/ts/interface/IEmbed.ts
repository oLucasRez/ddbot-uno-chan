import { EmbedColor } from '../enum/EmbedColor';

export interface IEmbed {
  title?: string;
  description?: string;
  url?: string;
  color: EmbedColor;
  footer?: {
    icon_url?: string;
    text?: string;
  };
  thumbnail?: {
    url?: string;
  };
  image?: {
    url?: string;
  };
  author?: {
    name: string;
    url?: string;
    icon_url?: string;
  };
  fields?: [
    {
      name: string;
      value: string;
      inline?: boolean;
    }
  ];
}
