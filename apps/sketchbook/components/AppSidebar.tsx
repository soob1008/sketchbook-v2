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
import { Calendar, Pickaxe, Inbox, Piano } from 'lucide-react';
import Link from 'next/link';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="py-7 items-center justify-center text-cyan-800 text-2xl font-bold">
        <h1>SUBIN</h1>
      </SidebarHeader>
      <SidebarContent>
        {MENU_ITEMS.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-gray-800 font-semibold">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.subMenu.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon className="w-5 h-5 text-gray-600" />
                        <span className="ml-2">{item.title}</span>
                      </Link>
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

const MENU_ITEMS = [
  {
    title: 'Laboratory', // 페이지 이동 없음
    subMenu: [
      {
        title: 'Todo',
        url: '/laboratory/todo',
        icon: Pickaxe,
      },
      {
        title: 'Piano',
        url: '/laboratory/piano',
        icon: Piano,
      },
    ],
  },
  {
    title: 'Game',
    subMenu: [
      {
        title: '테트리스',
        url: '#',
        icon: Inbox,
      },
      {
        title: '지뢰찾기',
        url: '#',
        icon: Calendar,
      },
    ],
  },
  {
    title: 'Mobile web',
    subMenu: [
      {
        title: '오늘의 집',
        url: '#',
        icon: Inbox,
      },
    ],
  },
];
