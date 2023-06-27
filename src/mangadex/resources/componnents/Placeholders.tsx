import { CardHeader, Skeleton  } from "@chakra-ui/react";

export function CardPlaceHolders(){
    return (<CardHeader><Skeleton size="lg" animation="glow"/></CardHeader>);
}
export function Caroussel_PlaceHolders(){
    return (<div><Skeleton size="lg" animation="glow"/></div>);
}