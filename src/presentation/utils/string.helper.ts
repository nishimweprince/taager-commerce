/**
 * Capitalize string
 * @param string - string to capitalize
 * @returns capitalized string
 */
// CAPITALIZE STRING
export const capitalizeString = (
  string: string | undefined | null | number
) => {
  if (!string || typeof string !== 'string') return '';
  const isCamelCase = /^[a-z]+([A-Z][a-z]*)*$/.test(string);
  if (isCamelCase) return capitalizeCamelCase(string);
  if (
    string?.includes('@') ||
    string?.includes('true') ||
    string?.includes('false')
  )
    return string; // Avoid capitalizing email addresses and boolean values
  const words = string?.toLowerCase()?.split('_');
  const capitalizedWords =
    words && words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords && capitalizedWords.join(' ');
};

// CAPITALIZE CAMEL CASE
function capitalizeCamelCase(string: string) {
  return string
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, function (str) {
      return str.toUpperCase();
    })
    .trim();
}
