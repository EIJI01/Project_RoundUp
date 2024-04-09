export interface listEventModel {
  ImageName: string | null;
  ImageURL: string | null;
  eventName: string | null;
  eventDetail: string | null;
  faculty: string[] | null;
  category: string[] | null;
  isLimited: boolean;
  quantity: string | null;
  reserveId?: string[] | null;
  numberOfReserve?: number | null;
  startDate: string | null;
  endDate: string | null;
}

export interface eventDetailModel {
  ImageName: string | null;
  ImageURL: string | null;
  eventName: string | null;
  eventDetail: string | null;
  eventLocation: string | null;
  isLimited: string | null;
  quantity: string | null;
  NumberOfReserve: number | null;
  startDate: string | null;
  endDate: string | null;
}
