import { SkeletonText } from "@chakra-ui/react";

export default function Description() {
    return (
        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
    );
}