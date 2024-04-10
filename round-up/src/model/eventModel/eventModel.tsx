export interface listEventModel {
  eventId: string | null;
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
  eventId: string | null;
  ImageName: string | null;
  ImageURL: string | null;
  eventName: string | null;
  eventDetail: string | null;
  eventLocation: string | null;
  isLimited: boolean;
  quantity: string | null;
  reserveId?: string[] | null;
  numberOfReserve?: number | null;
  startDate: string | null;
  endDate: string | null;
}
