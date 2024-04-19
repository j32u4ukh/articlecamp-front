// import Footer from "../components/Footer";
import Header from "../components/Header";

const style = {
  height: '85vh',
  padding: '20px',
  'padding-bottom': '100px',
  position: 'relative'
};

export default function BasicLayout({ children }) {
    return (
      <>
        <Header/>
        <main style={style}>{children}</main>
        {/* <Footer/> */}
      </>
    );
}