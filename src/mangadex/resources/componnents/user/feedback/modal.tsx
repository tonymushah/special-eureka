import React from "react";

import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    UseDisclosureProps,
    useDisclosure
} from "@chakra-ui/react";
import { ExtLink } from "@commons-res/components/ExtLink";

export default function UserFeedBackModal({ error, disclosureProps }: {
    error: Error,
    disclosureProps?: UseDisclosureProps
}) {
    const { isOpen, onClose } = useDisclosure(disclosureProps);
    const [comments, _set_comments] = React.useState("");
    const set_comments = React.useCallback((input: string) => {
        startTransition(() => {
            _set_comments(input);
        });
    }, [_set_comments]);
    const [name, _set_name] = React.useState("");
    const set_name = React.useCallback((input: string) => {
        startTransition(() => {
            _set_name(input);
        });
    }, [_set_name]);
    const [email, _set_email] = React.useState("");
    const set_email = React.useCallback((input: string) => {
        startTransition(() => {
            _set_email(input);
        });
    }, [_set_email]);
    const [isTransition, startTransition] = React.useTransition();
    const sendFeedBack = React.useCallback(function () {
        startTransition(() => {
            const event = window.Sentry.captureException(error);
            window.Sentry.captureUserFeedback({
                event_id: event,
                comments,
                name,
                email,
            });
            onClose();
        });
    }, [comments, name, email, event]);
    const isInvalidName = React.useMemo(() => name.length == 0 || name == "", [name]);
    const isInvalidEmail = React.useMemo(() => email.length == 0 || email == "", [email]);
    const isInvalidComments = React.useMemo(() => comments.length == 0 || comments == "", [comments]);
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Submit a feedback</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <Text>Don&apos;t panic, the user feedback feature is powered by <ExtLink href="https://sentry.io/">
                            <Link fontWeight={"bold"} >Sentry</Link>
                        </ExtLink> .</Text>
                    </Box>
                    <Box>
                        <FormControl isInvalid={isInvalidName} isRequired>
                            <FormLabel>Your name</FormLabel>
                            <Input type="text" onChange={function (e) {
                                set_name(e.currentTarget.value);
                            }} />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl isInvalid={isInvalidEmail} isRequired>
                            <FormLabel>Your e-mail</FormLabel>
                            <Input type="email" onChange={function (e) {
                                set_email(e.currentTarget.value);
                            }} />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl isInvalid={isInvalidComments} isRequired>
                            <FormLabel>Your comments</FormLabel>
                            <Textarea
                                placeholder={"Describe what happened..."}
                                onChange={function (e) {
                                    set_comments(e.currentTarget.value);
                                }}
                            />
                        </FormControl>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="gray" variant={"outline"} onClick={onClose}>
                        Close
                    </Button>
                    <Button isLoading={isTransition} isDisabled={isInvalidName || isInvalidComments || isInvalidEmail} onClick={sendFeedBack} colorScheme="green">
                        Submit feedback
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}