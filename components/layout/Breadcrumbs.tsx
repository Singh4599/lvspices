"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Home,
  Cpu,
  Snowflake,
  Atom,
  ShieldCheck,
  FlaskConical,
  Building2,
  GitFork,
  Package,
  Globe,
  BookOpen,
  Phone,
  Award,
  Leaf,
  Tag,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbItemType {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItemType[];
  showIcons?: boolean;
  showEllipsis?: boolean;
  separator?: React.ReactNode;
  maxVisible?: number;
  className?: string;
}

// Auto icon map — no need to pass icons manually from each page
const AUTO_ICONS: Record<string, React.ReactNode> = {
  Technology:       <Cpu className="size-3.5" />,
  Infrastructure:   <Building2 className="size-3.5" />,
  "Cryogenic Grinding": <Snowflake className="size-3.5" />,
  "CFG Science":    <Atom className="size-3.5" />,
  "Steam Sterilization": <ShieldCheck className="size-3.5" />,
  "Quality Assurance":   <FlaskConical className="size-3.5" />,
  "Process Flow":   <GitFork className="size-3.5" />,
  Products:         <Package className="size-3.5" />,
  "Private Label":  <Tag className="size-3.5" />,
  "Global Network": <Globe className="size-3.5" />,
  Blog:             <BookOpen className="size-3.5" />,
  Contact:          <Phone className="size-3.5" />,
  Certifications:   <Award className="size-3.5" />,
  Story:            <Leaf className="size-3.5" />,
};

export default function Breadcrumbs({
  items,
  showIcons = true,
  showEllipsis = true,
  separator = <ChevronRight className="size-3.5 stroke-2" />,
  maxVisible = 4,
  className = "",
}: BreadcrumbsProps) {
  // Auto-resolve icons if not passed
  const enrichedItems: BreadcrumbItemType[] = items.map((item) => ({
    ...item,
    icon: item.icon ?? AUTO_ICONS[item.label] ?? null,
  }));

  // Prepend Home
  const allItems: BreadcrumbItemType[] = [
    { label: "Home", href: "/", icon: <Home className="size-3.5" /> },
    ...enrichedItems,
  ];

  // Ellipsis logic
  type EllipsisItem = { label: string; isEllipsis: true };
  const visibleItems: (BreadcrumbItemType | EllipsisItem)[] =
    showEllipsis && allItems.length > maxVisible
      ? [
          ...allItems.slice(0, 1),
          { label: "...", isEllipsis: true },
          ...allItems.slice(allItems.length - (maxVisible - 1)),
        ]
      : allItems;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`container-lv pt-10 pb-6 ${className}`}
    >
      <Breadcrumb>
        <BreadcrumbList>
          {visibleItems.map((item, index) => {
            const isLast = index === visibleItems.length - 1;
            const isEllipsis = "isEllipsis" in item && item.isEllipsis;
            const typedItem = item as BreadcrumbItemType;

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {isEllipsis ? (
                    <BreadcrumbEllipsis />
                  ) : isLast ? (
                    <BreadcrumbPage className="flex items-center gap-1.5">
                      {showIcons && typedItem.icon}
                      <span>{typedItem.label}</span>
                    </BreadcrumbPage>
                  ) : (
                    <Link href={typedItem.href ?? "/"} passHref legacyBehavior>
                      <BreadcrumbLink className="flex items-center gap-1.5">
                        {showIcons && typedItem.icon}
                        <span>{typedItem.label}</span>
                      </BreadcrumbLink>
                    </Link>
                  )}
                </BreadcrumbItem>

                {!isLast && (
                  <BreadcrumbSeparator>
                    {separator}
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
