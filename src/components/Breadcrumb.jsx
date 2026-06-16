import React from "react";
import ChevronRight from "~icons/lucide/chevron-right";

export default function Breadcrumb({ items }) {
	return (
		<nav
			aria-label="Breadcrumb"
			className="flex items-center gap-1 text-sm text-gray-400 [&_a]:transition-colors [&_a]:hover:text-black [&_span]:text-black"
		>
			{items.map((item, i) =>
				i < items.length - 1 ? (
					<React.Fragment key={`${item.href}-l`}>
						<a href={item.url}>{item.label}</a>

						<ChevronRight className="size-4" />
					</React.Fragment>
				) : (
					<span
						key={`${item.href}-c`}
						aria-current="page"
					>
						{item.label}
					</span>
				),
			)}
		</nav>
	);
}
