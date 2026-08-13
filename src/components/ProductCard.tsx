import type { JSX } from "react";
import { Link, useNavigate } from "react-router";
import Heart from "~icons/lucide/heart";
import ShoppingCart from "~icons/lucide/shopping-cart";

import Star5 from "#/components/Star5";
import { Button } from "#/components/ui/button";
import { selectIsAuthenticated } from "#/features/auth";
import { selectWishlist, toggle } from "#/features/wishlist";
import { cn, rupiah } from "#/lib/utils";
import cartApi from "#/services/api/cart";
import type { Product } from "#/services/api/products";
import { useAppDispatch, useAppSelector } from "#/store";

export type ProductCardProps = {
	product: Product;
};

export function ProductCard({ product }: ProductCardProps): JSX.Element {
	const { id, name, brand, urls, variants } = product;
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const isWishlisted = useAppSelector(selectWishlist).includes(id);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [setCartItem] = cartApi.useSetCartItemMutation();

	const price = product.price_idr ?? 0;
	const originalPrice = product.original_price_idr;
	const rating = product.rating ?? 0;
	const discount =
		originalPrice && originalPrice > price
			? Math.round((1 - price / originalPrice) * 100)
			: undefined;

	function handleWishlist() {
		if (!isAuthenticated) {
			void navigate("/login");
			return;
		}
		dispatch(toggle(id));
	}

	function handleAddToCart() {
		if (!isAuthenticated) {
			void navigate("/login");
			return;
		}
		// a cart line is a variant, so a listing without one has to be opened first
		const variant = variants?.[0];
		if (!variant) {
			void navigate(`/details/${id}`);
			return;
		}
		void setCartItem({ id_variant: variant.id, quantity: 1 });
	}

	return (
		<article className="card group">
			<div className="relative overflow-hidden">
				<Link to={`/details/${id}`}>
					<img
						src={urls?.[0] ?? ""}
						alt={name}
					/>
				</Link>

				{discount && <span className="badge discount">-{discount}%</span>}

				<Button
					variant="icon"
					tone="danger"
					size="square"
					aria-label={
						isWishlisted ? "Hapus dari wishlist" : "Tambah ke wishlist"
					}
					onClick={handleWishlist}
					className={cn(
						"absolute inset-bs-2 inset-e-2 bg-white shadow-sm transition-opacity",
						isWishlisted
							? "text-red-500 opacity-100"
							: "text-gray-400 opacity-0 pointer-coarse:opacity-100 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100",
					)}
				>
					<Heart
						className={cn("size-4", isWishlisted && "[&_path]:fill-current")}
					/>
				</Button>

				<Button
					tone="accent"
					size="none"
					className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 py-3 text-sm shadow-none translate-y-full pointer-coarse:translate-y-0 group-hover:translate-y-0 group-focus-within:translate-y-0 focus-visible:translate-y-0 transition-transform"
					onClick={handleAddToCart}
				>
					<ShoppingCart className="size-4" /> Tambah ke Keranjang
				</Button>
			</div>

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
						<Star5 count={Math.round(rating)} />
					</output>
					<span>
						<span itemProp="ratingValue">{rating}</span> (
						<span itemProp="reviewCount">{product.rating_count}</span>)
					</span>
				</div>
				<p className="tabular-nums flex flex-col lg:flex-row gap-2 items-start lg:items-center pt-1 price">
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

export type SummaryItemProps = {
	name: string;
	img: string;
	quantity?: number;
};

export function SummaryItem({
	name,
	img,
	quantity = 1,
}: SummaryItemProps): JSX.Element {
	return (
		<div className="flex gap-4 items-center">
			<div className="size-12 shrink-0 rounded-lg overflow-hidden bg-gray-100">
				<img
					src={img}
					alt={name}
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="flex-1 min-w-0 text-sm text-gray-600 truncate">
				{name}
			</div>
			<div className="text-sm text-gray-900 font-medium">×{quantity}</div>
		</div>
	);
}

export type OrderReviewItemProps = {
	name: string;
	img: string;
	price: number;
	quantity?: number;
};

export function OrderReviewItem({
	name,
	img,
	price,
	quantity = 1,
}: OrderReviewItemProps): JSX.Element {
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
			<div className="text-sm font-medium text-brand-600">
				{rupiah(price * quantity)}
			</div>
		</div>
	);
}
