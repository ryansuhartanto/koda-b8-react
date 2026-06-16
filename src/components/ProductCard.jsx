import { Link } from "react-router";

import Star5 from "#/components/Star5";
import { rupiah, slugify } from "#/lib/utils";

export function ProductCard({
	name,
	brand,
	img,
	price,
	originalPrice,
	rating,
	ratingCount,
	tags,
}) {
	const discount = originalPrice
		? Math.round((1 - price / originalPrice) * 100)
		: null;

	const badge =
		(discount && <span className="badge discount">-{discount}%</span>) ||
		(tags?.includes("baru") && <span className="badge new">Baru</span>);

	return (
		<Link to={`/details/${slugify(name)}`}>
			<article className="card">
				<img
					src={img}
					alt={name}
				/>
				{badge}
				<div className="m-4 flex flex-col gap-1 product">
					<p>{brand}</p>
					<h3>{name}</h3>
					<div
						itemProp="aggregateRating"
						itemScope
						itemType="https://schema.org/AggregateRating"
						className="tabular-nums flex gap-2 items-center"
					>
						<output className="flex">
							{/* {Array.from({ length: 5 }, (_, i) => (
								<Star
									key={i}
									fill="currentColor"
									strokeWidth={0}
									className={
										i < Math.round(rating) ? "text-amber-400" : "text-gray-300"
									}
								/>
							))} */}
							<Star5 count={Math.round(rating)} />
						</output>
						<span>
							<span itemProp="ratingValue">{rating}</span> (
							<span itemProp="reviewCount">{ratingCount}</span>)
						</span>
					</div>
					<p className="tabular-nums flex gap-2 items-center pt-1 price">
						{originalPrice ? (
							<>
								<ins>{rupiah(price)}</ins>
								<del>{rupiah(originalPrice)}</del>
							</>
						) : (
							<span>{rupiah(price)}</span>
						)}
					</p>
				</div>
			</article>
		</Link>
	);
}

export function SummaryItem({ name, img, quantity = 1 }) {
	return (
		<div className="flex gap-4 items-center">
			<div className="size-12 shrink-0 rounded-lg overflow-hidden bg-gray-100">
				<img
					src={img}
					alt={name}
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="flex-1 text-sm text-gray-600 truncate">{name}</div>
			<div className="text-sm text-gray-900 font-medium">×{quantity}</div>
		</div>
	);
}

export function OrderReviewItem({ name, img, price, quantity = 1 }) {
	return (
		<div className="flex gap-4 items-center">
			<div className="size-12 shrink-0 rounded-lg overflow-hidden bg-gray-100">
				<img
					src={img}
					alt={name}
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="flex-1 flex flex-col justify-center">
				<span className="text-sm font-medium text-gray-900">{name}</span>
				<span className="text-xs text-gray-500">x{quantity}</span>
			</div>
			<div className="text-sm font-medium text-blue-600">
				{rupiah(price * quantity)}
			</div>
		</div>
	);
}
