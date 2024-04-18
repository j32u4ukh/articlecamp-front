import CommonStyles from "../styles/Page.module.css"

export default function NotFoundPage(){
    return (
        <div className={`${CommonStyles["vertical-center-layout"]} ${CommonStyles["container"]}`}>
            <h1 style={{margin: "20px auto"}}>404 Not Found</h1>
            {/* aspect-ratio:設置元素的寬高比 */}
            <img 
                style={{height: "62.5%", width: "62.5%", maxWidth: "100%", aspectRatio: "1/1", margin: "20px auto"}}
                src="/images/icons8-not-found-100.png"></img>
        </div>
    );
};