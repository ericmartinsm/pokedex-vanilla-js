export let currentPage = 1;
export const limit = 20;

export function nextPage() {
  currentPage++;
}

export function prevPage() {
  if (currentPage > 1) currentPage--;
}

export function getOffset() {
  return (currentPage - 1) * limit;
}
