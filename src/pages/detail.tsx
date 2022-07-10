import React, { useContext, useEffect, useState } from "react";
import { css } from "@emotion/css";
import { useQuery } from "@apollo/react-hooks";
import Image from "next/image";
import { GET_DETAILS } from "graphql/queries";
import { Client } from "@constants";
import styled from "styled-components"
import {useRouter} from "next/router";

import Link from "next/link";
import Pokemon, { IColorPokemonType } from "constants/Pokemon";

const TypeColor = [{
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
}];

const Container = styled.div`
    padding: 0 2rem;
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
`
const Main = styled.main`
    min-height: 100vh;
  padding: 2rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
`
const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 700;
`;

const Subtitle = styled.h2`
  margin: 10px 0px;
  line-height: 1.15;
  font-size: 1rem;
  text-align: center;
`;

const Types = styled.h2`
  margin: 10px 0px;
  line-height: 1.15;
  font-size: 1rem;
  text-align: center;
  display: flex;
  flex-direction: row;
`;

const Moves = styled.div`
  margin: 10px 0px;
  line-height: 1.15;
  font-size: 1rem;
  text-align: center;
  display: flex;
  flex-direction: row;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;


const WrapIn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const Backbutton = styled.div`
    margin: 10px 20px;
    cursor: pointer;
`
const TypesBox = styled.div`
  margin: 0.3rem;
  padding: 0.3rem;
  /* border: 1px solid #ddd; */
  border-radius: 0.3rem;
  color: white;
  background-color: ${(props) => props.color};
`
const Button = styled.div`
  /* Adapt the colors based on primary prop */
  background: #01f516;
  color: white;
  font-size: 1em;
  margin: 0.25em;
  padding: 0.25em 1em;
  /* border: 2px solid palevioletred; */
  border-radius: 5px;
  
  /* ripple effect */
  background-position: center;
  transition: background 0.5s;

  &:hover {
     background: #01f516 radial-gradient(circle, transparent 1%, darkseagreen 1%) center/15000%;
  }
  &:active {
    background-color: yellow;
    background-size: 100%;
    transition: background 0s;
  }
`;

export default function Detail() {

  const router = useRouter()
  const { id,name }= router.query
  // This is how to get Data without SSR
  const { data, loading } = useQuery(GET_DETAILS, {
    variables: { name: name ,id :id},
  });

  const handleCatch=()=>{
    const rand = Math.floor(Math.random() * 2);
    console.log(rand)
  }

  useEffect(() => {
    // if(!loading){
    //   console.log(data)
    // }
    // return;
  }, [data]);
  return (
    <>
      <Link href={"/"}>
        <Backbutton>Back</Backbutton>
      </Link>
      <Container>
        <Main>
          {!loading && (
            <Container>
              <Image
                src={data.pokemon?.image || "/asset/ICQuestion.jpg"}
                width={212}
                height={200}
              />
              <Title>{data.pokemon?.name}</Title>
              <Types>
                <div style={{alignItems:'center',display:'flex'}}>Types : </div>
                {data.pokemon?.types.map((x: any, i: any) => {
                   const typePokemon: keyof IColorPokemonType = x.toLowerCase();
                  return <TypesBox color={Pokemon[typePokemon]}>{x}</TypesBox>;
                })}
              </Types>

              {data.pokemon?.attacks.special.map((x: any, i: any) => {
                return (
                  <Moves>
                    <div>{x.name}</div>
                    <div style={{ width: 10 }} />
                    <div>DMG:{x.damage}</div>
                  </Moves>
                );
              })}
              <Title>Next Evolutions</Title>
              <Wrap>
                {data.pokemon?.evolutions.map((x: any, i: any) => {
                  return (
                    <WrapIn>
                      <Subtitle>{x.name}</Subtitle>
                      <Image
                        src={x?.image || "/asset/ICQuestion.jpg"}
                        width={106}
                        height={100}
                      />
                    </WrapIn>
                  );
                })}
              </Wrap>
            </Container>
          )}
        </Main>
        <Button onClick={handleCatch}>Catch The Pokemon</Button>
      </Container>
    </>
  );
}

// export const getStaticProps = async () => {
//   const client = Client;
//   const { data } = await client.query({
//     query: GET_DETAILS,
//     variables: { first: 811 },
//   });
//   return { props: { data } };
// };
