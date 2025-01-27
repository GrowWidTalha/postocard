"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { Toaster } from "./ui/sonner";
import { ConfirmDialogProvider } from "@omit/react-confirm-dialog";

<<<<<<< HEAD
=======
import AuthProvider from "../features/auth/components/auth-provider";
>>>>>>> 41e2ed688c58c9ff04da4c17fe54ab47913bf8bf

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => {
      let errorMessage: string;
      if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = "An unknown error occurred.";
      }
      // toast notify user, log as an example
      console.log(errorMessage);
    },
  }),
});

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfirmDialogProvider>
        {children}
        <Toaster />
      </ConfirmDialogProvider>
    </QueryClientProvider>
  );
};
