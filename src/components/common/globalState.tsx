// components/common/GlobalProvider.js
import { createContext, useContext } from "react";
import { ProtectionConfiguration } from "../../pages/protect-new-collection";

interface GlobalContext {
  globalState: ProtectionConfiguration[];
  setGlobalState: any;
}

// Create Context object.
const GlobalContext = createContext<GlobalContext | null>(null);

// Export Provider.
export function GlobalProvider(props: any) {
  const { value, children } = props;

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

// Export useContext Hook.
export function useGlobalContext() {
  return useContext(GlobalContext);
}
