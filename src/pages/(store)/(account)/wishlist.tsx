import type { JSX } from "react";
import { Link } from "react-router";

import Heart from "~icons/lucide/heart";

import { ProductCard } from "#/components/ProductCard";
import { selectWishlist } from "#/features/wishlist";
import productsApi from "#/services/api/products";
import { useAppSelector } from "#/store";

// no bulk-by-id endpoint, so each saved product is fetched on its own
function WishlistCard({ id }: { id: string }) {
	const { data: product } = productsApi.useProductQuery(id);

	return product ? <ProductCard product={product} /> : undefined;
}

export default function Page(): JSX.Element {
	const ids = useAppSelector(selectWishlist);

	return (
		<>
			<h1 className="text-h1 font-medium text-gray-900">
				Wishlist (<span className="tabular-nums">{ids.length}</span>)
			</h1>

			{ids.length > 0 ? (
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{ids.map((id) => (
						<WishlistCard
							key={id}
							id={id}
						/>
					))}
				</div>
			) : (
				<div className="bg-white border border-black/10 rounded-2xl p-12 flex flex-col items-center gap-3 text-center">
					<Heart className="size-10 text-gray-300" />
					<p className="text-gray-500 text-sm">
						Wishlist kamu masih kosong. Yuk, simpan produk favoritmu!
					</p>
					<Link
						to="/browse"
						className="px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-medium hover:bg-brand-700 transition-colors"
					>
						Mulai Belanja
					</Link>
				</div>
			)}
		</>
	);
}
