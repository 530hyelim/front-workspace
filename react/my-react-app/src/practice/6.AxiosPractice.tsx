import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./PokemonSearch.module.css";
import { useParams } from "react-router-dom";

// 1) 검색용 포켓몬 데이터 타입 인터페이스정의
// - 화면구현을 위해 필요한 데이터들은 아래와 같습니다.
// - name, height, weight, type[] , abilitiy[], front_default
// - api사이트에서 위 데이터들이 어떤 속성에 포함되어있는지 확인 후 , 타입으로 정의하세요.
// -front_default는 sprites -> other -> official-artwork에 추가되어 있는 이미지를 사용하세요
interface PokemonData {
    name: string,
    height: number,
    weight: number,
    type: string[],
    types: { type: { name: string } }[],
    ability: string[],
    abilities: { ability: { name: string } }[],
    sprites: { other: { "official-artwork": { front_default: string } } }
}

function PokemonSearch() {
    const [query, setQuery] = useState("");
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // 2) 포켓몬 검색기능
    // - api문서를 참조하여 요청url에 query변수를 함께 전달하여 지정한 id/name의 포켓몬 데이터를
    //   반환하는 기능을 작성하시오
    // - 단, 현재 입력한 query값이 비어있는 경우 검색이 이루어지지 않도록 하세요.  
    // - 검색이 진행중이라면 loading상태를 변경하여, 데이터를 조회중임을 알 수있게 하세요.
    // - 검색결과가 존재하지 않는 경우 error값을 변경하여 '포켓몬을 찾을 수 없습니다'를 출력하세요.
    const handleSearch = () => {
        if (!query) {
            return;
        }
        setLoading(true);
        axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`)
            .then((res) => {
                setPokemon(res.data);
                setError("");
            })
            .catch((err) => {
                setError("포켓몬을 찾을 수 없습니다");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const { id } = useParams();
    useEffect(() => {
        if (id) {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then((res) => {
                    setPokemon(res.data);
                    setError("");
                })
                .catch((err) => {
                    setError("포켓몬을 찾을 수 없습니다");
                })
        }
    }, []);

    return (
        <div className={styles.container}>
            <h2>포켓몬 검색</h2>
            <input
                className={styles.input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="예: pikachu || 1"
            />
            <button className={styles.button} onClick={handleSearch}>
                검색
            </button>

            {loading && <p>로딩 중...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {pokemon && (
                <div className={styles.result}>
                    <h3>{pokemon.name}</h3>

                    {/* 포켓몬 이미지, 이름 바인딩 */}
                    <img
                        src={pokemon.sprites.other["official-artwork"].front_default}
                        alt={pokemon.name}
                    />
                    {/* 
                        1. 포켓몬 타입 바인딩 
                        2. 포켓몬 키/10 바인딩
                        3. 포켓몬 몸무게/10 바인딩
                        4. 포켓몬 기술 바인딩
                    */}
                    <p>타입: {pokemon.types.map(t => t.type.name).join(", ")}</p>
                    <p>키: {pokemon.height / 10} m</p>
                    <p>몸무게: {pokemon.weight / 10} kg</p>
                    <p>기술: {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
                </div>
            )}
        </div>
    );
}

export default PokemonSearch;
