/**
 * @typedef FormFieldProps
 * @prop {string} label
 * @prop {string} [type]
 * @prop {string} [name]
 * @prop {string} [autoComplete]
 * @prop {string} [defaultValue]
 * @prop {string} [placeholder]
 * @prop {boolean} [required]
 * @prop {import("react").ComponentType<{ className?: string }>} [icon]
 * @prop {import("react").ReactNode} [trailing]
 * @prop {import("react").ReactNode} [aside]
 */

/**
 * @param {FormFieldProps} props
 */
export default function FormField({
	label,
	type = "text",
	name,
	autoComplete,
	defaultValue,
	placeholder,
	required,
	icon: Icon,
	trailing,
	aside,
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
			<div className="flex items-center gap-2 border border-black/10 rounded-xl px-4 py-2.5 focus-within:border-blue-600 transition-colors bg-gray-50 focus-within:bg-white text-gray-900">
				{Icon && <Icon className="text-gray-400 shrink-0" />}
				<input
					type={type}
					name={name}
					autoComplete={autoComplete}
					defaultValue={defaultValue}
					placeholder={placeholder}
					required={required}
					className="flex-1 w-full outline-none bg-transparent text-sm"
				/>
				{trailing}
			</div>
		</label>
	);
}
