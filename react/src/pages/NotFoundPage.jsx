import CommonStyle from "./common.module.css"

export default function NotFoundPage(){
    return (
        <div className={`${CommonStyle["vertical-center-layout"]}`}>
            <h1>NotFound</h1>
            <img src="/images/icons8-not-found-100.png"></img>
        </div>
    );
};