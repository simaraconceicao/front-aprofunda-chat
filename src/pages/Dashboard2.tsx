import { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from "./styles";
import ChatGemini2 from '../components/chat-gemini/ChatGemini2';
import { auth } from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

type Despesa = {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  tipo: string;
  data: string;
  user: string;
};

const Dashboard2 = () => {
  const [despesas, setDespesas] = useState([] as Despesa[]);
  const [user] = useAuthState(auth); // Hook do Firebase pa

  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const response = await axios.get(`https://back-aprofunda-chat-despesa.onrender.com/despesas/${user?.uid}`);
        setDespesas(response.data);
      } catch (error) {
        console.error("Erro ao buscar despesas:", error);
      }
    };
    fetchDespesas();
  }, []);

  const calcularTotais = () => {
    if (despesas.length === 0) {
      return { entradas: 0, saidas: 0, saldo: 0 };
    }
  
    const entradas = despesas
      .filter((d) => d.tipo === "entrada" && d.valor)
      .reduce((acc, d) => acc + d.valor, 0);
  
    const saidas = despesas
      .filter((d) => d.tipo === "saída" && d.valor)
      .reduce((acc, d) => acc + d.valor, 0);
  
    return { entradas, saidas, saldo: entradas - saidas };
  };

  const { entradas, saidas, saldo } = calcularTotais();

  return (
    <S.TableContainer>
      <S.Title>Dashboard de Finanças</S.Title>
      {/* Totais de Entradas, Saídas e Saldo */}
      <S.CardsContainer>
        <S.Card bgColor="#FF8C00">
          <p>Entradas</p>
          <p>R$ {entradas.toFixed(2)}</p>
        </S.Card>
        <S.Card bgColor="#B22222">
          <p>Saídas</p>
          <p>R$ {saidas.toFixed(2)}</p>
        </S.Card>
        <S.Card bgColor="#006400">
          <p>Saldo</p>
          <p>R$ {saldo.toFixed(2)}</p>
        </S.Card>
      </S.CardsContainer>
      
      {/* Tabela com os dados das despesas */}
      <S.StyledTable>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {despesas.map((despesa) => (
            <tr key={despesa.id}>
              <td>{despesa.descricao}</td>
              <td>{despesa.categoria}</td>
              <td>R$ {despesa.valor.toFixed(2)}</td>
              <td>{despesa.tipo}</td>
              <td>{despesa.data}</td>
            </tr>
          ))}
        </tbody>
      </S.StyledTable>
      <ChatGemini2 despesas={despesas} />
    </S.TableContainer>
  );
};

export default Dashboard2;
