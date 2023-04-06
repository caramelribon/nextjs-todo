import { COLOR } from "../constants/color";

export type Color = typeof COLOR[keyof typeof COLOR];
