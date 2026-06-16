import React from "react";
import { Link } from "react-router";
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
						<Link to={item.url}>{item.label}</Link>

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
