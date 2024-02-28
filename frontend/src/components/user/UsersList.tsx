import { trpc } from "../../trpc";
import "./UsersList.css";
import { AddUser } from "./AddUser";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BiShekel } from "react-icons/bi";

type Props = {};

export const UsersList = (props: Props) => {
  const users_list = trpc.userList.useQuery("");
  const addUser = trpc.addUser.useMutation({
    onSuccess: () => {
      users_list.refetch();
    },
  });

  if (users_list.isLoading) return <div>Loading....</div>;
  console.log(users_list.data);
  return (
    <div className="UsersList">
      <article className="data">
        <section className="filter">
          <input type="text" placeholder="חיפוש" />
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
        <div className="list">
          {users_list.data?.map((user) => (
            <section className="usersData" key={user?.id}>
              <p>{user?.customer}</p>
              <p>{user?.date}</p>
              <p>{user?.branch}</p>
              <p>{user?.status === "AP" ? "מאושר" : "ממתין לאישור"}</p>
              <p style={{ display: "flex", justifyContent: "center" }}>
                {<BiShekel />}1500
              </p>
              <p>
                <IoIosArrowRoundBack style={{ fontSize: "20px" }} />
              </p>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
};
