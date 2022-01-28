import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { Quotes, PriceData, USD } from "./Coin";

interface priceProps {
  coinId: string;
}

const PriceList = styled.div`
  background-color: white;
  color: ${(props) => props.theme.accentColor};
  margin: 10px 0px;
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
  span {
    color: black;
  }
`;

const Price = ({ coinId }: priceProps) => {
  const { isLoading, data } = useQuery<PriceData>(["Price", coinId], () =>
    fetchCoinTickers(coinId)
  );
  console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading Price ..."
      ) : (
        <div>
          <PriceList>
            <span>Price: </span> {data?.quotes.USD.price}
          </PriceList>
          <PriceList>
            <span>Change_15m: </span>
            {data?.quotes.USD.percent_change_15m}
          </PriceList>
          <PriceList>
            <span>Change_24h: </span>
            {data?.quotes.USD.percent_change_24h}
          </PriceList>
          <PriceList>
            <span>Change_30d: </span>
            {data?.quotes.USD.percent_change_30d}
          </PriceList>
        </div>
      )}
    </div>
  );
};
export default Price;
