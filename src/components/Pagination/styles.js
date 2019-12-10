import styled from 'styled-components';

export const Container = styled.div``;

export const Pages = styled.div`
  display: flex;
  justify-content: center;
`;

export const PageButton = styled.button`
  border: 1px solid #ccc;
  text-align: center;

  ${props => props.current && 'background:#f00'}
`;
