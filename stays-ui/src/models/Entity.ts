export interface Entity {
    id: string;
    createdAt: number;
    updatedAt: number;
    createdBy?: string;
    updatedBy?: string;
}