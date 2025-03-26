// eslint-disable-next-line @typescript-eslint/no-require-imports
const { headers } = require('next/headers');

export async function getSlug(slugIndex?: number): Promise<string | undefined> {
  const url =
    (await headers())?.get('referer') ||
    (await headers())?.get('x-request-url');
  const urlParts = url?.split('/').filter((part: string) => part);

  if (
    !urlParts ||
    slugIndex === undefined ||
    slugIndex < 0 ||
    slugIndex >= urlParts.length
  ) {
    return undefined;
  }

  return urlParts[urlParts.length - slugIndex - 1];
}
