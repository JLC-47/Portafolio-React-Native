import { PokemonListItem, PokemonListResponse } from "../types/pokemon";

export function usePokemonList(limit: number = 20) {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPokemons() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
        );

        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }

        const data: PokemonListResponse = await res.json();

        if (!cancelled) {
          setPokemons(data.results);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Error desconocido"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchPokemons();

    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { pokemons, loading, error,};
}