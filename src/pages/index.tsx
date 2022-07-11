import React, { useContext, useEffect, useState } from "react";
import { css } from "@emotion/css";
import { useQuery } from "@apollo/react-hooks";
import Image from "next/image";
import { GET_POKEMONS } from "graphql/queries";
import { Client } from "@constants";
import styled from "styled-components"
import Link from "next/link";

const Container = styled.div`
  justify-content: center;
  width: 60rem;
  padding: 0 2rem;
`;
const Wrapper = styled.div`
  display: flex;
    flex: 1;
    justify-content: center;
`

const Main = styled.main`
    min-height: 100vh;
  padding: 2rem 0;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`
const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 1.5rem;
`;

const subTitle = styled.h2`
  margin: 0;
  line-height: 1.15;
  font-size: 1.5rem;
`;

const Sideimagediv = styled.div`
  padding: 0.6rem;
  margin: 0.2rem;
  flex-direction: row;
  flex: 1;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`;

export default function App(data: any) {
  const [pokemons, setPokemons] = useState([""]);
  const [datas,Setdata]=useState([])
  // const TotalOwned = {}
  // This is how to get Data without SSR
  // const { data: { pokemons = [] } = {}, loading } = useQuery(GET_POKEMONS, {
  //   variables: { first: 811 },
  // });

  const countOwn = (name : String)=>{
    // const arr = JSON.parse(datas)
    var value = 0
    const count = datas?.forEach((x:any) => {
        if(x===name){
          value+=1
        }
    });
    return value
    // console.log(TotalOwned)
  }
  useEffect(() => {
    const getLocal : any= localStorage.getItem("pokemonData")
    if(getLocal!== ""){
      Setdata(JSON.parse(getLocal))
    }
    setPokemons(data.data.pokemons);
  }, []);
  return (
    <Wrapper>
      <Container>
        <Main>
          <Title>Pokemons List :</Title>
          {pokemons.map((pokemon: any, i: any) => {
            const {id,name }=pokemon
            return (
              <Link
                href={{
                  pathname: "/detail",
                  query: { id, name },
                }}
                key={i}
              >
                <Sideimagediv key={i}>
                  <div style={{display:'flex'}}>
                    <Image
                      src={pokemon?.image || "/asset/ICQuestion.jpg"}
                      width={20}
                      height={15}
                    />
                    <p style={{ paddingLeft: "20px" }}>{pokemon.name}</p>
                  </div>
                  <p style={{ paddingLeft: "20px" }}>{`Owned : ${countOwn(pokemon.name)}`}</p>
                </Sideimagediv>
              </Link>
            );
          })}
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
