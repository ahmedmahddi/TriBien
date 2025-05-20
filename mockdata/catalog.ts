export interface CatalogItem {
  id: number;
  name: string;
  type: "recyclable" | "non-recyclable";
  material: string;
  imageUrl?: string; // Optional now
  accepted: boolean; // True if generally accepted in curbside recycling
  info: string;
  imageType: "icon" | "url"; // Added
  imageIdentifier?: string; // Added, used for icon name
}

export const mockCatalogItems: CatalogItem[] = [
  {
    id: 1,
    name: "Plastic Bottle",
    type: "recyclable",
    material: "PET #1",
    accepted: true,
    info: "Clean and dry before recycling. Remove cap.",
    imageType: "icon",
    imageIdentifier: "faBottleWater",
  },
  {
    id: 2,
    name: "Aluminum Can",
    type: "recyclable",
    material: "Aluminum",
    accepted: true,
    info: "Empty and rinse lightly.",
    imageType: "icon",
    imageIdentifier: "faRecycle",
  },
  {
    id: 3,
    name: "Cardboard Box",
    type: "recyclable",
    material: "Cardboard",
    accepted: true,
    info: "Flatten the box. Remove tape if possible.",
    imageType: "icon",
    imageIdentifier: "faBoxOpen",
  },
  {
    id: 4,
    name: "Glass Jar",
    type: "recyclable",
    material: "Glass",
    accepted: true,
    info: "Empty and rinse. Labels are usually okay.",
    imageType: "icon",
    imageIdentifier: "faJar",
  },
  {
    id: 5,
    name: "Plastic Bag",
    type: "non-recyclable",
    material: "LDPE #4",
    accepted: false,
    info: "Not accepted in curbside recycling. Take to store drop-off.",
    imageType: "icon",
    imageIdentifier: "faShoppingBag",
  },
  {
    id: 6,
    name: "Styrofoam",
    type: "non-recyclable",
    material: "Polystyrene #6",
    accepted: false,
    info: "Generally not accepted in curbside recycling.",
    imageType: "icon",
    imageIdentifier: "faTrashAlt",
  },
  {
    id: 7,
    name: "Food Waste",
    type: "non-recyclable",
    material: "Organic",
    accepted: false, // In recycling context, true for composting
    info: "Compost if possible, otherwise trash.",
    imageType: "icon",
    imageIdentifier: "faAppleAlt",
  },
  {
    id: 8,
    name: "Used Paper Towel",
    type: "non-recyclable",
    material: "Paper (Contaminated)",
    accepted: false,
    info: "Cannot be recycled due to contamination.",
    imageType: "icon",
    imageIdentifier: "faScroll",
  },
];
