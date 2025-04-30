import { Demographic } from "@mangadex/gql/graphql";

export default function getDemographicName(input: Demographic): string {
	switch (input) {
		case Demographic.Josei:
			return "Josei";
		case Demographic.Seinen:
			return "Seinen";
		case Demographic.Shoujo:
			return "Shoujo";
		case Demographic.Shounen:
			return "Shounen";

		default:
			return "None";
	}
}
