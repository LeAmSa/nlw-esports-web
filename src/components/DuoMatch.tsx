import * as Dialog from "@radix-ui/react-dialog";
import { X, Check, CheckCircle, CopySimple } from "phosphor-react";
import { useState } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";

interface DuoMatchProps {
  discord: string;
}

export function DuoMatch({ discord }: DuoMatchProps) {
  const [discordCopied, setDiscordCopied] = useState(false);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed z-50" />

      <Dialog.Content
        className="fixed p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[310px] bg-[#2A2634] rounded-lg flex flex-col items-center justify-center shadow-lg"
        onCloseAutoFocus={() => setDiscordCopied(false)}
      >
        <Dialog.Close className="text-gray-400 hover:text-white transition-colors self-end">
          <X size={20} weight="bold" />
        </Dialog.Close>

        <main className="flex flex-col items-center gap-4">
          <CheckCircle size={64} weight="bold" color="#22c55e" />
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-2xl">Let's Play!</span>
            <span className="text-gray-400">Agora é só começar a jogar!</span>
          </div>

          <div className="w-full flex flex-col gap-2 items-center">
            <span className="text-white font-bold">Adicione no discord</span>

            <CopyToClipboard
              text={discord}
              onCopy={() => setDiscordCopied(true)}
            >
              <button className="w-full flex items-center justify-between bg-[#121214] px-2 py-4 text-white rounded-lg mb-4 shadow-lg">
                <div></div>
                {discord}
                {!discordCopied ? (
                  <CopySimple size={20} color="#9ca3af" />
                ) : (
                  <Check size={20} color="#22c55e" weight="bold" />
                )}
              </button>
            </CopyToClipboard>
          </div>
        </main>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
