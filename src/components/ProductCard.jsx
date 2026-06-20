import { useState } from "react";
import { Link } from "react-router";
import Heart from "~icons/lucide/heart";
import ShoppingCart from "~icons/lucide/shopping-cart";

import Star5 from "#/components/Star5";
import { cn, rupiah } from "#/lib/utils";

/**
 * @typedef ProductCardProps
 * @prop {string} slug
 * @prop {string} name
 * @prop {string} brand
 * @prop {string} img
 * @prop {number} price
 * @prop {number | null} [originalPrice]
 * @prop {number} rating
 * @prop {number} ratingCount
 * @prop {string[]} [tags]
 * @prop {boolean} [initialWishlisted]
 */

/**
 * @param {ProductCardProps} props
 */
export function ProductCard({
	slug,
	name,
	brand,
	img,
	price,
	originalPrice,
	rating,
	ratingCount,
	tags,
	initialWishlisted = false,
}) {
	const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);

	const discount = originalPrice
		? Math.round((1 - price / originalPrice) * 100)
		: null;

	const badge =
		(discount && <span className="badge discount">-{discount}%</span>) ||
		(tags?.includes("baru") && <span className="badge new">Baru</span>);

	return (
		<article className="card group">
			<div className="relative overflow-hidden">
				<Link to={`/details/${slug}`}>
					<img
						src={img}
						alt={name}
					/>
				</Link>

				{badge}

				<button
					type="button"
					aria-label={
						isWishlisted ? "Hapus dari wishlist" : "Tambah ke wishlist"
					}
					onClick={() => setIsWishlisted((w) => !w)}
					className={cn(
						"absolute inset-bs-2 inset-e-2 grid place-content-center size-8 rounded-full bg-white shadow-sm cursor-pointer transition-opacity",
						isWishlisted
							? "text-red-500 opacity-100"
							: "text-gray-400 opacity-0 group-hover:opacity-100",
					)}
				>
					<Heart
						className={cn("size-4", isWishlisted && "[&_path]:fill-current")}
					/>
				</button>

				<button
					type="button"
					className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 py-3 bg-orange-500 text-white text-sm font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-200 cursor-pointer"
				>
					<ShoppingCart className="size-4" /> Tambah ke Keranjang
				</button>
			</div>

			<div className="m-4 flex flex-col gap-1 product">
				<p>{brand}</p>
				<Link to={`/details/${slug}`}>
					<h3>{name}</h3>
				</Link>
				<div
					itemProp="aggregateRating"
					itemScope
					itemType="https://schema.org/AggregateRating"
					className="tabular-nums flex gap-2 items-center"
				>
					<output className="flex">
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
	);
}

/**
 * @typedef SummaryItemProps
 * @prop {string} name
 * @prop {string} img
 * @prop {number} [quantity]
 */

/**
 * @param {SummaryItemProps} props
 */
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

/**
 * @typedef OrderReviewItemProps
 * @prop {string} name
 * @prop {string} img
 * @prop {number} price
 * @prop {number} [quantity]
 */

/**
 * @param {OrderReviewItemProps} props
 */
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
