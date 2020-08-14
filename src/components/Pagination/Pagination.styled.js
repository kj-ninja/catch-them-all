import styled from 'styled-components';

export const PaginationContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
    @media screen and (max-width: 700px) {
        width: 100%;
    }
`;

export const PaginationItem = styled.li`
    margin: 10px;
    padding: 10px 15px;
    list-style: none;
    cursor: pointer;
    color: ${(props)=> props.isActive ? '#ffe400' : '#2365b5'};
    background-color: ${(props)=> props.isActive ? '#2365b5' : '#ffe400'};
    border: none;
    font-size: 20px;
    font-weight: bold;
    
    @media screen and (max-width: 700px) {
        padding: 5px 10px;
        margin: 8px;
    }
    
    &:hover {
      color: #ffe400;
      background-color: #2365b5;
    }
`;