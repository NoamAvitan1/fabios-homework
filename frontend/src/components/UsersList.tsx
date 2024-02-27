import { useForm } from "react-hook-form";
import { trpc } from "../trpc";
import { useState } from "react";
import "./UsersList.css";

export function UsersList() {
  const users_list = trpc.userList.useQuery("");
  const addUser = trpc.addUser.useMutation({
    onSuccess: () => {
      users_list.refetch();
    },
  });

  const add = () => {
    const obj = {
      date: "2024-02-27",
      time: "23:59",
      notes: "",
      branch: "מטבח מרכזי",
      branch_id: 1,
      recurrence: 1,
      customer: "אורי וגל שכטר",
      customer_id: 14,
      source: "הוקלד ידנית",
      created_at: new Date(),
      updated_at: new Date(),
      status: "AP",
    };
    addUser.mutate(obj);
  };

  if (users_list.isLoading) return <div>Loading....</div>;
  console.log(users_list.data);
  return (
    <div className="UsersList">
      <button onClick={() => add()}>adduser</button>
      {users_list.data?.map((user, index) => (
        <div key={index}>
          <p>{user?.branch}</p>
        </div>
      ))}
    </div>
  );
}
