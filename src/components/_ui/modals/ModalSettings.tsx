import { Button, Group, Stack, Text } from "@mantine/core";
import { AiOutlineSafety } from "react-icons/ai";

export default function ModalSettings() {
  return (
    <Stack align="center" gap="xs" w='16rem'>
      <Text>My settings</Text>
      <Button justify="center" fullWidth px='lg' component="a" href="/admin/createbet">
        Create Bet
      </Button>
      <Button disabled justify="center" fullWidth px='lg'>Dashboard - Coming soon</Button>
      <Group gap={4} c='green' mt='xs'>
        <AiOutlineSafety size={16} />
        <Text fz="xs" inline>Smartbet v.1.0.0</Text>
      </Group>
    </Stack>
  );
}
