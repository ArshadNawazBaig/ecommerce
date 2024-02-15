import prisma from './connect';

export const getUniqueSlug = async (title, count = 1, model) => {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const existingCategory = await prisma[`${model}`].findUnique({
    where: { slug: slug },
  });

  if (!existingCategory) {
    return slug;
  } else {
    const newSlug = `${slug}-${count}`;
    return await getUniqueSlug(newSlug, count + 1, model);
  }
};
