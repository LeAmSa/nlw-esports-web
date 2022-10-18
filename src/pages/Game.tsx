import { CaretLeft } from "phosphor-react";

import logoImg from "../assets/logo-nlw-esports.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import { DuoCard, DuoCardProps } from "../components/DuoCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "./Home";
import { useLocation, useNavigate } from "react-router-dom";

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    fetch(`${BASE_URL}/${location.state.id}/ads`)
      .then((res) => res.json())
      .then((data) => setDuos(data));
  }, []);

  console.log(duos);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-10 md:my-20 px-4">
      <header className="w-full flex justify-between items-center">
        <CaretLeft
          weight="bold"
          size={28}
          className="text-white cursor-pointer"
          onClick={() => navigate("/")}
        />

        <img className="w-36 md:w-60" src={logoImg} alt="" />

        <div></div>
      </header>

      <main className="mt-8 w-full flex flex-col items-center">
        <img
          src={location.state.bannerUrl}
          alt="Banner do game"
          className="w-[310px] md:w-96 h-[100px] object-cover rounded-lg"
        />

        <div className="mt-8">
          <h1 className="text-white font-bold text-2xl md:text-3xl">
            {location.state.title}
          </h1>
          <span className="text-gray-400">Conecte-se e comece a jogar!</span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 overflow-x-scroll">
          {duos.map((duo) => {
            return <DuoCard key={duo.id} data={duo} />;
          })}
        </div>
      </main>
    </div>
  );
}
