import { WalletCard } from "./WalletCard";
import { WalletData } from "../../../../../redux/slices/walletSlice";
import WalletGraph from "./WalletGraph";
import { currencyFormatter } from "@/helpers/utils";

interface WalletCompProps {
  walletData: WalletData | null;
}

const WalletComp = ({ walletData }: WalletCompProps) => {
  const balance = [
    { name: "Ledger Balance", amount: walletData?.balance ?? 0 },
    { name: "Total Payout", amount: walletData?.total_payout ?? 0 },
    { name: "Total Revenue", amount: walletData?.total_revenue ?? 0 },
    { name: "Pending Payout", amount: walletData?.pending_payout ?? 0 },
  ];

  return (
    <div className="flex flex-col md:flex-row mt-12 gap-20">
      <WalletGraph walletData={walletData} />
      <div className="flex flex-col gap-5">
        {balance.map((item, index) => (
          <WalletCard
            key={index}
            cardName={item.name}
            amount={currencyFormatter(item?.amount)}
          />
        ))}
      </div>
    </div>
  );
};

export default WalletComp;
