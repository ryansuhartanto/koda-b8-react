import * as Lucide from "lucide-react";

export default function Breadcrumb({ items }) {
	return (
		<nav
			aria-label="Breadcrumb"
			className="flex items-center gap-1 text-sm text-gray-400 [&_a]:transition-colors [&_a]:hover:text-black [&_span]:text-black"
		>
			{items.map((item, i) =>
				i < items.length - 1 ? (
					<>
						<a
							key={`l-${i}`}
							href={item.url}
						>
							{item.label}
						</a>

						<Lucide.ChevronRight
							key={`s-${i}`}
							className="size-4"
						/>
					</>
				) : (
					<span
						key={`c-${i}`}
						aria-current="page"
					>
						{item.label}
					</span>
				),
			)}
		</nav>
	);
}
