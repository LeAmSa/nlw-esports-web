import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { CheckCircle, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";

interface AlertProps {
  message: string;
  alertOpen: boolean;
  setAlertOpen: Dispatch<SetStateAction<boolean>>;
}

export function Alert({ message, alertOpen, setAlertOpen }: AlertProps) {
  return (
    <AlertDialog.Root open={alertOpen} onOpenChange={setAlertOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/60 inset-0 fixed z-50" />
        <AlertDialog.Content className="fixed bg-[#2A2634] py-8 px-6 md:px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-between rounded w-96 shadow-lg z-50">
          {message === "success" ? (
            <div className="flex items-center gap-2">
              <CheckCircle size={40} weight="bold" color="#22c55e" />
              <span>Anúncio criado com sucesso!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <XCircle size={40} weight="bold" color="#ef4444" />
              <span>Ops! Algo deu errado...</span>
            </div>
          )}

          <AlertDialog.Action className="text-violet-500 font-bold">
            OK
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
