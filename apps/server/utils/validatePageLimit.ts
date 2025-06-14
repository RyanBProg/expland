export function validatePageLimit(page: string, limit: string) {
  // check limit is the correct format
  if (isNaN(parseInt(limit as string))) {
    return { error: "Invalid limit value" };
  }
  const resultLimit = parseInt(limit as string);

  // check page is the correct format
  if (isNaN(parseInt(page as string))) {
    return { error: "Invalid page number" };
  }
  const pageNum = parseInt(page as string);
  if (pageNum < 1) {
    return { error: "Page must be greater than 0" };
  }

  return { resultLimit, pageNum };
}
