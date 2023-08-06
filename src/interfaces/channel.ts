export interface Channel {
  label: string;
  value: string;
  type: number;
  guild: string;
  guildId: string;
  parentId: string | null;
  permissionOverwrites: string[];
  messages?: string[];
  threads?: string[];
  nsfw?: boolean;
  id: string;
  name: string;
  topic?: string | null;
  lastMessageId?: string | null;
  rawPosition: number;
  createdTimestamp: number;
  rateLimitPerUser?: number;
  rtcRegion?: string | null;
  bitrate?: number;
  userLimit?: number;
  videoQualityMode?: string | null;
}
