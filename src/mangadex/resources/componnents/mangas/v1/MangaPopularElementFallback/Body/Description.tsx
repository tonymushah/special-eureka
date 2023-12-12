import { SkeletonText } from "@chakra-ui/react";

export default function Description() {
    return (
        <SkeletonText mt='4' noOfLines={6} spacing='4' skeletonHeight='2' />
    );
}