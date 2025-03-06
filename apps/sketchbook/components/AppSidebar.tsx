import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@workspace/ui/components/sidebar';
import { Calendar, Pickaxe, Inbox, LucideIcon } from 'lucide-react';
import Link from 'next/link';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="py-10 items-center justify-center text-black text-2xl font-bold">
        <h1>
          <Link href="/">SUBIN</Link>
        </h1>
      </SidebarHeader>
      <SidebarContent>
        {MENU_ITEMS.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-gray-800 font-semibold text-[14px]">
              {group.url ? (
                <Link href={group.url} className="flex items-center">
                  {group.icon && (
                    <group.icon className="w-5 h-5 text-gray-600" />
                  )}
                  <span className="ml-2">{group.title}</span>
                </Link>
              ) : (
                group.title
              )}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group?.subMenu?.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="text-[13px] font-semibold"
                    >
                      {item.url ? (
                        <Link href={item.url}>
                          {item.icon && (
                            <item.icon className="w-5 h-5 text-gray-600" />
                          )}
                          <span className="ml-2">{item.title}</span>
                        </Link>
                      ) : (
                        item.title
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

interface SideBarMenu extends Menu {
  title: string;
  url?: string;
  icon?: LucideIcon;
  subMenu?: Menu[];
}

interface Menu {
  title: string;
  url?: string;
  icon?: LucideIcon;
}

const MENU_ITEMS: SideBarMenu[] = [
  {
    title: 'Playground',
    subMenu: [
      {
        title: 'Playground',
        url: '/playground',
        icon: Pickaxe,
      },
      // {
      //   title: 'Piano',
      //   url: '/laboratory/piano',
      //   icon: Piano,
      // },
    ],
  },
  {
    title: 'Game',
    subMenu: [
      {
        title: '테트리스',
        url: '/game/tetris',
        icon: Inbox,
      },
      {
        title: '지뢰찾기',
        url: '/game/minesweeper',
        icon: Calendar,
      },
    ],
  },
  {
    title: 'Service',
    subMenu: [
      {
        title: '여행 추천',
        url: '#',
        icon: Inbox,
      },
    ],
  },
];