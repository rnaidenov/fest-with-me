import { VehicleType } from "../../../types.ts";
import { VehicleTypeToPropsMap } from "../consts.ts";

export const propsByVehicleType = (vehicleType: VehicleType | undefined) => {
  if (!vehicleType) {
    return {
      name: "Hitch",
      icon: "/hitchike.svg",
      info:
        "Sorry about that, but it seems we cannot find  relevant  travel options for your selected route and dates. Feel free to update the price manually below.",
    };
  }

  const { animation, ...props } = VehicleTypeToPropsMap[vehicleType];

  return {
    ...props,
    iconStyles: `animate-${animation}`,
  };
};
