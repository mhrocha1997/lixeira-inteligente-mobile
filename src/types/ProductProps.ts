export type ProductProps = {
    id: string; 
    imageData: string;
    name: string;
    type: string;
    points: number;
    discards: number;
}

export type Inventoryprops = {
    id: string,
    points: number,
    discards: number,
    product: ProductProps,
}