import TestImage from "../../public/assets/test.jpg";
import TestImage2 from "../../public/assets/test2.jpg";

export const EVENTS = [
  {
    id: "1",
    image: TestImage.src,
    ImageName: "test-image",
    title: "Event Kuy",
    detail:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, voluptatum inventore. Beatae commodi numquam, nihil tempore deserunt id, omnis vero placeat dolorum assumenda cumque in dolore eos architecto quae odio.",
  },
  {
    id: "2",
    image: TestImage2.src,
    ImageName: "test-image",
    title: "Event Kuy",
    detail:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, voluptatum inventore. Beatae commodi numquam, nihil tempore deserunt id, omnis vero placeat dolorum assumenda cumque in dolore eos architecto quae odio.",
  },
  {
    id: "3",
    image: TestImage.src,
    ImageName: "test-image",
    title: "Event Kuy",
    detail:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, voluptatum inventore. Beatae commodi numquam, nihil tempore deserunt id, omnis vero placeat dolorum assumenda cumque in dolore eos architecto quae odio.",
  },
  {
    id: "4",
    image: TestImage2.src,
    ImageName: "test-image",
    title: "Event Kuy",
    detail:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, voluptatum inventore. Beatae commodi numquam, nihil tempore deserunt id, omnis vero placeat dolorum assumenda cumque in dolore eos architecto quae odio.",
  },
  {
    id: "5",
    image: TestImage.src,
    ImageName: "test-image",
    title: "Event Kuy",
    detail:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, voluptatum inventore. Beatae commodi numquam, nihil tempore deserunt id, omnis vero placeat dolorum assumenda cumque in dolore eos architecto quae odio.",
  },
];

export interface EventType {
  id: string;
  image: string;
  ImageName: string;
  title: string;
  detail: string;
}
