export const searchArray = (
  objects,
  searchTerm,
  searchableProperties,
  maxSize,
) => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  let matchCount = 0;
  const maxMatches = maxSize;

  return objects.filter((obj) => {
    if (matchCount >= maxMatches) {
      return false;
    }

    const isMatch = searchableProperties.some((prop) => {
      if (obj[prop] && typeof obj[prop] === "string") {
        return obj[prop].toLowerCase().includes(lowerCaseSearchTerm);
      }
      return false;
    });

    if (isMatch) {
      matchCount++;
    }

    return isMatch;
  });
};
