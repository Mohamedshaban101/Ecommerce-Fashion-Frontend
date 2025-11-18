import { createContext, useState } from "react";

export const CheckFlowContext = createContext();

const CheckFlowProvider = ({children}) => {
    const [cameFromCheckout , setCameFromCheckout] = useState(false);

    return (
        <CheckFlowContext value={{ cameFromCheckout , setCameFromCheckout }}>
            {children}
        </CheckFlowContext>
    );
}
export default CheckFlowProvider;
