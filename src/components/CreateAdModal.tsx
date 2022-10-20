import { Check, GameController } from "phosphor-react";
import Input from "./Form/Input";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { BASE_URL } from "../pages/Home";
import { useEffect, useState, FormEvent } from "react";
import { Game } from "../pages/Home";
import axios from "axios";
import { Alert } from "./Alert";

import { useForm } from "react-hook-form";

export type FormData = {
  game: string;
  name: string;
  yearsPlaying: Number;
  discord: string;
  hourStart: string;
  hourEnd: string;
};

function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [isWeekDaysEmpty, setIsWeekDaysEmpty] = useState(false);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSuccessOrErrorMessage, setAlertSuccessOrErrorMessage] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      game: "",
      name: "",
      yearsPlaying: "",
      discord: "",
      hourStart: "",
      hourEnd: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (weekDays.length === 0) {
      setIsWeekDaysEmpty(true);
      return;
    } else {
      setIsWeekDaysEmpty(false);
    }

    try {
      await axios.post(`${BASE_URL}/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });
      setAlertOpen(true);
      setAlertSuccessOrErrorMessage("success");
    } catch (error) {
      console.log(error);
      setAlertOpen(true);
      setAlertSuccessOrErrorMessage("error");
    }
  });

  useEffect(() => {
    axios(BASE_URL).then((res) => {
      setGames(res.data);
    });
  }, []);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed z-50" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-6 md:px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[330px] md:w-[500px] h-5/6 md:h-auto shadow-lg shadow-black/50 overflow-y-scroll md:overflow-auto z-50">
        <Dialog.Title className="text-2xl md:text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <select
              //@ts-ignore
              name="game"
              id="game"
              className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none ${
                errors.game && "border border-red-500"
              }`}
              defaultValue=""
              {...register("game", { required: "Campo obrigatório" })}
            >
              <option disabled value="">
                Selecione o game que deseja jogar
              </option>

              {games.map((game) => {
                return (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                );
              })}
            </select>
            {errors.game && (
              <p className="text-red-500 text-xs font-semibold">
                {errors.game.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              name="name"
              id="name"
              placeholder="Como te chamam dentro do game?"
              register={register}
              errors={errors}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 ">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                name="yearsPlaying"
                id="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
                register={register}
                errors={errors}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input
                name="discord"
                id="discord"
                type="text"
                placeholder="Usuario#0000"
                register={register}
                errors={errors}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-7 md:grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  } `}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  } `}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  } `}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  } `}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  } `}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  } `}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
              {isWeekDaysEmpty && (
                <p className="text-red-500 text-xs font-semibold">
                  Selecione os dias da semana
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <label htmlFor="hourStart">De</label>
                  <Input
                    name="hourStart"
                    id="hourStart"
                    type="time"
                    placeholder="De"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="hourEnd">Até</label>
                  <Input
                    name="hourEnd"
                    id="hourEnd"
                    type="time"
                    placeholder="Até"
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                checked === true
                  ? setUseVoiceChannel(true)
                  : setUseVoiceChannel(false);
              }}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>

      <Alert
        message={alertSuccessOrErrorMessage}
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
      />
    </Dialog.Portal>
  );
}

export default CreateAdModal;
