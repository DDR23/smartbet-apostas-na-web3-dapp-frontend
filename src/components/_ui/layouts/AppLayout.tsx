import { Flex, Stack } from "@mantine/core";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import ProviderDevice from "../../../utils/ProviderDevice";

export default function AppLayout() {
  const { isDesktop } = ProviderDevice();

  return (
    <Stack h='max-content' mih='100vh' gap={0}>
      <Header />
      <Flex flex={1} justify={isDesktop ? 'start' : 'center'}>
        <Outlet />
      </Flex>
      <Footer />
    </Stack>
  );
}
