import { Dimensions } from "react-native";

type DimensionsType = {
  width: number,
  height: number
}

export type GlobalConstantsType = {
  authToken: string;
  dimensions : DimensionsType
};

const screenDimensions = Dimensions.get("screen");

export const GlobalConstants = {
  authToken: "",
  dimensions: screenDimensions
};
