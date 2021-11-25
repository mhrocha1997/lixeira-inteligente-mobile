export type ContainerProps = {
    id: string,
    name:string,
    totalCapacity: string,
    usedCapacity: number,
    capacityStatus: string,
    updatedAt: string;
    location: {
        cep: string;
        street: string;
        district: string;
        city: string;
        state: string;
    };
}