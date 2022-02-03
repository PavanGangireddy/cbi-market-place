/* pages/_app.js */
import "../styles/globals.css";
import Link from "next/link";
import { NFTStoreContext } from "../context/NFTStoreContext";
import { NFTStore } from "../stores/NFTStore";
import { NFTService } from "../services/NFTService";
import { MarketPlaceStore } from "../stores/MarketPlaceStore";
import { MarketPlaceService } from "../services/MarketPlaceService";
import { MarketPlaceStoreContext } from "../context/MarketPlaceStoreContext";

function MyApp({ Component, pageProps }) {
  return (
    <NFTStoreContext.Provider value={new NFTStore(new NFTService())}>
      <MarketPlaceStoreContext.Provider
        value={new MarketPlaceStore(new MarketPlaceService())}
      >
        <div>
          <nav className="border-b p-6">
            <p className="text-4xl font-bold">Metaverse Marketplace</p>
            <div className="flex mt-4">
              <Link href="/">
                <a className="mr-4 text-pink-500">Home</a>
              </Link>
              <Link href="/create-item">
                <a className="mr-6 text-pink-500">Sell Digital Asset</a>
              </Link>
              <Link href="/my-assets">
                <a className="mr-6 text-pink-500">My Digital Assets</a>
              </Link>
              <Link href="/creator-dashboard">
                <a className="mr-6 text-pink-500">Creator Dashboard</a>
              </Link>
            </div>
          </nav>
          <Component {...pageProps} />
        </div>
      </MarketPlaceStoreContext.Provider>
    </NFTStoreContext.Provider>
  );
}

export default MyApp;
