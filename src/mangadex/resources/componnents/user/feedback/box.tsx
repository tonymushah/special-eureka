import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Link,
    Text,
    Textarea
} from "@chakra-ui/react";
import { ExtLink } from "@commons-res/components/ExtLink";
import React from "react";
import { v4 } from "uuid";

export default function UserFeedBackBox() {
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
            const event = window.Sentry.captureMessage(`User FeedBack ${v4()}`);
            window.Sentry.captureUserFeedback({
                event_id: event,
                comments,
                name,
                email,
            });
            _set_email("");
            _set_comments("");
            _set_name("");
        });
    }, [comments, name, email]);
    const isInvalidName = React.useMemo(() => name.length == 0 || name == "", [name]);
    const isInvalidEmail = React.useMemo(() => email.length == 0 || email == "", [email]);
    const isInvalidComments = React.useMemo(() => comments.length == 0 || comments == "", [comments]);
    return (
        <React.Fragment>
            <Box>
                <Text>Don&apos;t panic, the user feedback feature is powered by <ExtLink href="https://sentry.io/">
                    <Link isExternal fontWeight={"bold"}>Sentry</Link>
                </ExtLink>.</Text>
            </Box>
            <Box mt={3}>
                <FormControl isInvalid={isInvalidName} isRequired>
                    <FormLabel>Your name</FormLabel>
                    <Input value={name} type="text" onChange={function (e) {
                        set_name(e.currentTarget.value);
                    }} />
                </FormControl>
            </Box>
            <Box mt={3}>
                <FormControl isInvalid={isInvalidEmail} isRequired>
                    <FormLabel>Your e-mail</FormLabel>
                    <Input value={email} type="email" onChange={function (e) {
                        set_email(e.currentTarget.value);
                    }} />
                </FormControl>
            </Box>
            <Box mt={3}>
                <FormControl isInvalid={isInvalidComments} isRequired>
                    <FormLabel>Your comments</FormLabel>
                    <Textarea
                        value={comments}
                        placeholder={"Please give us some suggestions or thought"}
                        onChange={function (e) {
                            set_comments(e.currentTarget.value);
                        }}
                    />
                </FormControl>
            </Box>
            <Box mt={3}>
                <Button isLoading={isTransition} isDisabled={isInvalidName || isInvalidComments || isInvalidEmail} onClick={sendFeedBack} colorScheme="green">
                    Submit feedback
                </Button>
            </Box>
        </React.Fragment>
    );
}