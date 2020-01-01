import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 10px;
  background: #ffffff;
  border: 1px solid #dddddd;
`;

export const Menu = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    padding-right: 10px;
    border-right: 1px solid #dddddd;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  p {
    color: #666666;
  }

  span {
    cursor: pointer;
    color: #de3b3b;
    text-align: right;
    font-size: 12px;
  }
`;

export const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  .selected {
    color: #444444;
  }
`;

export const MenuItem = styled(Link)`
  width: auto;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 10px;
  color: #999999;


`;
