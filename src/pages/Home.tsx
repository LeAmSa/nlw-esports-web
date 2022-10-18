import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "../assets/logo-nlw-esports.svg";
import GameBanner from "../components/GameBanner";
import CreateAdBanner from "../components/CreateAdBanner";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

import CreateAdModal from "../components/CreateAdModal";

import axios from "axios";

import { useNavigate } from "react-router-dom";

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export const BASE_URL = "http://localhost:3333/games";

export function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const navigate = useNavigate();

  function handleOpenGame({ id, title, bannerUrl }: Game) {
    navigate("/game", {
      state: {
        id,
        title,
        bannerUrl,
      },
    });
  }

  useEffect(() => {
    axios(BASE_URL).then((res) => {
      setGames(res.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20 px-4">
      <img className="w-36 md:w-60" src={logoImg} alt="" />

      <h1 className="text-3xl  md:text-6xl text-white font-black mt-14 md:mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <Swiper
        className="mt-14 w-full h-full z-0"
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 12,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 24,
            freeMode: true,
            centeredSlides: false,
            modules: [FreeMode],
          },
        }}
      >
        {games.map((game) => {
          return (
            <SwiperSlide key={game.id}>
              <GameBanner
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
                onClick={() => handleOpenGame(game)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}
