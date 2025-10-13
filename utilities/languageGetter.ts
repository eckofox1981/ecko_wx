import { english, french, swedish } from "@/assets/languages/languages";

export function languageGetter(langId: string) {
  if (langId === "fr") {
    return french;
  }

  if (langId === "se") {
    return swedish;
  }

  return english;
}
