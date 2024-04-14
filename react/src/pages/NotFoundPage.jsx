import CommonStyle from "./common.module.css"

export default function NotFoundPage(){
    return (
        <div className={`${CommonStyle["vertical-center-layout"]}`}>
            <h1 style={{margin: "20px auto"}}>404 Not Found</h1>
            {/* aspect-ratio:設置元素的寬高比 */}
            <img 
                style={{height: "40%", width: "40%", maxWidth: "62.5%", aspectRatio: "1/1", margin: "20px auto"}}
                src="/images/icons8-not-found-100.png"></img>
        </div>
    );
};