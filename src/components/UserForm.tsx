import { Dispatch, FC, SetStateAction } from "react";
import { Input } from "./ui/input";
import { createUser } from "@/lib/api";
import { User } from "@/validations/user";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const CreateUserForm: FC<{ setUser: Dispatch<SetStateAction<User>> }> = ({
  setUser,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(e.currentTarget.username.value).then(({ user }) => {
      setUser(user);
    });
  };

  return (
    <Card className="border p-4 w-96">
      <form onSubmit={handleSubmit} className=" flex flex-col gap-5">
        <Input name="username" placeholder="Username" />
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};
export default CreateUserForm;
