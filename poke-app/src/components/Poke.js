import {useState,useRef} from 'react';
import pokem from './pokem.jpg'

export const Poke = ()=>{
    const [value,setValue] = useState('');
    const [pokemon,setPokemon] = useState({});
    const infos = useRef([]);
    const addInfo = (el)=>{
        if (el && !infos.current.includes(el)) {
            infos.current.push(el);
        }
    }
    const handleClick = ()=>{
        infos.current[0].innerHTML = value.charAt(0).toUpperCase()+value.slice(1);
        const searchPokemon = async ()=>{
            const Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
            const data = await Response.json();
            console.log(data.stats);
            setPokemon({img:data.sprites.front_default,hp:data.stats[0].base_stat,attack:data.stats[1].base_stat,defense:data.stats[2].base_stat,speed:data.stats[5].base_stat});
        }
        searchPokemon();
    }
    return(
        <div id="wrapper">
            <div id='blue'>
                <h1>
                    Pokemon Stats
                </h1>
                <input type="text" onChange={(e)=>{setValue(e.target.value)}} placeholder='enter a pokemon'></input>
                <button type='button' onClick={handleClick}>Search Pokemon</button>
            </div>
            <div id='white'>
                <h2 ref={addInfo}>Pokemon</h2>   
                <img src={pokemon.img ? pokemon.img : pokem} alt='' ref={addInfo} width='150px'></img>
                <h3>hp : {pokemon.hp ? pokemon.hp : '?'}</h3>
                <h3>attack : {pokemon.attack ? pokemon.attack : '?'}</h3>
                <h3>defense : {pokemon.defense ? pokemon.defense : '?'}</h3>
                <h3>speed : {pokemon.speed ? pokemon.speed : '?'}</h3>
            </div>
        </div>
    )
}