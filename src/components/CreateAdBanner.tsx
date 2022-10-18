import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

function CreateAdBanner() {
  return (
    <div className="self-stretch pt-1 bg-nlw-gradient rounded-lg mt-8 overflow-hidden">
      <div className="bg-[#2A2634] px-8 py-6 self-stretch flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-center ">
        <div className="text-center md:text-left">
          <strong className="text-xl md:text-2xl text-white font-black block">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <Dialog.Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Plubicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
}

export default CreateAdBanner;
