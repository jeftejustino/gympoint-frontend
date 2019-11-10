import styled from 'styled-components';

export const List = styled.table`
  margin-top: 40px;
  width: 100%;
  border-spacing: 0px;

  tr {
    th {
      color: #444;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
      padding: 5px 0px;
    }

    td {
      font-size: 16px;
      color: #666;
      padding: 15px 0px;

      a {
        color: #4d85ee;
        font-size: 15px;
      }

      button {
        color: #de3b3b;
        font-size: 15px;
      }
    }

    + tr td {
      border-top: 1px solid #d7d7d7;
    }
  }
`;
