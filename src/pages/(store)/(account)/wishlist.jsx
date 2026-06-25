import { Link } from "react-router";
import Heart from "~icons/lucide/heart";

import { ProductCard } from "#/components/ProductCard";
import data from "#/data.json";
import { useAppSelector } from "#/store";
import { selectCurrentUser } from "#/store/reducers/auth";

export default function Page() {
	const user = useAppSelector(selectCurrentUser);
	const items = (user?.wishlist ?? [])
		.map((name) => data.products.find((p) => p.name === name))
		.filter((name) => name !== undefined);

	return (
		<>
			<h1 className="text-2xl font-medium text-gray-900">
				Wishlist (<span className="tabular-nums">{items.length}</span>)
			</h1>

			{items.length > 0 ? (
				<div className="grid grid-cols-3 gap-4">
					{items.map((p) => (
						<ProductCard
							key={p.name}
							{...p}
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
						className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
					>
						Mulai Belanja
					</Link>
				</div>
			)}
		</>
	);
}
