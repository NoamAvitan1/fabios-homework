import { trpc } from "../../trpc";
import "./UsersList.css";
import { AddUser } from "./AddUser";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BiShekel } from "react-icons/bi";
import { useState, useRef, useEffect } from "react";
import { SingleUser } from "./SingleUser";
import { User as UserInterface } from "../types";
import { IoMdClose } from "react-icons/io";


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

  const selectUser = (id: string):void => {
    if(id === userData?.id){
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
            placeholder="חיפוש שם"
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
          <article className="info">
            {users_list.data?.map((user) => (
              <section
                onClick={() => selectUser(user?.id)}
                className={`${userData?.id !== user?.id ? "usersData" : "usersData-selected"}`}
                key={user?.id}>
                <p>{user?.customer}</p>
                {userData === null ? <p>{user?.date}</p>:null}
                {userData === null ? <p>{user?.branch}</p>:null}
                {userData === null ? <p style={{color:`${user?.status === "מאושר" ? 'green' : 'orange'}`}}>{user?.status}</p>:null}
                {userData === null ? <p style={{ display: "flex", justifyContent: "center" }}>{<BiShekel />}1500</p>:null}
                {userData === null ?
                  <IoIosArrowRoundBack style={{ fontSize: "20px" }} /> : userData?.id === user?.id ? <IoMdClose/> : null}
              </section>
            ))}
          </article>
          {userData && 
          <section className="user">
          <SingleUser user={userData} />
          </section>}
        </div>
      </article>
    </div>
  );
};
