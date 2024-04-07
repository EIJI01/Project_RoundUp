import TestImage from "../../public/assets/test.jpg";
import TestImage2 from "../../public/assets/test2.jpg";

export const EVENTS = [
  {
    id: "1",
    image: TestImage.src,
    ImageName: "test-image",
    title: "Event 1",
    detail:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, voluptatum inventore. Beatae commodi numquam, nihil tempore deserunt id, omnis vero placeat dolorum assumenda cumque in dolore eos architecto quae odio.",
    startDate: "02.30 PM - 06.00 PM",
    location:"ตึกวิทยวิภาส, มหาวิทยาลัยขอนแก่น"
  },
  {
    id: "2",
    image: TestImage2.src,
    ImageName: "test-image",
    title: "Event 2",
    detail:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, voluptatum inventore. Beatae commodi numquam, nihil tempore deserunt id, omnis vero placeat dolorum assumenda cumque in dolore eos architecto quae odio.",
    startDate: "02.30 PM - 06.00 PM",
    location:"ตึกวิทยวิภาส, มหาวิทยาลัยขอนแก่น"
    },
  {
    id: "3",
    image: TestImage.src,
    ImageName: "test-image",
    title: "Event 3",
    detail:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, voluptatum inventore. Beatae commodi numquam, nihil tempore deserunt id, omnis vero placeat dolorum assumenda cumque in dolore eos architecto quae odio.",
    startDate: "02.30 PM - 06.00 PM",  
    location:"ตึกวิทยวิภาส, มหาวิทยาลัยขอนแก่น"
    },
  {
    id: "4",
    image: TestImage2.src,
    ImageName: "test-image",
    title: "Event 4",
    detail:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, voluptatum inventore. Beatae commodi numquam, nihil tempore deserunt id, omnis vero placeat dolorum assumenda cumque in dolore eos architecto quae odio.",
    startDate: "02.30 PM - 06.00 PM",
    location:"ตึกวิทยวิภาส, มหาวิทยาลัยขอนแก่น"
    },
  {
    id: "5",
    image: TestImage.src,
    ImageName: "test-image",
    title: "Event 5",
    detail:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, voluptatum inventore. Beatae commodi numquam, nihil tempore deserunt id, omnis vero placeat dolorum assumenda cumque in dolore eos architecto quae odio.",
    startDate: "02.30 PM - 06.00 PM",
    location:"ตึกวิทยวิภาส, มหาวิทยาลัยขอนแก่น"
    },
];

export interface EventType {
  id: string;
  image: string;
  ImageName: string;
  title: string;
  detail: string;
  startDate: string;
  location: string
}
