/**
 * @typedef {Object} FormFieldOwnProps
 * @prop {string} label
 * @prop {string} [error]
 * @prop {import("react").Ref<HTMLInputElement>} [ref]
 * @prop {import("react").ComponentType<{ className?: string }>} [icon]
 * @prop {import("react").ReactNode} [trailing]
 * @prop {import("react").ReactNode} [aside]
 */

/**
 * @param {FormFieldOwnProps & React.InputHTMLAttributes<HTMLInputElement>} props
 */
export default function FormField({
	label,
	error,
	icon: Icon,
	trailing,
	aside,
	ref,
	required,
	...inputProps
}) {
	return (
		<label className="flex flex-col gap-2 text-sm text-gray-600">
			<div className="flex justify-between items-center">
				<span
					className={
						required
							? "after:content-['*'] after:ml-1 after:text-red-500"
							: undefined
					}
				>
					{label}
				</span>
				{aside}
			</div>
			<div
				className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 focus-within:border-blue-600 transition-colors bg-gray-50 focus-within:bg-white text-gray-900 ${error ? "border-red-400" : "border-black/10"}`}
			>
				{Icon && <Icon className="text-gray-400 shrink-0" />}
				<input
					ref={ref}
					required={required}
					className="flex-1 w-full outline-none bg-transparent text-sm"
					{...inputProps}
				/>
				{trailing}
			</div>
			{error && <span className="text-xs text-red-500 -mt-1">{error}</span>}
		</label>
	);
}
