import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as S from './styles';

const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth); 

  useEffect(() => {
    if (user && window.location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Erro ao fazer login com Google", error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <S.StyledNavbar>
      {
        !user && (
          <NavLink to="/">Home</NavLink>
        )
      }

      {user && (
        <NavLink to="/criar-despesas">Criar Despesas</NavLink>
      )}

      {user && (
        <NavLink to="/dashboard">Dashboard</NavLink>
      )}
      
      {/* Exibe o botão de login ou a saudação com botão de sair */}
      {user ? (
        <S.ProfileContainer>
          <S.UserInfo>
            <S.UserImage
              src={user.photoURL}
              alt="Foto de perfil"
            />
            <p>Olá, {user.displayName}!</p>
          </S.UserInfo>
        <S.Button onClick={handleSignOut}>Sair</S.Button>
      </S.ProfileContainer>
      ) : (
        <S.Button onClick={signInWithGoogle}>Login</S.Button>
      )}
    </S.StyledNavbar>
  );
};

export default Navbar;
