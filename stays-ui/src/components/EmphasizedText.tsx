
import React from "react";

export interface EmphasizedTextProps {
    fullText: string,
    emphasis: string,
    class: string
}

export default function EmphasizedText(props: EmphasizedTextProps){


    function getPre(): string {
        return  props.fullText.split(props.emphasis)[0].replace(props.emphasis, "");
    }
    
    function getPost(): string {
        return props.fullText.replace(getPre(), "").replace(props.emphasis, "");
    }

    function getEmp(): string {
        if(props.fullText.includes(props.emphasis)){
            return props.emphasis;
        }
        else{
            return "";
        }
    }

    return (
        <div>
            {getPre()}
            <span className={props.class}>{getEmp()}</span>
            {getPost()}
        </div>
    )
}