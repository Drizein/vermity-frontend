export const inputRules = {
  required: (v: string) => {
    if (v != "") return true;
    return "Feld darf nicht leer sein!";
  },
  plz: (v: number | null) => {
    if (v === null || v >= 0) return true;
    return "Feld darf nicht leer sein!";
  },
  min: (v: string, min: number) => {
    if (v.length > min) return true;
    return `Mind. ${min} Zeichen!`;
  },
  max: (v: string, max: number) => {
    if (v.length < max) return true;
    return `Max. ${max} Zeichen!`;
  },
  validEmail: (v: string) => {
    if (v.length >= 7) if (v.includes("@")) if (v.includes(".")) return true;
    return `Keine gültige E-Mail!`;
  },
  validPhone: (v: string) => {
    if (v.length >= 6) if (!isNaN(+v)) if (v.at(0) !== "0") return true;
    return `Keine gültige Telefonnummer!`;
  },
  containsSpecialChar: (v: string) => {
    if (v.match(/[^a-zA-Z0-9]/)) return true;
    return `Min. ein Sonderzeichen!`;
  },
  containsNumber: (v: string) => {
    if (v.match(/[0-9]/)) return true;
    return `Min. eine Zahl!`;
  },
  containsUpperCase: (v: string) => {
    if (v.match(/[A-Z]/)) return true;
    return `Min. ein Großbuchstabe!`;
  },
  containsLowerCase: (v: string) => {
    if (v.match(/[a-z]/)) return true;
    return `Min. ein Kleinbuchstabe!`;
  },
};
