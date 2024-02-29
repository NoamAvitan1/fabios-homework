import { trpc } from "../../trpc";
import "./UsersList.css";
import { AddUser } from "./AddUser";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BiShekel } from "react-icons/bi";
import { useState, useRef, useEffect } from "react";
import { SingleUser } from "./SingleUser";
import { User as UserInterface } from "../types";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";

type Props = {};

export const UsersList = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userData, setUserData] = useState<UserInterface | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const users_list = trpc.userList.useQuery(searchTerm);
  const addUser = trpc.addUser.useMutation({
    onSuccess: () => {
      users_list.refetch();
    },
  });
  const deleteUser = trpc.deleteUser.useMutation({
    onSuccess: () => {
      users_list.refetch();
    },
  });
  const updateUser = trpc.updateUser.useMutation({
    onSuccess: async () => {
      await users_list.refetch();
      const user = users_list?.data?.find((obj) => obj.id === userData?.id);
      if (user) {
        selectUser(user?.id);
      }
    },
  });

  const selectUser = (id: string): void => {
    if (id === userData?.id) {
      setUserData(null);
      return;
    }
    const data = users_list?.data?.find((obj) => obj.id === id);
    if (data) {
      setUserData(data);
    }
  };

  return (
    <div className="UsersList">
      <article className="data">
        <section className="filter">
          <input
            className="userSearch"
            ref={inputRef}
            type="text"
            placeholder="חיפוש שם..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AddUser addUser={addUser} />
        </section>
        <section>
          <ul className="information">
            <li>הזמנה</li>
            <li>תאריך</li>
            <li>סניף</li>
            <li>סטטוס</li>
            <li>מחיר</li>
            <li></li>
          </ul>
        </section>
        <div className={`${userData === null ? "list" : "list-selected"}`}>
          <article className={`${userData === null ? "info" : "infoData"}`}>
            {users_list.data?.map((user) => (
              <section
                onClick={() => selectUser(user?.id)}
                className={`${
                  userData?.id !== user?.id ? "usersData" : "usersData-selected"
                }`}
                key={user?.id}
              >
                <p>{user?.customer}</p>
                {userData === null ? (
                  <p className="userDate">{user?.date}</p>
                ) : null}
                {userData === null ? <p>{user?.branch}</p> : null}
                {userData === null ? (
                  <p
                    className={`${
                      user?.status === "מאושר"
                        ? "status-agreed"
                        : "status-progress"
                    }`}
                  >
                    {user?.status}
                  </p>
                ) : null}
                {userData === null ? (
                  <p style={{ display: "flex", justifyContent: "center" }}>
                    {<BiShekel />}1500
                  </p>
                ) : null}
                {userData === null ? (
                  <p
                    onClick={(e) => {
                      e.stopPropagation(), deleteUser.mutate(user?.id);
                    }}
                    className="delete-icon"
                  >
                    {<MdOutlineDeleteOutline />}
                  </p>
                ) : null}
                {userData === null ? (
                  <IoIosArrowRoundBack style={{ fontSize: "20px" }} />
                ) : userData?.id === user?.id ? (
                  <IoMdClose />
                ) : null}
              </section>
            ))}
          </article>
          {userData && (
            <section className="user">
              <IoMdClose
                onClick={() => selectUser(userData?.id)}
                className="icon-close"
              />
              <SingleUser user={userData} updateUser={updateUser} />
            </section>
          )}
        </div>
      </article>
    </div>
  );
};
