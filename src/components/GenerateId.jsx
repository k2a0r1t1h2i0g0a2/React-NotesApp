export const generateUniqueId = (notes) => {
  const maxId = Math.max(...notes.map((note) => note.id), 0);

  return maxId + 1;
};
