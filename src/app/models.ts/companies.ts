export interface Companies {
  id: number;
  name: string;
  shortName: string;
  address: string;
  isActive: boolean;
  contactEmail?: string;
  contactPhone?: string;
  createdBy: string;
  createdAt: Date | string;
  updatedBy?: string;
  updatedAt?: Date | string;
}
export interface NewCompany {
  name: string;
  shortName: string;
  address: string;
  isActive: boolean;
  contactEmail?: string;
  contactPhone?: string;
  createdBy: string; // The person performing the action
}
export interface UpdateCompany {
    id: number;
  name: string;
  shortName: string;
  address: string;
  isActive: boolean;
  contactEmail?: string;
  contactPhone?: string;
  updatedBy: string; // The person performing the action
}