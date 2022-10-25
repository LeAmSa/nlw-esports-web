import { CaretLeft } from "phosphor-react";

import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "../assets/logo-nlw-esports.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import { DuoCard, DuoCardProps } from "../components/DuoCard";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DuoMatch } from "../components/DuoMatch";

import { TailSpin } from "react-loader-spinner";

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const location = useLocation();

  async function getDiscordUser(adsId: string) {
    fetch(`${import.meta.env.VITE_API_URL}/ads/${adsId}/discord`)
      .then((res) => res.json())
      .then((data) => setDiscordDuoSelected(data.discord));
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/games/${location.state.id}/ads`)
      .then((res) => res.json())
      .then((data) => {
        setDuos(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-10 md:my-20 px-4">
      <header className="w-full flex justify-between items-center">
        <CaretLeft
          weight="bold"
          size={28}
          className="text-white cursor-pointer"
          onClick={() => navigate("/")}
        />

        <img className="w-36 md:w-60" src={logoImg} alt="Logo" />

        <div></div>
      </header>

      <main className="mt-8 w-full flex flex-col items-center">
        <img
          src={location.state.bannerUrl}
          alt="Banner do game"
          className="w-[310px] md:w-96 h-[100px] object-cover rounded-lg"
        />

        <div className="mt-8 flex items-center gap-1">
          <h1 className="text-white font-bold text-2xl md:text-3xl">
            {location.state.title}
          </h1>
          {duos.length > 0 && (
            <span className="text-white text-sm md:text-base">
              &bull; {duos.length} anúncio(s)
            </span>
          )}
        </div>
        <span className="text-gray-400">Conecte-se e comece a jogar!</span>

        {loading ? (
          <div className="mt-24">
            <TailSpin height="28" width="28" color="#8b5cf6" />
          </div>
        ) : duos.length > 0 ? (
          <Dialog.Root>
            <Swiper
              className="mt-4 w-full z-0"
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 120,
                  centeredSlides: true,
                  freeMode: true,
                  modules: [FreeMode],
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                  freeMode: true,
                  centeredSlides: false,
                  modules: [FreeMode],
                },
                1344: {
                  slidesPerView: 5,
                  spaceBetween: 12,
                  freeMode: true,
                  centeredSlides: false,
                  modules: [FreeMode],
                },
              }}
            >
              {duos.map((duo) => {
                return (
                  <SwiperSlide key={duo.id}>
                    <DuoCard
                      data={duo}
                      onConnect={() => {
                        getDiscordUser(duo.id);
                      }}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <DuoMatch discord={discordDuoSelected} />
          </Dialog.Root>
        ) : (
          <span className="text-white mt-24">
            Não há anúncios publicados ainda...
          </span>
        )}
      </main>
    </div>
  );
}
