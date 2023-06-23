import styled from 'styled-components';

export const Form = styled.form`
display: grid;
justify-items: center;
gap: 2rem;
width: 90vw;
border: 1rem #fffff;
padding: 1rem;
border-radius: 1rem;
`
export const Topic = styled.label`
  font-family: 'Asap', sans-serif;
  font-size: 1.5rem;
  color: #FFFFFF;
  @media only screen and (min-width: 600px) {
    font-size: 2rem;
  }
`
export const GroupButtons = styled.section`
  display: flex;
  gap: 1rem;
  @media only screen and (min-width: 1024px) {
    margin-top: 1.5rem;
  }
`