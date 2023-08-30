//import { trackEvent } from "@aptabase/tauri";
import React from "react";

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

const defaultError = new Error("The error is not set yet!");

type TryCatchProps = {
    catch?: React.ReactNode | ((error: Error) => React.ReactNode)
}

type TryCatchState = {
    hasError: boolean,
    error?: Error
}

const ErrorContext = React.createContext(defaultError);

export function useCatch(){
    return React.useContext(ErrorContext);
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
    componentDidCatch(error: Error, { componentStack }: React.ErrorInfo): void {
        window.Sentry.captureException(error, { contexts : {
            react : {
                componentStack
            }
        } });
    }
    render(): React.ReactNode {
        if (this.state.hasError == true) {
            if (this.state.error != undefined) {
                if (this.props.catch != undefined) {
                    if(typeof this.props.catch == "function" ){
                        return (
                        <ErrorProvider error={this.state.error}>
                            {
                                this.props.catch
                            }
                        </ErrorProvider>
                    );
                    }else{
                        return (
                            <ErrorContext.Provider value={this.state.error}>
                                {
                                    this.props.catch
                                }
                            </ErrorContext.Provider>
                        );
                    }
                    
                } else {
                    return (
                        <React.Fragment/>
                    );
                }
            } else {
                if (this.props.catch != undefined) {
                    if(typeof this.props.catch == "function" ){
                        return (
                        <ErrorProvider error={defaultError}>
                            {
                                this.props.catch
                            }
                        </ErrorProvider>
                    );
                    }else{
                        return (
                            <ErrorContext.Provider value={defaultError}>
                                {
                                    this.props.catch
                                }
                            </ErrorContext.Provider>
                        );
                    }
                } else {
                    return (
                        <React.Fragment/>
                    );
                }
            }
        }
        return this.props.children;
    }
}
