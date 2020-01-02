import styled from 'styled-components';

export const Container = styled.div`
  width: 30%;
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

export const Content = styled.div`
  background: #fff;
  min-height: 50%;
  border-radius: 4px;
  padding: 2%;
`;

export const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2%;
`;

export const ContentHeader = styled.div`
  margin-bottom: 10px;
`;

export const HeaderTitle = styled.p`
  color: #444444;
`;

export const Body = styled.div``;

export const Item = styled.div`
  padding: 8px 0;
  display: flex;
  justify-content: space-between;

  & + & {
    border-top: 1px solid #eeeeee;
  }

  .edit {
    background: transparent;
    border: none;
    color: #4d85ee;
  }
`;

export const Name = styled.p`
  color: #666666;
`;
