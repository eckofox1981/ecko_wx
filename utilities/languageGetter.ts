import { english, french, swedish } from "@/assets/languages/languages";

/**
 * only used once but code was getting busy in index
 * @param langId
 * @returns Language accordingly
 */
export function languageGetter(langId: string) {
  if (langId === "fr") {
    return french;
  }

  if (langId === "se") {
    return swedish;
  }

  return english;
}
