import type { JSX, ComponentType } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Check from "~icons/lucide/check";
import Heart from "~icons/lucide/heart";
import RefreshCcw from "~icons/lucide/refresh-ccw";
import ShieldCheck from "~icons/lucide/shield-check";
import ShoppingCart from "~icons/lucide/shopping-cart";
import Truck from "~icons/lucide/truck";

import Breadcrumb from "#/components/Breadcrumb";
import { ProductCard } from "#/components/ProductCard";
import QuantityStepper from "#/components/QuantityStepper";
import Star5 from "#/components/Star5";
import { Button } from "#/components/ui/button";
import { RadioGroup, RadioPill } from "#/components/ui/radio";
import { Tab, TabPanel, Tabs, TabsList } from "#/components/ui/tabs";
import data from "#/data.json";
import { cn, rupiah } from "#/lib/utils";
import { useAppDispatch, useAppSelector } from "#/store";
import {
	addToCart,
	selectCurrentUser,
	toggleWishlist,
} from "#/store/reducers/auth";

const colors = ["Hitam", "Putih", "Biru"];

const perks: Array<[ComponentType<{ className?: string }>, string, string]> = [
	[Truck, "Gratis Ongkir", "Min. Rp 100.000"],
	[ShieldCheck, "Pembayaran Aman", "SSL Terenkripsi"],
	[RefreshCcw, "Retur 30 Hari", "Gratis retur"],
];

export default function Page(): JSX.Element {
	const { slug } = useParams();
	const user = useAppSelector(selectCurrentUser);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [qty, setQty] = useState(1);
	const [color, setColor] = useState(colors[0]);

	const product = data.products.find((p) => p.slug === slug);

	if (!product) {
		return (
			<main className="pt-6 pb-16 bg-gray-50">
				<div className="wrapper flex flex-col gap-4 items-center text-center py-24">
					<h1 className="text-2xl font-medium text-gray-900">
						Produk Tidak Ditemukan
					</h1>
					<p className="text-sm text-gray-500">
						Produk yang kamu cari mungkin sudah tidak tersedia.
					</p>
				</div>
			</main>
		);
	}

	const {
		name,
		brand,
		category,
		img,
		price,
		originalPrice,
		stock,
		rating,
		ratingCount,
		summary,
	} = product;
	const isWishlisted = user?.wishlist.includes(name) ?? false;
	const discount = originalPrice
		? Math.round((1 - price / originalPrice) * 100)
		: undefined;

	const related = data.products
		.filter((p) => p.category === category && p.name !== name)
		.slice(0, 4);

	function handleAddToCart() {
		if (!user) {
			void navigate("/login");
			return;
		}
		dispatch(addToCart(name, qty));
		void navigate("/cart");
	}

	function handleBuyNow() {
		if (!user) {
			void navigate("/login");
			return;
		}
		dispatch(addToCart(name, qty));
		void navigate("/checkout");
	}

	function handleWishlist() {
		if (!user) {
			void navigate("/login");
			return;
		}
		dispatch(toggleWishlist(name));
	}

	return (
		<main className="pt-6 pb-16 bg-gray-50">
			<div className="wrapper flex flex-col gap-8">
				<Breadcrumb
					items={[
						{ label: "Beranda", url: "/" },
						{ label: "Toko", url: "/browse" },
						{ label: category, url: `/browse?category=${category}` },
						{ label: name },
					]}
				/>

				<section className="grid grid-cols-2 gap-12 items-start">
					<div className="flex flex-col gap-4">
						<div className="relative bg-white border border-black/10 rounded-2xl overflow-hidden aspect-square">
							{discount && (
								<span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-2.5 py-1 rounded-full font-medium">
									-{discount}%
								</span>
							)}
							<img
								src={img}
								alt={name}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="flex gap-4">
							<div className="size-20 border-2 border-blue-600 rounded-xl overflow-hidden shrink-0">
								<img
									src={img}
									alt=""
									className="w-full h-full object-cover"
								/>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-1">
							<div className="text-sm text-gray-500">
								{brand} &bull; {category}
							</div>
							<h1 className="text-3xl font-bold text-gray-900">{name}</h1>
							<div className="flex items-center gap-4 text-sm">
								<div className="flex items-center gap-1 tabular-nums text-amber-400">
									<Star5 count={Math.round(rating)} />
									<span className="ml-1 text-gray-900">{rating}</span>
									<span className="text-gray-500">({ratingCount})</span>
								</div>
								<div className="flex items-center gap-1 p-0.5 px-2 rounded-full text-xs text-green-600 bg-green-50">
									<Check /> Stok tersedia ({stock})
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-1 p-4 rounded-xl bg-blue-50">
							<div className="flex items-center gap-3 price">
								<ins className="text-3xl font-bold">{rupiah(price)}</ins>
								{originalPrice && (
									<>
										<del className="text-lg">{rupiah(originalPrice)}</del>
										<span className="bg-red-600 text-white text-xs font-medium p-0.5 px-2 rounded-full">
											Hemat {discount}%
										</span>
									</>
								)}
							</div>
							{originalPrice && (
								<span className="text-green-600 text-sm font-medium">
									Kamu hemat {rupiah(originalPrice - price)}
								</span>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<div className="text-sm text-gray-500">
								Warna: <span className="text-blue-600">{color}</span>
							</div>
							<RadioGroup
								value={color}
								onValueChange={setColor}
								name="color"
								className="flex gap-2"
							>
								{colors.map((option) => (
									<RadioPill
										key={option}
										value={option}
									>
										{option}
									</RadioPill>
								))}
							</RadioGroup>
						</div>

						<div className="flex flex-col gap-2">
							<span className="text-sm text-gray-900">Jumlah</span>
							<div className="flex items-center gap-4">
								<QuantityStepper
									value={qty}
									onChange={setQty}
									max={stock}
								/>
								<span className="text-sm text-gray-500">Stok: {stock} pcs</span>
							</div>
						</div>

						<div className="flex gap-4 mb-8 [&_button]:cursor-pointer">
							<Button
								variant="outline"
								tone="accent"
								size="lg"
								className="flex-1"
								onClick={handleAddToCart}
							>
								<ShoppingCart className="size-5" /> Tambah ke Keranjang
							</Button>
							<Button
								tone="accent"
								size="lg"
								className="flex-1"
								onClick={handleBuyNow}
							>
								Beli Sekarang
							</Button>
							<Button
								variant="outline"
								tone={isWishlisted ? "danger" : "neutral"}
								size="none"
								aria-pressed={isWishlisted}
								aria-label={
									isWishlisted ? "Hapus dari wishlist" : "Tambah ke wishlist"
								}
								onClick={handleWishlist}
								className={cn(
									"w-14 flex items-center justify-center rounded-xl",
									isWishlisted &&
										"border-red-400 text-red-500 bg-red-50 hover:bg-red-100",
								)}
							>
								<Heart
									className={cn(
										"size-5",
										isWishlisted && "[&_path]:fill-current",
									)}
								/>
							</Button>
						</div>

						<div className="grid grid-cols-3 gap-4 *:p-2">
							{perks.map(([Icon, title, sub]) => (
								<div
									key={title}
									className="bg-gray-200/50 rounded-xl flex flex-col items-center justify-center text-center gap-2"
								>
									<Icon className="text-blue-600 size-5" />
									<div>
										<div className="text-xs font-medium text-gray-900">
											{title}
										</div>
										<div className="text-[10px] text-gray-500 mt-0.5">
											{sub}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				<Tabs
					defaultValue="description"
					className="border border-black/10 rounded-2xl overflow-hidden mt-4 bg-white"
				>
					<TabsList className="gap-0 bg-white [&>button]:p-4">
						<Tab value="description">Deskripsi</Tab>
						<Tab value="reviews">Ulasan ({ratingCount})</Tab>
					</TabsList>
					<TabPanel
						value="description"
						className="p-6 text-sm text-gray-600 leading-relaxed"
					>
						{summary}
					</TabPanel>
					<TabPanel
						value="reviews"
						className="p-6 flex flex-col gap-3 text-sm text-gray-600"
					>
						<div className="flex items-center gap-2 text-amber-400">
							<Star5 count={Math.round(rating)} />
							<span className="text-gray-900 font-medium">{rating}</span>
							<span className="text-gray-500">dari {ratingCount} ulasan</span>
						</div>
						<p className="text-gray-500">
							Ulasan tertulis belum tersedia untuk produk ini.
						</p>
					</TabPanel>
				</Tabs>

				{related.length > 0 && (
					<section className="flex flex-col gap-6">
						<h2 className="text-xl font-medium">Produk Serupa</h2>
						<div className="grid grid-cols-4 gap-4">
							{related.map((p) => (
								<ProductCard
									key={p.name}
									{...p}
								/>
							))}
						</div>
					</section>
				)}
			</div>
		</main>
	);
}
