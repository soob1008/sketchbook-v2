# sketchbook-v2
sketchbook V2 - pnpm, turbo, shadcn UI 기반의 모노레포 구조 프로젝트 - 개발 기록

## 개발 목록
1. TODO - zustand, redux
2. 피아노
3. 게임 - 테트리스, 지뢰찾기

# shadcn/ui monorepo template

This template is for creating a monorepo with shadcn/ui.

## Usage

```bash
pnpm dlx shadcn@latest init
```

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button"
```