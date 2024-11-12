import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
} from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons-react';

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

  const links = mockdata.map((item) => (
    <UnstyledButton className="w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon className="w-6 h-6 text-blue-600" />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" className="text-gray-500">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box className="pb-32">
      <header className="flex items-center justify-between h-16 px-4 border-b bg-white dark:bg-gray-900 dark:border-gray-800">
        <Group className="flex items-center space-x-2">
          <MantineLogo size={30} />
        </Group>

        <div className="hidden sm:flex space-x-4">
          <a href="#" className="flex items-center h-full px-4 text-gray-700 dark:text-white">
            Home
          </a>
          <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
            <HoverCard.Target>
              <a href="#" className="flex items-center h-full px-4 text-gray-700 dark:text-white">
                <Center inline>
                  <span className="mr-1">Features</span>
                  <IconChevronDown className="w-4 h-4 text-blue-600" />
                </Center>
              </a>
            </HoverCard.Target>

            <HoverCard.Dropdown className="overflow-hidden">
              <div className="flex justify-between px-4 py-2">
                <Text fw={500}>Features</Text>
                <Anchor href="#" className="text-xs">View all</Anchor>
              </div>

              <Divider className="my-2" />

              <SimpleGrid cols={2} spacing={0}>
                {links}
              </SimpleGrid>

              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-b-md">
                <div className="flex justify-between">
                  <div>
                    <Text fw={500} className="text-sm">Get started</Text>
                    <Text size="xs" className="text-gray-500">
                      Their food sources have decreased, and their numbers
                    </Text>
                  </div>
                  <Button variant="default">Get started</Button>
                </div>
              </div>
            </HoverCard.Dropdown>
          </HoverCard>
          <a href="#" className="flex items-center h-full px-4 text-gray-700 dark:text-white">Learn</a>
          <a href="#" className="flex items-center h-full px-4 text-gray-700 dark:text-white">Academy</a>
        </div>

        <div className="hidden sm:flex space-x-4">
          <Button variant="default">Log in</Button>
          <Button>Sign up</Button>
        </div>

        <Burger opened={drawerOpened} onClick={toggleDrawer} className="sm:hidden" />
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className="sm:hidden"
        zIndex={1000000}
      >
        <ScrollArea style={{ height: 'calc(100vh - 80px)', margin: '-1rem' }}>
          <Divider className="my-2" />

          <a href="#" className="block px-4 py-2 text-gray-700 dark:text-white">Home</a>
          <UnstyledButton className="block w-full px-4 py-2 text-left text-gray-700 dark:text-white" onClick={toggleLinks}>
            <Center inline>
              <span className="mr-1">Features</span>
              <IconChevronDown className="w-4 h-4 text-blue-600" />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className="block px-4 py-2 text-gray-700 dark:text-white">Learn</a>
          <a href="#" className="block px-4 py-2 text-gray-700 dark:text-white">Academy</a>

          <Divider className="my-2" />

          <Group className="flex justify-center gap-4 py-4">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
