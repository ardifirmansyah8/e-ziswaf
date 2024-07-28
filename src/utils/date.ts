export const currentYear = new Date().getFullYear();

// get range years from current year to 3 years ago
export const getRangeYears = () =>
  Array.from(
    { length: (currentYear - 2 - currentYear) / -1 + 1 },
    (_, i) => currentYear + i * -1
  );
