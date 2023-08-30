/*eslint-env broswer*/
import * as Chakra from "@chakra-ui/react";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import { useState } from "./useState";

export default function Group_Search(props: {
    offset_limits: Offset_limits
}) {
    const { result, formik } = useState(props);
    return (
        <Chakra.Stack>
            <Chakra.Heading fontFamily={"inherit"}>Search Group</Chakra.Heading>
            <form
                onSubmit={formik.handleSubmit}
            >
                <Chakra.FormControl isInvalid={formik.errors.name != undefined ? true : false}>
                    <Chakra.FormLabel>
                        Group name
                    </Chakra.FormLabel>
                    <Chakra.Input
                        type={"search"}
                        name={"name"}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {
                        formik.errors.name != undefined ? (
                            <Chakra.FormErrorMessage>
                                {
                                    formik.errors.name
                                }
                            </Chakra.FormErrorMessage>
                        ) : (
                            <></>
                        )
                    }
                </Chakra.FormControl>
            </form>
            <Chakra.Box>
                {
                    result
                }
            </Chakra.Box>
        </Chakra.Stack>
    );
}