import { Container, Title } from "@mantine/core";
import { LoginForm } from "./LoginForm";

export const Login = () => {
  return (
    <Container size={500} my={40}>
      <Title
        style={{
          fontWeight: 900,
          textAlign: "center",
        }}
      >
        Đăng nhập
      </Title>
      <LoginForm />
    </Container>
  );
};
