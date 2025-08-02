"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getIconComponent } from "@/utils/icon-mapping";

interface ActionButton {
  href?: string;
  label: string;
  icon: string; // 문자열로 변경
  variant?: "default" | "ghost" | "destructive" | "outline" | "secondary";
  className?: string;
  onClick?: () => void;
}

interface NotFoundPageProps {
  icon: string; // 문자열로 변경
  title: string;
  description: string | React.ReactNode;
  actions: ActionButton[];
  helpText?: string;
}

export default function NotFoundPage({
  icon: iconName,
  title,
  description,
  actions,
  helpText = "계속해서 문제가 발생한다면 관리자에게 문의해 주세요.",
}: NotFoundPageProps) {
  const Icon = getIconComponent(iconName);

  return (
    <div className="container mx-auto px-4 py-8 lg:max-w-[70rem]">
      <div className="flex items-center justify-center">
        <div className="mx-auto text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
            <Icon className="h-12 w-12 text-red-600" />
          </div>

          <h2 className="mb-4 text-xl font-semibold text-gray-700">{title}</h2>

          <div className="mb-8">
            {typeof description === "string" ? (
              <p className="break-keep text-gray-600">{description}</p>
            ) : (
              description
            )}
          </div>

          <div className="flex flex-col gap-3">
            {actions.map((action, index) => {
              const ActionIcon = getIconComponent(action.icon);

              return action.href ? (
                <Link key={index} href={action.href}>
                  <Button
                    variant={action.variant || "default"}
                    className={action.className || "w-full"}
                  >
                    <ActionIcon className="mr-2 h-4 w-4" />
                    <span>{action.label}</span>
                  </Button>
                </Link>
              ) : (
                <Button
                  key={index}
                  variant={action.variant || "default"}
                  className={action.className || "w-full"}
                  onClick={action.onClick}
                >
                  <ActionIcon className="mr-2 h-4 w-4" />
                  <span>{action.label}</span>
                </Button>
              );
            })}
          </div>

          {helpText && (
            <div className="mt-8 text-sm text-gray-500">
              <p>{helpText}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
