import { VehicleType } from "../../types.ts";

export const VehicleTypeToPropsMap = {
  [VehicleType.Aircraft]: {
    name: "Flight",
    animation: "fly",
    icon: "plane.svg",
    alt: "Flying plane",
  },
  [VehicleType.Train]: {
    name: "Train",
    icon: "train.svg",
    animation: "train-travel",
    alt: "Moving train",
  },
  [VehicleType.Bus]: {
    name: "Bus",
    icon: "bus.svg",
    animation: "bumpy-ride",
    alt: "Moving rq167i90w1q§us",
  },
};
