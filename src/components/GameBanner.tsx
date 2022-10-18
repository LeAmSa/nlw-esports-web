interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
  className?: string;
  onClick: () => void;
}

function GameBanner(props: GameBannerProps) {
  return (
    <div
      className={`relative rounded-lg overflow-hidden cursor-pointer z-0 ${props.className}`}
      onClick={props.onClick}
    >
      <img src={props.bannerUrl} alt="" />
      <div className="w-full pt-16 pb-4 px-2 md:px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{props.title}</strong>
        <span className="text-zinc-300 text-sm block">
          {props.adsCount} anúncio(s)
        </span>
      </div>
    </div>
  );
}

export default GameBanner;
