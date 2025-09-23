export interface JamMeta {
  연번: number;
  요일구분: string;
  호선: number;
  역번호: number;
  출발역: string;
  상하구분: string;
}

export type TimeKey = `${number}시${'00' | '30'}분`;

export type Jam = JamMeta & {
  [key in TimeKey]?: number;
};