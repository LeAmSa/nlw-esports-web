import { DuoInfo } from "./DuoInfo";

import { GameController } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

export interface DuoCardProps {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string;
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <div className="mt-8 w-[210px] rounded-lg p-5 flex flex-col gap-2 items-center bg-[#2A2634] shadow-md">
      <DuoInfo label="Nome" value={data.name} />

      <DuoInfo label="Tempo de jogo" value={`${data.yearsPlaying} ano(s)`} />

      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dia(s) \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />

      <DuoInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={data.useVoiceChannel ? "text-green-500" : "text-red-500"}
      />

      <Dialog.Trigger
        className="w-full h-9 rounded-md bg-violet-500 hover:bg-violet-400 transition-colors flex items-center justify-center gap-2 text-white"
        onClick={onConnect}
      >
        <GameController size={20} weight="bold" />
        Conectar
      </Dialog.Trigger>
    </div>
  );
}
