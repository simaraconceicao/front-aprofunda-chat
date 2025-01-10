import styled from 'styled-components';

export const StyledNavbar = styled.nav`
  background-color: #8B008B;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    list-style-type: none;
    color: inherit;
    text-decoration: none;
    padding: 0.5rem;
    border-bottom: 3px solid transparent;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  padding: 15px;
  gap: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  p {
    font-size: 18px;
    font-weight: 500;
    color: #333;
    margin: 0;
  }
`;

export const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const Button = styled.div`
  display: inline-block;
  background-color: #4caf50;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  label {
    font-size: 16px;
  }

  &:hover {
    background-color: #45a049;
  }
`;