import { ConnectWallet,useContract,useActiveListings,MediaRenderer} from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import "./styles/Home.css";

export default function Home() {

  const {contract} = useContract(
    '0xDae246Ba812084558A2Cd4672Dcb7894B2dcB29f',
    'marketplace'
  )

  const {data:nfts, isLoading} = useActiveListings(contract)

  return (
    <div className="container">
      <main className="main">
        <h1>ether X mumbai</h1>
        <ConnectWallet/>
        { !isLoading ? (
          <div>
            {nfts && nfts.map((nft) => {
              return (
                <div className="item">
                  <h3>{nft.asset.name}</h3>
                  <MediaRenderer 
                    src={nft.asset.image}
                    width="384px"
                    height="256px"
                  />
                  <div className="itemFooter">
                    <p>Price : {nft.buyoutCurrencyValuePerToken.displayValue} MATIC</p>
                    <button className="buyButton"
                      onClick={
                        async () => {
                          try {
                            await contract?.buyoutListing(BigNumber.from(nft.id),1);
                          } catch (error) {
                            console.error(error);
                            alert(error);
                          }
                        }
                      }
                    >Buy Now</button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </div>
  );
}
