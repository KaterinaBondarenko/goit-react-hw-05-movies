import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const StyledNavLink = styled(Link)`
  text-decoration: none;
  display: inline-block;
  margin: 0 10px;
  &.active {
    font-weight: bold;
    color: tomato;
  }
`;