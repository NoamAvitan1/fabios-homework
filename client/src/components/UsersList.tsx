import { useForm } from "react-hook-form";
import { trpc } from "../trpc";
import { useState } from "react";


export function UsersList() {
  const users_list_query = trpc.user.useQuery();
  if (users_list_query.isLoading) return <div>Loading....</div>;
  console.log(users_list_query.data);
  return (
    <>
      <h1>users list</h1>
      {users_list_query.data?.map((user, index) => (
        <div key={index}>
          <p>{user?.branch}</p>
        </div>
      ))}

      <hr />
    </>
  );
}
