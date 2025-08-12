// SocialIcon.tsx
// renders social media icons used on the page.

import React from "react";
import Link from "next/link";
import clsx from "clsx";

// Component type for icons that accept className (react-icons matches this)
type IconComponent = React.ComponentType<{ className?: string }>;

type BaseProps = {
    href: string;
    label: string;
    className?: string;
    external?: boolean;         // default: true
    iconClassName?: string;     // applies when using `icon`
};

type WithIcon = BaseProps & {
    icon: IconComponent;
    children?: never;
};

type WithChildren = BaseProps & {
    children: React.ReactNode;  // e.g. <Image .../>
    icon?: never;
};

type SocialIconProps = WithIcon | WithChildren;

function hasIcon(p: SocialIconProps): p is WithIcon {
    return (p as WithIcon).icon !== undefined;
}

export function SocialIcon(props: SocialIconProps) {
    const {
        href,
        label,
        className,
        external = true,
        iconClassName,
    } = props;

    const base = clsx(
        "group inline-flex items-center justify-center rounded-lg p-2 outline-none transition",
        "text-gray-300 hover:text-primary",
        "hover:drop-shadow-[0_0_12px_theme(colors.primary.DEFAULT)]",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
    );

    const content = (
        <>
            {hasIcon(props) ? (
                (() => {
                    const Icon = props.icon; // now a valid component type
                    return <Icon className={clsx("size-7 sm:size-8", iconClassName)} />;
                })()
            ) : (
                props.children
            )}
            <span className="sr-only">{label}</span>
        </>
    );

    return external ? (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={base}
        >
            {content}
        </a>
    ) : (
        <Link href={href} aria-label={label} title={label} className={base}>
            {content}
        </Link>
    );
}
