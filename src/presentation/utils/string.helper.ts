import moment from 'moment';

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
    return string;
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

// FORMAT CURRENCY
export const formatCurrency = (
  amount: number | string | undefined,
  currency: string = 'USD'
) => {
  if (!amount) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(Number(amount));
};

// FORMAT DATE
export const formatDate = (
  date: string | Date | undefined,
  format: string = 'YYYY-MM-DD'
): string => {
  const inDate = new Date(date || '');
  if (isNaN(inDate.getTime())) return date as string;

  if (!date) return moment().format(format);
  return moment(date).format(format);
};
