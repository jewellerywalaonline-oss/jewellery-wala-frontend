"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { makeStore } from "../store/store";
import Image from "next/image";

// You can add a loading component here if needed
const Loading = () => (
  <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center w-screen h-screen bg-white">
    <Image
      src="/images/logo.png"
      className="animate-pulse w-24 h-20"
      alt="Loading"
      width={100}
      height={100}
    />
   
  </div>
);

export function Client({ children }) {
  const { store, persistor } = makeStore();

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
