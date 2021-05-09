import React, {useState} from "react";
import NewMarket from "../components/NewMarket";
import MarketList from '../components/MarketList';

const HomePage = () => {
  const [marketDialogVisible, setMarketDialogVisible] = useState(false);

  return (
    <div>
      <NewMarket marketDialogVisible={marketDialogVisible} setMarketDialogVisible={setMarketDialogVisible} />
      <MarketList />
    </div>
  );
}

export default HomePage;