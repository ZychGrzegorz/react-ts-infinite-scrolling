import { createContext } from "react";

export type QueryContextType = {
  query: string ;
  setQuery: (q: string) => void;
};

export const QueryContext = createContext<QueryContextType>({
  query: "",
  setQuery: () => {},
});
