import "./SingleUser.css";
import { User as UserInterface } from "../types";
import { useState } from "react";
import { Modal } from "../Modal";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";

type Props = {
  user?: UserInterface | null;
  updateUser: any;
};

export const SingleUser = ({ user, updateUser }: Props) => {
  const labels: string[] = ["שם", "תאריך", "מקום", "סטטוס", "הערות"];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className="SingleUser">
      <button onClick={() => setIsOpen(true)} className="edit">
        עריכה
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="update-user">
          <IoMdClose
            style={{
              cursor: "pointer",
              position: "absolute",
              fontSize: "25px",
            }}
            id="close-button"
          />
          <form
            onSubmit={handleSubmit((data) => {
              setIsOpen(false);
              reset();
              updateUser.mutate({ ...data, ["id"]: user?.id });
            })}
            className="formUpdate"
          >
            <div className="inputFields">
              <div className="input-section">
                <input
                  defaultValue={user?.customer}
                  {...register("customer", {
                    required: { value: true, message: "הכנס שם" },
                    minLength: { value: 2, message: "לפחות 2 אותיות" },
                    maxLength: { value: 15, message: "לפחות 15 אותיות" },
                  })}
                  className="inputField"
                  type="text"
                />
                <label className="labelInput" htmlFor="">
                  שם:
                </label>
              </div>
              {errors?.customer && (
                <span className="error-message">
                  {errors.customer.message?.toString()}
                </span>
              )}
              <div className="input-section">
                <input
                  defaultValue={user?.branch}
                  placeholder="מטבח מקומי"
                  {...register("branch", {
                    required: { value: true, message: "הכנס מקום" },
                    minLength: { value: 2, message: "לפחות 2 אותיות" },
                    maxLength: { value: 15, message: "לפחות 15 אותיות" },
                  })}
                  className="inputField"
                  type="text"
                />
                <label className="labelInput" htmlFor="">
                  מקום:
                </label>
              </div>
              {errors?.branch && (
                <span className="error-message">
                  {errors.branch.message?.toString()}
                </span>
              )}
              <div className="input-section">
                <input
                  defaultValue={user?.date}
                  {...register("date", {
                    required: { value: true, message: "הכנס תאריך" },
                    minLength: { value: 2, message: "לפחות 2 אותיות" },
                    maxLength: { value: 15, message: "לפחות 15 אותיות" },
                  })}
                  className="inputField"
                  type="text"
                />
                <label className="labelInput" htmlFor="">
                  תאריך:
                </label>
              </div>
              {errors?.date && (
                <span className="error-message">
                  {errors.date.message?.toString()}
                </span>
              )}
              <div className="input-section">
                <input
                  defaultValue={user?.time}
                  placeholder="14:24"
                  {...register("time", {
                    required: { value: true, message: "הכנס שעה" },
                    minLength: { value: 2, message: "לפחות 2 אותיות" },
                    maxLength: { value: 15, message: "לפחות 15 אותיות" },
                  })}
                  className="inputField"
                  type="text"
                />
                <label className="labelInput" htmlFor="">
                  שעה:
                </label>
              </div>
              {errors?.time && (
                <span className="error-message">
                  {errors.time.message?.toString()}
                </span>
              )}
            </div>
            <button className="save">שמור</button>
          </form>
        </div>
      </Modal>
      <section className="user-section">
        {labels.map((label, i) => (
          <p key={i} className="labelInfo">
            {label}:
          </p>
        ))}
      </section>
      <section className="user-section">
        <p
          className={`${
            user?.status === "מאושר" ? "status-agreed" : "status-progress"
          }`}
        >
          {user?.status}
        </p>
        <p style={{ padding: "5px" }}>{user?.customer}</p>
        <p style={{ padding: "5px" }}>{user?.updated_at.substring(0, 10)}</p>
        <p style={{ padding: "5px" }}>{user?.branch}</p>
        <p style={{ padding: "5px" }} >{user?.notes}</p>
      </section>
    </div>
  );
};
