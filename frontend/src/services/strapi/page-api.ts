import { getStrapiToken } from "./api-helpers";
import { fetchAPI } from "./fetch-api";

export async function getContentByPageSlug({ page }: { page: string }) {
  const token = getStrapiToken();

  const path = `/arobid-contents`;

  const params = {
    filters: {
      description: {
        ["$startsWith"]: page,
      },
    },
  };

  const options = { headers: { Authorization: `Bearer ${token}` } };
  return await fetchAPI(path, params, options);
}

export const getSectionData = ({ originalData, page, section, element }: { originalData: any; page: string; section: string; element?: string }) => {
  if (!originalData) return [];
  const sectionData = originalData.filter((data: any) =>
    data?.attributes.description?.startsWith(element ? `${page}-${section}-${element}` : `${page}-${section}`),
  );
  return sectionData;
};

export const getSectionElementData = ({ originalData, page, section, element }: { originalData: any; page: string; section: string; element?: string }) => {
  if (!originalData) return [];
  const sectionData = originalData.find((data: any) =>
    data?.attributes.description?.startsWith(element ? `${page}-${section}-${element}` : `${page}-${section}`),
  );
  return sectionData;
};

export const getSectionElementValue = ({ originalData, page, section, element }: { originalData: any; page: string; section: string; element: string }) => {
  if (!originalData) return "";
  const elementData = getSectionElementData({ originalData, page, section, element });
  return getElementValue(elementData);
};

export const getElementValue = (elementData: any) => {
  if (!elementData) return "";
  return elementData?.attributes?.contentVi || "";
};
