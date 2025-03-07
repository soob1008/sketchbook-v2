import { ReactElement } from 'react';

interface PageTitleProps {
  title: string;
  description?: string | ReactElement;
  isBottomLine?: boolean;
}

export default function PageTitle({
  title,
  description,
  isBottomLine = false,
}: PageTitleProps) {
  return (
    <div
      className={`mb-5 pb-3 ${isBottomLine ? 'border-b' : 'border-b-0'} border-gray-100`}
    >
      <h2 className=" text-xl font-bold">{title}</h2>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}