import { ReactNode } from "react";

interface buttonProps {
    onClickHandler: () => void,
    children : React.ReactNode
}
export default function Button(prop  : buttonProps) 
{
    return <button onClick={prop.onClickHandler}>
        {prop.children}
    </button>
}