export interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  clicked: boolean;
  fallDuration: number;
  onClick: CallableFunction;
}