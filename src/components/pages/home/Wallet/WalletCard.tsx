import { InfoIcon } from "../../../../../public/icons/iconsExport";

interface WalletCardProps {
  cardName: string;
  amount: string;
}
export const WalletCard = ({ cardName, amount }: WalletCardProps) => {
  return (
    <div className="flex flex-col gap-2 w-full md:min-w-[271px] md:w-[271px]">
      <div className="flex gap-3 justify-between items-center">
        <p className="text-[15px] font-medium text-[#56616b]">{cardName}</p>
        <InfoIcon className="h-[15.83px] w-[15.83px]" />
      </div>
      <div className="text-[28px] font-bold">USD {amount}</div>
    </div>
  );
};
