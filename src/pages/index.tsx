import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GET_POKEMONS } from "graphql/queries";
import { Client } from "@constants";
import styled from "styled-components"
import Link from "next/link";
import { useRouter } from "next/router";


const Container = styled.div`
  width: 60rem;
  padding: 0 2rem;
`;
const Wrapper = styled.div`
  display: flex;
    justify-content: center;
`

const Main = styled.main`
    min-height: 100vh;
  padding: 2rem 0;
  flex-direction: row;
  flex-wrap: wrap;
`
const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 1.5rem;
`;

const Sideimagediv = styled.div`

  padding: 1rem;
  margin: 1rem;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 10px;
  border-radius: 0.5rem;
  cursor: pointer;

  
  @media (max-width: 430px) {
    padding: 0.6rem;
    margin: 0.2rem;
    flex-direction: row;
    flex: 1;
    display: flex;
    box-shadow: 0;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
  }
`;

const InContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width:430px) {
    
  }
`;

const WrapImage =styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width:430px) {
    flex-direction: row;
  }

`
// const Images = styled.img`
//   width: 110px;
//   height: 100%;
//   @media (max-width: 425px) {
//     width: 20px;
//     height: 100%;
//   }
// `;
const WrapText = styled.span`
  @media (max-width: 430px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media (max-width: 360px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export default function App(data: any) {
  const [pokemons, setPokemons] = useState([""]);
  const [datas,Setdata]=useState([])
  const [width,Setwidth]=useState(0)
  const countOwn = (name : String)=>{
    var value = 0
    const count = datas?.forEach((x:any) => {
        if(x===name){
          value+=1
        }
    });
    return value
  }
  useEffect(() => {
    Setwidth(window.screen.width)
    const resize=()=>{
      console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
      Setwidth(window.innerWidth)
    }
    const getLocal : any= localStorage.getItem("pokemonData")
    if(getLocal!== ""){
      Setdata(JSON.parse(getLocal))
    }
    window.addEventListener('resize', resize)
    setPokemons(data.data.pokemons);

  }, []);
  return (
    <Wrapper>
      <Container>
        <Main>
          <Title>Pokemons List : </Title>
          <InContainer>
            {pokemons.map((pokemon: any, i: any) => {
              const { id, name } = pokemon;
              return (
                <Link
                  href={{
                    pathname: "/detail",
                    query: { id, name },
                  }}
                  key={i}
                >
                  <Sideimagediv key={i}>
                    <WrapImage>
                      <div style={{width:width > 430 ? 110 : 20,height:width > 430 ? 110 : 15}}>
                        <Image
                          src={pokemon?.image || "/asset/ICQuestion.jpg"}
                          width={width > 430 ? 110 : 20}
                          height={width > 430 ? 100 : 15}
                          layout={"fixed"}
                        />
                      </div>
                      <WrapText>{pokemon.name}</WrapText>
                    </WrapImage>
                    <WrapText>{`Owned : ${countOwn(pokemon.name)}`}</WrapText>
                  </Sideimagediv>
                </Link>
              );
            })}
          </InContainer>
        </Main>
      </Container>
    </Wrapper>
  );
}

export const getStaticProps = async () => {
  const client = Client;
  const { data } = await client.query({
    query: GET_POKEMONS,
    variables: { first: 811 },
  });
  return { props: { data } };
};
