import React from "react";
import { isFunctionLike } from "typescript";

function ErrorProvider(props: {
    error: Error,
    children: (error: Error) => React.ReactNode
}) {
    const context = React.createContext<Error>(props.error);
    return (
        <context.Consumer>
            {
                props.children
            }
        </context.Consumer>
    );
}

type TryCatchProps = {
    catch?: (error: Error) => React.ReactNode
}

type TryCatchState = {
    hasError: boolean,
    error?: Error
}

export default class TryCatch extends React.Component<React.PropsWithChildren<TryCatchProps>, TryCatchState>{
    constructor(props: React.PropsWithChildren<TryCatchProps>) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error: error };
    }
    componentDidCatch(error: Error) {

    }
    render(): React.ReactNode {
        if (this.state.hasError == true) {
            if (this.state.error != undefined) {
                if (this.props.catch != undefined) {
                    return (
                        <ErrorProvider error={this.state.error}>
                            {
                                this.props.catch
                            }
                        </ErrorProvider>
                    );
                }else{
                    return (
                        <></>
                    );
                }
            }else{
                if (this.props.catch != undefined) {
                    return (
                        <ErrorProvider error={new Error()}>
                            {
                                this.props.catch
                            }
                        </ErrorProvider>
                    );
                }else{
                    return (
                        <></>
                    );
                }
            }
        }
        return this.props.children;
    }
}
