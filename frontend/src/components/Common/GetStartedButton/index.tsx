import { LinkTo } from "./styles";

const GetStartedButton = ({ padding }: { padding: string }) => {
  return (
    <LinkTo
      style={{
        padding: padding,
      }}
      href="/sign-up"
    >
      Бүртгүүлэх
    </LinkTo>
  );
};

export default GetStartedButton;
