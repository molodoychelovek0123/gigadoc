import getConfig from 'next/config';

type RequestParams = {
  context: string;
  fields: string[];
  limit?: number;
};
type ReturnValue = {
  fields: Record<string, string[]>[];
};
const {
  publicRuntimeConfig: { msToolbertUrl },
} = getConfig();
export const getSemantics = async (
  params: RequestParams,
): Promise<ReturnValue | undefined> => {
  try {
    const res: ReturnValue = await fetch(`${msToolbertUrl}/semantics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then((r) => r.json());

    return res;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
