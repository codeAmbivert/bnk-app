import { Button } from "@/components/shared/Button";
import { WalletData } from "../../../../../redux/slices/walletSlice";
import ChartComp from "@/components/shared/Chart";
import { currencyFormatter } from "@/helpers/utils";

interface WalletCompProps {
  walletData: WalletData | null;
}
const WalletGraph = ({ walletData }: WalletCompProps) => {
  const chartData = [
    { name: "Apr 1, 2022", uv: 100, pv: 2400, amt: 1000 },
    { name: "Apr 10, 2022", uv: 300, pv: 200, amt: 3000 },
    { name: "Apr 20, 2022", uv: 50, pv: 200, amt: 3000 },
    { name: "Apr 30, 2022", uv: 200, pv: 200, amt: 3000 },
  ];
  return (
    <div className="w-full">
      <div className="flex gap-14 items-end flex-wrap">
        <div className="flex flex-col gap-2">
          <p className="text-[15px] font-medium text-[#56616b]">
            Available Balance
          </p>
          <p className="text-[36px] font-bold">
            USD {currencyFormatter(walletData?.balance ?? 0)}
          </p>
        </div>
        <div className="mb-4">
          <Button className="h-[52px] w-[167px] font-medium text-white bg-[#131316]">
            Withdraw
          </Button>
        </div>
      </div>
      <ChartComp data={chartData} />
    </div>
  );
};

export default WalletGraph;
