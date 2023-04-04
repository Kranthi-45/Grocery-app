
// import list from "../data";
import Cards from "./card";
import "../styles/amazon.css";
const Amazon = ({ handleClick, handleClick2, handleSelectedCart, handleSelectedWish, upatedList }) => { 
  
    return (
    <section>
      {upatedList?.map((item) => (
        <Cards key={item.id} item={item} handleClick={handleClick} handleClick2={handleClick2} handleSelectedCart={handleSelectedCart}
          handleSelectedWish={handleSelectedWish}/>
      ))}
    </section>
  );
};

export default Amazon;