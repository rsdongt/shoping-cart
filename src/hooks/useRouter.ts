import { TIndexedObject, TLocation, TNavigate, TRouter } from "@/helpers";
import { onBeforeUnmount, onMounted, ref } from "vue";

export const useRouter = (): TRouter => {
  const location = ref<TLocation>({
    pathname: window.location.pathname,
    href: window.location.href,
  });

  const updateLocation = () => {
    const { href, pathname } = window.location;

    if (href === location.value.href) return;

    location.value = { href, pathname };
  };

  const navigate: TNavigate = (url: string, state?: TIndexedObject) => {
    window.history.pushState(state, "", url);

    updateLocation();
  };

  onMounted(() => {
    window.addEventListener("popstate", updateLocation);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("popstate", updateLocation);
  });

  return {
    location,
    navigate,
  };
};
