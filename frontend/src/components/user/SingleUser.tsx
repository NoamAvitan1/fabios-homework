import "./SingleUser.css";
import { User as UserInterface } from "../types";

type Props = {
  user?: UserInterface | null;
};

export const SingleUser = ({ user }: Props) => {
  const labels:string[] = ["שם", "תאריך", "מקום", "סטטוס", "הערות"];
  return (
    <div className="SingleUser">
      <section className="user-section">
          {labels.map((label) => (
            <p className="labelInfo">{label}:</p>
          ))}
      </section>
      <section className="user-section">
          <p>{user?.customer}</p>
          <p>{user?.updated_at.substring(0, 10)}</p>
          <p>{user?.branch}</p>
          <p>{user?.status}</p>
          <p>{user?.notes}</p>
      </section>
    </div>
  );
};
