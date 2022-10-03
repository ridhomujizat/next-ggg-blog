// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import language from "./text.json";

export default function handler(lang) {
  const currentLang = lang ?? "en";
  const text = language[currentLang];
  return { currentLang, text };
}
