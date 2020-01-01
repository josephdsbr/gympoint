import styled from 'styled-components';

export const Container = styled.div`
  width: 80%;
  margin-top: 3%;
  height: auto;
  background: transparent;
  align-self: flex-start;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.p`
  color: #444444;
  font-size: 24px;
`;

export const Search = styled.div`
  display: flex;
`;

export const RegisterButton = styled.button`
  background: #ee4d64;
  border: 1px solid #dddddd;
  border-radius: 4px;
  color: #fff;
  text-transform: uppercase;
  padding: 5px 10px;
`;

export const Input = styled.input`
  border: 1px solid #dddddd;
  border-radius: 4px;
  text-align: center;
  color: #999999;
`;

export const Content = styled.div`
  background: #fff;
  min-height: 50%;
  border-radius: 4px;
  padding: 2%;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  th {
    width: 50px;
    text-transform: uppercase;
    font-weight: normal;
    color: #444444;
  }

  .table-row {
    line-height: 30px;

    & + .table-row {
      border-top: 1px solid #eeeeee;
    }
  }

  td {
    color: #444444;
  }

  th,
  td {
    padding: 4px 0;
    text-align: left;

    button {
      background: transparent;
      border: none;
      margin: 0 10px;
    }

    .edit {
      color: #4d85ee;
    }

    .delete {
      color: #de3b3b;
    }
  }
`;
