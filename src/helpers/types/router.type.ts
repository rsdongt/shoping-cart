import { Ref } from "vue";
import { TIndexedObject } from ".";

export type TLocation = {
  pathname: string;
  href: string;
};

export type TNavigate = (url: string, state?: TIndexedObject) => void;

export type TRouter = {
  location: Ref<TLocation>;
  navigate: TNavigate;
};
