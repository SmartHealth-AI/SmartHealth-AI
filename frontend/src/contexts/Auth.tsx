import React, { useCallback, useMemo } from "react";

import { useQuery, useMutation, useQueryClient, UseMutateAsyncFunction, QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useRouter } from "next/router";
import appConfig from "@legalSearch/config";

export interface AuthProviderConfig<User = unknown, Error = unknown> {
  key?: string;
  loadUser: (data: any) => Promise<User>;
  loginFn: (data: any) => Promise<User>;
  registerFn: (data: any) => Promise<User>;
  updateFn: (data: any) => Promise<User>;
  logoutFn: () => Promise<any>;
  deleteUserFn: () => Promise<any>;
  waitInitial?: boolean;
  LoaderComponent?: () => JSX.Element;
  ErrorComponent?: ({ error }: { error: Error | null }) => JSX.Element;
}

export interface AuthContextValue<User = unknown, Error = unknown, LoginCredentials = unknown, RegisterCredentials = unknown, UpdateCredentials = unknown> {
  user: User | undefined;
  login: UseMutateAsyncFunction<User, any, LoginCredentials>;
  logout: UseMutateAsyncFunction<any, any, void, any>;
  register: UseMutateAsyncFunction<User, any, RegisterCredentials>;
  update: UseMutateAsyncFunction<User, any, UpdateCredentials>;
  deleteUser: UseMutateAsyncFunction<any, any, void, any>;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isRegistering: boolean;
  isUpdating: boolean;
  refetchUser: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<User, Error>>;
  error: Error | null;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export function initReactQueryAuth<User = unknown, Error = unknown, LoginCredentials = unknown, RegisterCredentials = unknown, UpdateCredentials = unknown>(
  config: AuthProviderConfig<User, Error>,
) {
  const AuthContext = React.createContext<AuthContextValue<User, Error, LoginCredentials, RegisterCredentials, UpdateCredentials> | null>(null);
  AuthContext.displayName = "AuthContext";

  const {
    loadUser,
    loginFn,
    registerFn,
    updateFn,
    logoutFn,
    deleteUserFn,
    key = ["auth-user"],
    waitInitial = true,
    LoaderComponent = () => <div>Loading...</div>,
    ErrorComponent = (error: any) => <div style={{ color: "tomato" }}>{JSON.stringify(error, null, 2)}</div>,
  } = config;

  function AuthProvider({ children }: AuthProviderProps): JSX.Element {
    const queryClient = useQueryClient();
    const router = useRouter();
    const {
      data: user,
      error,
      status,
      isLoading,
      // isIdle,
      isSuccess,
      refetch,
    } = useQuery<User, Error>({
      // queryKey: key,
      queryFn: loadUser,
    });
    
    const setUser = useCallback((data: User) => queryClient.setQueryData([key], data), [queryClient, key]);

    // const setUser = useCallback((data: User) => queryClient.setQueryData(key, data), [queryClient]);

    const loginMutation = useMutation({
      mutationFn: loginFn,
      onSuccess: (user) => {
        setUser(user);
      },
    });

    const registerMutation = useMutation({
      mutationFn: registerFn,
    });

    const logoutMutation = useMutation({
      mutationFn: logoutFn,
      onSuccess: () => {
        queryClient.clear();
      },
    });

    const updateMutation = useMutation({
      mutationFn: updateFn,
    });

    const deleteUserMutation = useMutation({
      mutationFn: deleteUserFn,
      onSuccess: () => {
        queryClient.clear();
      },
    });

    const value = useMemo(
      () => ({
        user,
        error,
        refetchUser: refetch,
        login: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isLoading,
        logout: logoutMutation.mutateAsync,
        isLoggingOut: logoutMutation.isLoading,
        register: registerMutation.mutateAsync,
        isRegistering: registerMutation.isLoading,
        update: updateMutation.mutateAsync,
        isUpdating: updateMutation.isLoading,
        deleteUser: deleteUserMutation.mutateAsync,
      }),
      [
        user,
        error,
        refetch,
        loginMutation.mutateAsync,
        loginMutation.isLoading,
        logoutMutation.mutateAsync,
        logoutMutation.isLoading,
        registerMutation.mutateAsync,
        registerMutation.isLoading,
        updateMutation.mutateAsync,
        updateMutation.isLoading,
        deleteUserMutation.mutateAsync,
      ],
    );

    if (isSuccess || !waitInitial) {
      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    }
    

    
    if (isLoading ) {
      return <LoaderComponent />;
    }
    // if (isLoading || isIdle) {
    //   return <LoaderComponent />;
    // }

    // if (error && !isLoading) {
    //   router.push();
    //   return <></>;
    // }

    return <div>Unhandled status: {status}</div>;
  }

  function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
      throw new Error(`useAuth must be used within an AuthProvider`);
    }
    return context;
  }

  return { AuthProvider, AuthConsumer: AuthContext.Consumer, useAuth };
}
