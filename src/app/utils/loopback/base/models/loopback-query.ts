export interface LoopBackQuery {
  where?: {[key: string]: any},
  sort?: string;
  limit?: number;
  start?: number;
  locale?: string;
}
