import { InputHTMLAttributes } from "react";

import { UseFormRegister } from "react-hook-form";

import { FormData } from "../CreateAdModal";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<FormData>;
  errors: {};
}

function Input({ name, register, errors, ...props }: InputProps) {
  return (
    <>
      <input
        className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 
        ${
          //@ts-ignore
          errors[name] && "border border-red-500"
        }`}
        {...props}
        //@ts-ignore
        {...register(name, { required: "Campo obrigatório" })}
      />

      {
        //@ts-ignore
        errors[name] && (
          <p className="text-red-500 text-xs font-semibold">
            {
              //@ts-ignore
              errors[name].message
            }
          </p>
        )
      }
    </>
  );
}

export default Input;
