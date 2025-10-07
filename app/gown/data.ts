export type Gown = {
  id: string;
  name: string;
  collection: string;
  tags: string[];
  skirt: string;
  metroManilaRate: number;
  luzonRate: number;
  outsideLuzonRate: number;
  pixieMetroManilaRate: number;
  pixieLuzonRate: number;
  pixieOutsideLuzonRate: number;
  bust: string;
  waist: string;
  arms: string;
  backing: string;
  longGownPicture: string;
  filipinianaPicture: string;
  pixiePicture: string;
  trainPicture: string;
  addOns: string[];
  relatedGownIds: string[];
};

export const mockGowns: Gown[] = [
  {
    id: "florence",
    name: "Florence",
    collection: "AeCia",
    tags: ["brown", "pleated", "halter"],
    skirt: "A-line pleated",
    metroManilaRate: 2790,
    luzonRate: 2990,
    outsideLuzonRate: 3190,
    pixieMetroManilaRate: 1790,
    pixieLuzonRate: 1890,
    pixieOutsideLuzonRate: 1990,
    bust: "29-33",
    waist: "23-25",
    arms: "34-37",
    backing: "56",
    longGownPicture: "/assets/sample_gown-1.jpg",
    filipinianaPicture: "/assets/sample_gown-1.jpg",
    pixiePicture: "/assets/sample_gown-1.jpg",
    trainPicture: "/assets/sample_gown-1.jpg",
    addOns: ["Corset upgrade", "Removable sleeves", "Petticoat"],
    relatedGownIds: ["aria", "selene"],
  },
  {
    id: "aria",
    name: "Aria",
    collection: "AeCia",
    tags: ["strapless", "classic"],
    skirt: "Ball gown",
    metroManilaRate: 2990,
    luzonRate: 3190,
    outsideLuzonRate: 3390,
    pixieMetroManilaRate: 1990,
    pixieLuzonRate: 2090,
    pixieOutsideLuzonRate: 2190,
    bust: "30-34",
    waist: "24-26",
    arms: "34-37",
    backing: "56",
    longGownPicture: "/assets/sample_gown-1.jpg",
    filipinianaPicture: "/assets/sample_gown-1.jpg",
    pixiePicture: "/assets/sample_gown-1.jpg",
    trainPicture: "/assets/sample_gown-1.jpg",
    addOns: ["Detachable train", "Shawl"],
    relatedGownIds: ["florence"],
  },
  {
    id: "selene",
    name: "Selene",
    collection: "Luna",
    tags: ["black", "sleek"],
    skirt: "Mermaid",
    metroManilaRate: 3190,
    luzonRate: 3390,
    outsideLuzonRate: 3590,
    pixieMetroManilaRate: 2090,
    pixieLuzonRate: 2190,
    pixieOutsideLuzonRate: 2290,
    bust: "31-35",
    waist: "25-27",
    arms: "34-37",
    backing: "56",
    longGownPicture: "/assets/sample_gown-1.jpg",
    filipinianaPicture: "/assets/sample_gown-1.jpg",
    pixiePicture: "/assets/sample_gown-1.jpg",
    trainPicture: "/assets/sample_gown-1.jpg",
    addOns: ["Pearl belt", "Gloves"],
    relatedGownIds: ["florence"],
  },
];

export function getGownById(id: string): Gown | undefined {
  return mockGowns.find((g) => g.id === id);
}

