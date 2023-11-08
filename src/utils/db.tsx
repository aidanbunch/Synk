import {
    useQuery,
    QueryClient,
    QueryClientProvider as QueryClientProviderBase,
  } from "react-query";
  import supabase from "./supabase";
  import { PostgrestSingleResponse } from "@supabase/supabase-js";
  
  const client = new QueryClient();
    
  // Fetch user data
  export function useUser(uid: string) {
    return useQuery(
      ["user", { uid }],
      () =>
        supabase
          .from("users")
          .select(`*, customers ( * )`)
          .eq("id", uid)
          .single()
          .then(handle),
      { enabled: !!uid }
    );
  }
  
  // Fetch user data (non-hook)
  // if need to fetch data from outside of a component
  export function getUser(uid: string) {
    return supabase
      .from("users")
      .select(`*, customers ( * )`)
      .eq("id", uid)
      .single()
      .then(handle);
  }
  
  export async function updateUser(uid: string, data: any) {
    const response = await supabase
      .from("users")
      .update(data)
      .eq("id", uid)
      .then(handle);
    // Invalidate and refetch queries that could have old data
    await client.invalidateQueries(["user", { uid }]);
    return response;
  }

// Get response data or throw error if there is one
function handle(response: PostgrestSingleResponse<any>) {
    if (response.error) throw response.error;
    return response.data;
  }
  
  export function QueryClientProvider(props: any) {
    return (
      <QueryClientProviderBase client={client}>
        {props.children}
      </QueryClientProviderBase>
    );
  }