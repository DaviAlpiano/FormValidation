import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { IMaskInput } from 'react-imask';

const schema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  telefone: yup.string().required("Telefone é obrigatório").min(14, "Telefone incompleto"),
  senha: yup.string().min(6, "Senha deve ter no mínimo 6 caracteres").required("Senha é obrigatória"),
  confirmarSenha: yup.string()
    .oneOf([yup.ref('senha')], "Senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
}).required();

export default function App() {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    alert("Cadastro feito com sucesso!\n" + JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: 40 }}>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome</label>
          <input {...register("nome")} />
          <p style={{ color: "red" }}>{errors.nome?.message}</p>
        </div>

        <div>
          <label>E-mail</label>
          <input {...register("email")} />
          <p style={{ color: "red" }}>{errors.email?.message}</p>
        </div>

        <div>
          <label>Telefone</label>
          <Controller
            name="telefone"
            control={control}
            render={({ field }) => (
              <IMaskInput
                {...field}
                mask="(00) 00000-0000"
                onAccept={(value) => field.onChange(value)}
                onBlur={field.onBlur}
              />
            )}
          />
          <p style={{ color: "red" }}>{errors.telefone?.message}</p>
        </div>

        <div>
          <label>Senha</label>
          <input type="password" {...register("senha")} />
          <p style={{ color: "red" }}>{errors.senha?.message}</p>
        </div>

        <div>
          <label>Confirmar senha</label>
          <input type="password" {...register("confirmarSenha")} />
          <p style={{ color: "red" }}>{errors.confirmarSenha?.message}</p>
        </div>

        <button type="submit" style={{ marginTop: 10 }}>Cadastrar</button>
      </form>
    </div>
  );
}